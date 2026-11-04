import test from 'node:test'
import assert from 'node:assert/strict'
import { spawn, spawnSync } from 'node:child_process'
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

test('helper inspection rejects wrong script/state and only stops the verified test process', {skip:process.platform!=='win32'}, async t => {
  const root=mkdtempSync(join(tmpdir(),'dsh helper test-'))
  const script=join(root,'ball.ps1'), state=join(root,'state.json')
  writeFileSync(script,'param([string]$StatePath)\nWrite-Output "ready"\nStart-Sleep -Seconds 60\n')
  const ps=join(process.env.SystemRoot,'System32/WindowsPowerShell/v1.0/powershell.exe')
  const child=spawn(ps,['-NoProfile','-ExecutionPolicy','Bypass','-File',script,'-StatePath',state],{windowsHide:true,stdio:['ignore','pipe','pipe']})
  const exited=new Promise(resolve=>child.once('exit',resolve))
  t.after(async()=>{if(child.exitCode===null) child.kill();await exited;rmSync(root,{recursive:true,force:true})})
  await new Promise((resolve,reject)=>{child.stdout.once('data',resolve);child.once('error',reject);child.once('exit',()=>reject(Error('test helper exited early')))})
  const control=(helperScript,stateFile,terminate=false)=>spawnSync(ps,['-NoProfile','-ExecutionPolicy','Bypass','-File',fileURLToPath(new URL('../native/helper-control.ps1',import.meta.url)),'-HelperPid',String(child.pid),'-HelperScript',helperScript,'-StateFile',stateFile,...(terminate?['-Terminate']:[])],{windowsHide:true,encoding:'utf8',timeout:10000})
  assert.notEqual(control(script+'.wrong',state,true).status,0)
  assert.notEqual(control(script,state+'.wrong',true).status,0)
  const alive=control(script,state)
  assert.equal(alive.status,0,alive.stderr);assert.equal(alive.stdout.trim(),'verified')
  const stopped=control(script,state,true)
  assert.equal(stopped.status,0,stopped.stderr)
  await exited
  assert.notEqual(control(script,state,true).status,0)
})
