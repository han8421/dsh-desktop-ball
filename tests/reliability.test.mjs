import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync, rmSync, readdirSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { Readable, Writable } from 'node:stream'
import vm from 'node:vm'
import { parseByteRange, pruneMedia } from '../lib/reliability.js'
import { apply } from '../index.js'

function fixture(t) {
  const root = mkdtempSync(join(tmpdir(), 'dsh-ball-test-'))
  t.after(() => rmSync(root, { recursive: true, force: true }))
  return root
}

test('byte ranges handle suffix, open end, clamping, empty and invalid requests', () => {
  for (const [value, size, expected] of [
    ['bytes=0-3', 10, {start:0,end:3}], ['bytes=-3',10,{start:7,end:9}],
    ['bytes=0-999',10,{start:0,end:9}], ['bytes=7-',10,{start:7,end:9}],
    ['bytes=-99',10,{start:0,end:9}], ['bytes=-0',10,false],
    ['bytes=10-',10,false], ['bytes=5-2',10,false], ['bytes=0-0',0,false],
    ['bytes=9007199254740992-',10,false], ['bytes=-',10,null],
    ['bytes=0-1,3-4',10,null], ['items=0-3',10,null], [undefined,10,null],
  ]) assert.deepEqual(parseByteRange(value,size),expected,value)
})

test('media pruning retains active/shared files, arbitrary files and directories', t => {
  const root=fixture(t), media=join(root,'media'); mkdirSync(media)
  for(const name of ['ball-1.png','ball-2.mp4','chat-bg-3.png','notes.txt','user.png']) writeFileSync(join(media,name),'x')
  mkdirSync(join(media,'ball-4.png'))
  pruneMedia(root,{ballFile:join(media,'ball-1.png'),chatBackgroundHistory:[{file:join(media,'chat-bg-3.png')}]})
  assert.equal(existsSync(join(media,'ball-2.mp4')),false)
  for(const name of ['ball-1.png','chat-bg-3.png','notes.txt','user.png','ball-4.png']) assert.ok(existsSync(join(media,name)),name)
})

function handlerFixture(t) {
  const base=fixture(t), previous=process.env.LOCALAPPDATA
  process.env.LOCALAPPDATA=base
  let handler
  try {
    apply({effect(fn,label){if(label==='quick-chat: appearance route') fn()},webServer:{register(route){handler=route.handler}},get(){return null}})
  } finally {
    if(previous===undefined) delete process.env.LOCALAPPDATA; else process.env.LOCALAPPDATA=previous
  }
  const root=join(base,'dsh-quick-chat'); mkdirSync(join(root,'media'),{recursive:true})
  return {root,handler}
}

async function request(handler, method, url, body='', headers={}) {
  const req=Readable.from([Buffer.from(body)]); Object.assign(req,{method,url,headers})
  const chunks=[]; let status, responseHeaders
  const res=new Writable({write(chunk,encoding,cb){chunks.push(chunk);cb()}})
  res.writeHead=(code,head)=>{status=code;responseHeaders=head}
  const done=new Promise((resolve,reject)=>{res.on('finish',resolve);res.on('error',reject)})
  await handler(req,res); await done
  return {status,headers:responseHeaders,body:Buffer.concat(chunks)}
}

test('actual media route sends consistent Content-Length and correct suffix bytes', async t => {
  const {root,handler}=handlerFixture(t), file=join(root,'media','ball-1.mp4')
  writeFileSync(file,'0123456789');writeFileSync(join(root,'appearance.json'),JSON.stringify({ballFile:file}))
  for(const [range,expected] of [['bytes=-3','789'],['bytes=0-999','0123456789'],['bytes=0-3','0123']]) {
    const result=await request(handler,'GET','/dsh-quick-chat-appearance/ball','',{range})
    assert.equal(result.status,206);assert.equal(result.body.toString(),expected)
    assert.equal(result.headers['content-length'],result.body.length)
  }
  assert.equal((await request(handler,'GET','/dsh-quick-chat-appearance/ball','',{range:'bytes=10-'})).status,416)
})

test('uploads prune evicted media but preserve the other history and shared references', async t => {
  const {root,handler}=handlerFixture(t)
  for(let i=0;i<14;i++) assert.equal((await request(handler,'POST','/dsh-quick-chat-appearance/upload?target=ball&name=x.png','image',{'content-type':'image/png'})).status,200)
  let appearance=JSON.parse(readFileSync(join(root,'appearance.json')))
  assert.equal(appearance.ballHistory.length,12)
  assert.equal(readdirSync(join(root,'media')).length,12)
  const shared=appearance.ballHistory[0]
  appearance.chatBackgroundHistory=[shared]
  writeFileSync(join(root,'appearance.json'),JSON.stringify(appearance))
  const result=await request(handler,'POST','/dsh-quick-chat-appearance/history-delete',JSON.stringify({kind:'ball',id:shared.id}))
  assert.equal(result.status,200);assert.ok(existsSync(shared.file))
  assert.equal((await request(handler,'POST','/dsh-quick-chat-appearance/upload?name=bad.exe','bad')).status,400)
})

// Load the real controller without mounting React or starting the plugin.
function controllerPrototype() {
  let factory
  const source=readFileSync(new URL('../client.js',import.meta.url),'utf8')
    .replace('exports.apply = apply','exports.apply = apply; exports.TestController = QuickChatController')
  vm.runInNewContext(source,{window:{__ModuleLoader__:{load(value){factory=value.factory}}},console,setTimeout,clearTimeout})
  return factory(()=>({})).TestController.prototype
}

test('preference failures are visible and block prompt submission until retry succeeds', async () => {
  const proto=controllerPrototype()
  const state={permission:'ask',modelSelection:{provider:'test',model:'test'},draft:'hello',attachments:[],busy:false}
  const notices=[];let submitted=0, modelOK=false
  const controller=Object.create(proto)
  Object.assign(controller,{
    store:{get:()=>state,set:patch=>Object.assign(state,patch)},
    session:{sessionId:'test',command:async()=>({ok:true}),prompt:async()=>{submitted++;return {ok:true}}},
    preferencesPendingSession:'test',requestSelectModel:async()=>({ok:modelOK,error:{message:'unavailable'}}),
    tr:(_zh,en)=>en,notify:message=>notices.push(message),
    buildPromptContent:async()=>[],rememberSession(){},clearAttachments(){},scheduleRebuild(){},
  })
  await controller.send()
  assert.equal(submitted,0);assert.match(state.error,/unavailable/);assert.equal(state.draft,'hello');assert.equal(notices.length,1)
  modelOK=true;await controller.send()
  assert.equal(submitted,1);assert.equal(controller.preferencesPendingSession,null)
})

test('permission rejection stops model application; session preferences are awaited', async () => {
  const proto=controllerPrototype();let modelCalls=0
  const controller=Object.create(proto), state={permission:'ask',modelSelection:{model:'x'}}
  Object.assign(controller,{store:{get:()=>state,set:patch=>Object.assign(state,patch)},tr:(_zh,en)=>en,notify(){},session:{sessionId:'s',command:async()=>({ok:true,value:{matched:false}})},requestSelectModel:async()=>{modelCalls++;return {ok:true}}})
  await assert.rejects(controller.applySessionPreferences(),/Permission/)
  assert.equal(modelCalls,0)
  let release;controller.session.command=()=>new Promise(resolve=>{release=resolve})
  const pending=controller.applySessionPreferences()
  assert.equal(modelCalls,0);release({ok:true});await pending;assert.equal(modelCalls,1)
})
