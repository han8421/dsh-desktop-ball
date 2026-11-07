/**
 * Host half of dsh-quick-chat.
 *
 * The quick chat itself is browser-side: it opens a normal DSH Session through
 * the public client Session Controller. This half owns one small desktop
 * affordance that a renderer cannot provide: a transparent, always-on-top
 * floating ball that survives minimizing the Harness window.
 *
 * The ball is a local Windows helper (PowerShell + WPF). Clicking it opens an
 * embedded WebView2 window (WinForms + WebView2, no browser chrome) on the
 * regular Web GUI with `#dsh-quick-chat=<nonce>`; if WebView2 is unavailable it
 * falls back to an Edge/Chrome app window. The client half recognizes that
 * fragment and renders only the quick-chat panel. The token exchange happens on
 * the normal Host origin, so no route or Electron main-process change is needed.
 */

import { spawn, spawnSync } from 'node:child_process'
import { appendFileSync, createReadStream, existsSync, mkdirSync, readFileSync, renameSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { basename, extname, join, resolve, sep } from 'node:path'
import { randomBytes } from 'node:crypto'
import { fileURLToPath } from 'node:url'

import { parseByteRange, pruneMedia } from './lib/reliability.js'

export const name = 'quick-chat'

/** The Host needs the authenticated browser origin and its loopback server. */
export const inject = ['connection', 'webServer', 'llm', 'sessionController']

const isWindows = process.platform === 'win32'

/**
 * The Host process of the Electron desktop shell is started through
 * `dsh-desktop-host/lib/index.js`; the DSH_PROFILE / DSH_SHELL variables are
 * injected into shell tools but are not guaranteed on the Host process itself.
 * Use the process identity first, with env and profileContext as fallbacks.
 */
function isDesktopHost(ctx) {
  if (!isWindows) return false
  // The Electron desktop Host runs this Node-mode process; a plain `dsh web`
  // process uses node.exe and does not carry the Electron version metadata.
  if (process.versions.electron || process.env.ELECTRON_RUN_AS_NODE === '1') return true
  const argv = process.argv.join(' ').replaceAll('\\', '/').toLowerCase()
  if (argv.includes('dsh-desktop-host') || argv.includes('/profiles/desktop')) return true
  if (process.env.DSH_PROFILE === 'desktop' || process.env.DSH_SHELL === '1') return true
  try {
    const profile = ctx.get('profileContext')
    if (profile && profile.name === 'desktop') return true
  } catch {
    /* profileContext is optional in hand-built trees */
  }
  return false
}

function localRoot() {
  const base = process.env.LOCALAPPDATA || join(homedir(), 'AppData', 'Local')
  return join(base, 'dsh-quick-chat')
}

/** Leave a small, token-free trail for the common "the ball did not appear" diagnosis. */
function logHost(message) {
  try {
    const root = localRoot()
    mkdirSync(root, { recursive: true })
    appendFileSync(join(root, 'host.log'), `${new Date().toISOString()} ${message}\n`, 'utf8')
  } catch {
    /* diagnostics must never affect activation */
  }
}

function writeState(root, value) {
  mkdirSync(root, { recursive: true })
  const file = join(root, 'state.json')
  writeFileSync(file, JSON.stringify(value, null, 2), 'utf8')
  return file
}

/** Appearance file shared by the WPF ball (writer/reader) and the web client (read-only). */
const APPEARANCE_ROUTE = '/dsh-quick-chat-appearance'
const CLIENT_VERSION = '0.18.3'

function appearanceFilePath(root) {
  return join(root, 'appearance.json')
}

function readAppearance(root) {
  try {
    // Windows PowerShell writes UTF-8 with a BOM; JSON.parse does not accept it.
    const raw = readFileSync(appearanceFilePath(root), 'utf8').replace(/^\uFEFF/, '')
    const value = JSON.parse(raw)
    return value && typeof value === 'object' ? value : {}
  } catch {
    return {}
  }
}

function writeAppearance(root, value) {
  mkdirSync(root, { recursive: true })
  const file = appearanceFilePath(root)
  const temp = file + '.tmp'
  writeFileSync(temp, JSON.stringify(value, null, 2), 'utf8')
  renameSync(temp, file)
  pruneMedia(root, value, error => logHost(`media cleanup failed: ${error.message}`))
}

function ballShapeOf(value, fallback = 'circle') {
  return ['circle', 'rounded', 'square', 'wide', 'tall'].includes(value) ? value : fallback
}

function ballSizeOf(value, fallback = 60) {
  const number = Number(value)
  if (!Number.isFinite(number)) return fallback
  return Math.round(Math.min(84, Math.max(44, number)))
}

function ballCropOf(value) {
  if (!value || typeof value !== 'object') return null
  const number = (key) => (typeof value[key] === 'number' && Number.isFinite(value[key]) ? value[key] : null)
  const x = number('x')
  const y = number('y')
  const w = number('w')
  const h = number('h')
  if (x === null || y === null || w === null || h === null) return null
  if (w <= 0.01 || h <= 0.01) return null
  const left = Math.min(0.99, Math.max(0, x))
  const top = Math.min(0.99, Math.max(0, y))
  return {
    x: left,
    y: top,
    w: Math.min(1 - left, Math.max(0.01, w)),
    h: Math.min(1 - top, Math.max(0.01, h)),
  }
}

function assistantNameOf(value, fallback = 'DeepSeek') {
  if (typeof value !== 'string') return fallback
  const name = value.trim().slice(0, 30)
  return name.length > 0 ? name : fallback
}

function chatBackgroundFitOf(value, fallback = 'cover') {
  return value === 'contain' || value === 'stretch' || value === 'cover' ? value : fallback
}

function chatBackgroundPositionOf(value, fallback = 'center') {
  return value === 'top' || value === 'bottom' || value === 'left' || value === 'right' || value === 'center'
    ? value
    : fallback
}

function messageColorOf(value) {
  return typeof value === 'string' && /^#[0-9a-fA-F]{6}$/.test(value) ? value.toLowerCase() : ''
}

const HISTORY_LIMIT = 12

function historyIdOf(file) {
  return basename(String(file || ''))
}

function normalizeHistory(value, root) {
  if (!Array.isArray(value)) return []
  const seen = new Set()
  const result = []
  for (const entry of value) {
    if (!entry || typeof entry !== 'object') continue
    const file = typeof entry.file === 'string' ? entry.file : ''
    if (!isOwnMediaFile(root, file) || !existsSync(file)) continue
    const id = typeof entry.id === 'string' && entry.id ? entry.id : historyIdOf(file)
    if (seen.has(id)) continue
    seen.add(id)
    result.push({
      id,
      file,
      kind: typeof entry.kind === 'string' ? entry.kind : 'image',
      addedAt: typeof entry.addedAt === 'number' ? entry.addedAt : 0,
    })
    if (result.length >= HISTORY_LIMIT) break
  }
  return result
}

function withCurrentHistory(entries, file, kind) {
  if (!file) return entries
  const id = historyIdOf(file)
  if (entries.some((entry) => entry.id === id)) return entries
  return [{ id, file, kind: kind || 'image', addedAt: Date.now() }, ...entries].slice(0, HISTORY_LIMIT)
}

function addHistory(entries, file, kind) {
  const id = historyIdOf(file)
  return [
    { id, file, kind: kind || 'image', addedAt: Date.now() },
    ...entries.filter((entry) => entry.id !== id),
  ].slice(0, HISTORY_LIMIT)
}

function historyView(entries, route) {
  return entries.map((entry) => ({
    id: entry.id,
    kind: entry.kind,
    addedAt: entry.addedAt,
    url: `${route}/history-media?id=${encodeURIComponent(entry.id)}`,
  }))
}

async function readRequestBody(req, limit) {
  const chunks = []
  let total = 0
  for await (const chunk of req) {
    total += chunk.length
    if (total > limit) {
      const error = new Error('request body too large')
      error.code = 'too-large'
      throw error
    }
    chunks.push(chunk)
  }
  return Buffer.concat(chunks)
}

const IMAGE_EXTS = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.bmp'])
const VIDEO_EXTS = new Set(['.mp4', '.wmv', '.avi', '.mov', '.webm'])

function uploadExtension(name, contentType, target) {
  const fromName = extname(typeof name === 'string' ? name : '').toLowerCase()
  if (target === 'ball' && (IMAGE_EXTS.has(fromName) || VIDEO_EXTS.has(fromName))) return fromName
  if (target !== 'ball' && IMAGE_EXTS.has(fromName)) return fromName
  const type = typeof contentType === 'string' ? contentType.split(';')[0].trim().toLowerCase() : ''
  const byType = {
    'image/png': '.png',
    'image/jpeg': '.jpg',
    'image/gif': '.gif',
    'image/webp': '.webp',
    'image/bmp': '.bmp',
    'video/mp4': '.mp4',
    'video/webm': '.webm',
    'video/quicktime': '.mov',
    'video/x-ms-wmv': '.wmv',
    'video/x-msvideo': '.avi',
  }[type]
  return byType && (target === 'ball' || IMAGE_EXTS.has(byType)) ? byType : null
}

/** Only files copied into the plugin's own media directory may be served/saved. */
function isOwnMediaFile(root, file) {
  try {
    if (typeof file !== 'string' || file.length === 0) return false
    const media = resolve(root, 'media')
    const target = resolve(file)
    return target === media || target.startsWith(media + sep)
  } catch {
    return false
  }
}

function mediaVersion(file) {
  try {
    return Math.round(statSync(file).mtimeMs)
  } catch {
    return 0
  }
}

function contentTypeOf(file) {
  const ext = extname(file).toLowerCase()
  if (ext === '.png') return 'image/png'
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg'
  if (ext === '.gif') return 'image/gif'
  if (ext === '.webp') return 'image/webp'
  if (ext === '.bmp') return 'image/bmp'
  if (ext === '.mp4') return 'video/mp4'
  if (ext === '.webm') return 'video/webm'
  if (ext === '.mov') return 'video/quicktime'
  if (ext === '.wmv') return 'video/x-ms-wmv'
  if (ext === '.avi') return 'video/x-msvideo'
  return 'application/octet-stream'
}

/**
 * Build the same model catalog the DSH model selector uses, without requiring
 * the standalone page to hold the typed remote.session namespace.
 * @param {import('@deepseek-ai/cordis').Context} ctx - Host context carrying the LLM registry.
 * @returns {Promise<{ default: object|null, groups: object[] }>} model groups for the composer menu.
 */
async function buildHostModelCatalog(ctx) {
  const llm = ctx.llm
  const providers = llm.listProviders()
  const groups = []
  for (const provider of providers) {
    try {
      const models = await llm.listModels(provider.id)
      const entries = []
      for (const model of models) {
        let reasoning
        try {
          const resolved = await llm.resolveModelInfo(provider.id, model.id)
          if (resolved && resolved.reasoning) {
            reasoning = {
              efforts: resolved.reasoning.efforts.map((effort) => ({
                id: effort.id,
                name: effort.name,
                ...(effort.description === undefined ? {} : { description: effort.description }),
              })),
              ...(resolved.reasoning.defaultEffort === undefined
                ? {}
                : { defaultEffort: resolved.reasoning.defaultEffort }),
            }
          }
        } catch {
          reasoning = undefined
        }
        entries.push({
          id: model.id,
          name: model.name,
          ...(model.description === undefined ? {} : { description: model.description }),
          ...(reasoning === undefined ? {} : { reasoning }),
        })
      }
      if (entries.length > 0) groups.push({ id: provider.id, name: provider.name, models: entries })
    } catch {
      /* skip providers that cannot be listed */
    }
  }
  let fallback = null
  groups.sort((a, b) => {
    const rank = (group) => (group.id === 'deepseek-account' ? 0 : 1)
    return rank(a) - rank(b)
  })
  try {
    fallback = ctx.agentDefaultModel && typeof ctx.agentDefaultModel.currentSelection === 'function'
      ? ctx.agentDefaultModel.currentSelection()
      : null
  } catch {
    fallback = null
  }
  if (!fallback || !fallback.model) {
    const first = groups.find((group) => group.models.length > 0)
    fallback = first ? { provider: first.id, model: first.models[0].id } : null
  }
  return { default: fallback, groups }
}

/**
 * Appearance API for the chat page: current ball/background metadata + background bytes.
 * The WPF ball writes appearance.json directly; this route only reads it.
 */
function createAppearanceHandler(root, ctx) {
  return async (req, res) => {
    const url = new URL(req.url ?? '/', 'http://localhost')
    const rest = url.pathname.slice(APPEARANCE_ROUTE.length)
    if (req.method === 'GET' && rest === '/models') {
      try {
        const catalog = await buildHostModelCatalog(ctx)
        res.writeHead(200, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' })
        res.end(JSON.stringify({ ok: true, value: catalog }))
      } catch (error) {
        res.writeHead(500, { 'content-type': 'application/json; charset=utf-8' })
        res.end(JSON.stringify({ ok: false, reason: error instanceof Error ? error.message : String(error) }))
      }
      return
    }
    if (req.method === 'POST' && rest === '/select-model') {
      try {
        const data = await readRequestBody(req, 64 * 1024)
        const body = JSON.parse(data.toString('utf8') || '{}')
        if (!body || typeof body.sessionId !== 'string' || typeof body.provider !== 'string' || typeof body.model !== 'string') {
          res.writeHead(400, { 'content-type': 'application/json; charset=utf-8' })
          res.end(JSON.stringify({ ok: false, error: { code: 'bad-request', message: 'sessionId, provider and model are required' } }))
          return
        }
        const selected = await ctx.sessionController.selectModel({
          sessionId: body.sessionId,
          provider: body.provider,
          model: body.model,
          ...(typeof body.reasoningEffort === 'string' ? { reasoningEffort: body.reasoningEffort } : {}),
        })
        res.writeHead(200, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' })
        res.end(JSON.stringify({ ok: true, selected }))
      } catch (error) {
        res.writeHead(400, { 'content-type': 'application/json; charset=utf-8' })
        res.end(JSON.stringify({
          ok: false,
          error: {
            code: error && error.code ? error.code : 'session/model-unavailable',
            message: error instanceof Error ? error.message : String(error),
          },
        }))
      }
      return
    }
    if (req.method === 'GET' && (rest === '' || rest === '/')) {
      const appearance = readAppearance(root)
      const background = typeof appearance.chatBackgroundFile === 'string' ? appearance.chatBackgroundFile : ''
      const backgroundOk = isOwnMediaFile(root, background) && existsSync(background)
      const ball = typeof appearance.ballFile === 'string' ? appearance.ballFile : ''
      const ballOk = isOwnMediaFile(root, ball) && existsSync(ball)
      const ballColor = typeof appearance.ballColor === 'string' ? appearance.ballColor : ''
      const version = backgroundOk ? mediaVersion(background) : 0
      const bgType =
        appearance.chatBackgroundType === 'color'
          ? 'color'
          : appearance.chatBackgroundType === 'none'
            ? 'none'
            : backgroundOk
              ? 'image'
              : 'none'
      const chatBackground =
        bgType === 'color'
          ? { type: 'color', color: typeof appearance.chatBackgroundColor === 'string' ? appearance.chatBackgroundColor : '#f4f6fb' }
          : bgType === 'image'
            ? { type: 'image', url: `${APPEARANCE_ROUTE}/background?v=${version}`, version }
            : null
      const ballHistory = historyView(
        withCurrentHistory(normalizeHistory(appearance.ballHistory, root), ball, typeof appearance.ballKind === 'string' ? appearance.ballKind : 'image'),
        APPEARANCE_ROUTE,
      )
      const chatBackgroundHistory = historyView(
        withCurrentHistory(normalizeHistory(appearance.chatBackgroundHistory, root), background, 'image'),
        APPEARANCE_ROUTE,
      )
      res.writeHead(200, {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'no-store',
      })
      res.end(
        JSON.stringify({
          ok: true,
          assistantName: assistantNameOf(appearance.assistantName),
          language: appearance.language === 'zh' || appearance.language === 'en' ? appearance.language : 'auto',
          chatBackgroundFit: chatBackgroundFitOf(appearance.chatBackgroundFit),
          chatBackgroundPosition: chatBackgroundPositionOf(appearance.chatBackgroundPosition),
          chatBackgroundCrop: ballCropOf(appearance.chatBackgroundCrop),
          messageColors: {
            user: messageColorOf(appearance.chatUserColor),
            ai: messageColorOf(appearance.chatAiColor),
          },
          ball: {
            kind: typeof appearance.ballKind === 'string' ? appearance.ballKind : 'builtin',
            color: ballColor || null,
            url: ballOk ? `${APPEARANCE_ROUTE}/ball?v=${mediaVersion(ball)}` : null,
            shape: ballShapeOf(appearance.ballShape),
            size: ballSizeOf(appearance.ballSize),
            crop: ballCropOf(appearance.ballCrop),
          },
          chatBackground,
          ballHistory,
          chatBackgroundHistory,
        }),
      )
      return
    }
    if (req.method === 'GET' && rest === '/history-media') {
      const id = url.searchParams.get('id') || ''
      const appearance = readAppearance(root)
      const entries = [
        ...withCurrentHistory(
          normalizeHistory(appearance.ballHistory, root),
          typeof appearance.ballFile === 'string' ? appearance.ballFile : '',
          typeof appearance.ballKind === 'string' ? appearance.ballKind : 'image',
        ),
        ...withCurrentHistory(
          normalizeHistory(appearance.chatBackgroundHistory, root),
          typeof appearance.chatBackgroundFile === 'string' ? appearance.chatBackgroundFile : '',
          'image',
        ),
      ]
      const entry = entries.find((item) => item.id === id)
      if (!entry || !isOwnMediaFile(root, entry.file) || !existsSync(entry.file)) {
        res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' })
        res.end('no history media')
        return
      }
      res.writeHead(200, {
        'content-type': contentTypeOf(entry.file),
        'cache-control': 'no-cache',
      })
      const stream = createReadStream(entry.file)
      stream.on('error', () => {
        if (!res.headersSent) res.writeHead(500)
        res.end()
      })
      stream.pipe(res)
      return
    }
    if (req.method === 'GET' && rest === '/ball') {
      const appearance = readAppearance(root)
      const file = typeof appearance.ballFile === 'string' ? appearance.ballFile : ''
      if (!isOwnMediaFile(root, file) || !existsSync(file)) {
        res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' })
        res.end('no ball icon')
        return
      }
      const size = statSync(file).size
      const range = parseByteRange(req.headers.range, size)
      if (range === false) {
        res.writeHead(416, { 'content-range': `bytes */${size}` })
        res.end()
        return
      }
      if (range) {
        const { start, end } = range
        res.writeHead(206, {
          'content-type': contentTypeOf(file),
          'cache-control': 'no-cache',
          'accept-ranges': 'bytes',
          'content-range': `bytes ${start}-${end}/${size}`,
          'content-length': end - start + 1,
        })
        const stream = createReadStream(file, { start, end })
        stream.on('error', () => {
          if (!res.headersSent) res.writeHead(500)
          res.end()
        })
        stream.pipe(res)
        return
      }
      res.writeHead(200, {
        'content-type': contentTypeOf(file),
        'cache-control': 'no-cache',
        'accept-ranges': 'bytes',
        'content-length': size,
      })
      const stream = createReadStream(file)
      stream.on('error', () => {
        if (!res.headersSent) res.writeHead(500)
        res.end()
      })
      stream.pipe(res)
      return
    }
    if (req.method === 'GET' && rest === '/background') {
      const appearance = readAppearance(root)
      const file = typeof appearance.chatBackgroundFile === 'string' ? appearance.chatBackgroundFile : ''
      if (!isOwnMediaFile(root, file) || !existsSync(file)) {
        res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' })
        res.end('no background')
        return
      }
      res.writeHead(200, {
        'content-type': contentTypeOf(file),
        'cache-control': 'no-cache',
      })
      const stream = createReadStream(file)
      stream.on('error', () => {
        if (!res.headersSent) res.writeHead(500)
        res.end()
      })
      stream.pipe(res)
      return
    }
    if (req.method === 'POST' && (rest === '/history-select' || rest === '/history-delete')) {
      try {
        const body = JSON.parse((await readRequestBody(req, 64 * 1024)).toString('utf8') || '{}')
        const kind = body && body.kind === 'chat' ? 'chat' : 'ball'
        const id = body && typeof body.id === 'string' ? body.id : ''
        const next = { ...readAppearance(root) }
        const historyKey = kind === 'ball' ? 'ballHistory' : 'chatBackgroundHistory'
        const currentFile =
          kind === 'ball'
            ? typeof next.ballFile === 'string'
              ? next.ballFile
              : ''
            : typeof next.chatBackgroundFile === 'string'
              ? next.chatBackgroundFile
              : ''
        const entries = withCurrentHistory(normalizeHistory(next[historyKey], root), currentFile, kind === 'ball' ? next.ballKind : 'image')
        const entry = entries.find((item) => item.id === id)
        if (!entry) {
          res.writeHead(404, { 'content-type': 'application/json; charset=utf-8' })
          res.end(JSON.stringify({ ok: false, reason: 'history item not found' }))
          return
        }
        if (rest === '/history-select') {
          if (kind === 'ball') {
            next.ballKind = entry.kind
            next.ballFile = entry.file
            next.ballColor = ''
            next.ballCrop = null
          } else {
            next.chatBackgroundType = 'image'
            next.chatBackgroundFile = entry.file
            next.chatBackgroundColor = ''
            next.chatBackgroundCrop = null
          }
          writeAppearance(root, next)
          res.writeHead(200, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' })
          res.end(JSON.stringify({ ok: true }))
          return
        }
        const remaining = normalizeHistory(next[historyKey], root).filter((item) => item.id !== id)
        next[historyKey] = remaining
        if (currentFile && currentFile === entry.file) {
          if (kind === 'ball') {
            next.ballKind = 'builtin'
            next.ballFile = ''
            next.ballColor = ''
            next.ballCrop = null
          } else {
            next.chatBackgroundType = 'none'
            next.chatBackgroundFile = ''
            next.chatBackgroundColor = ''
            next.chatBackgroundCrop = null
          }
        }
        writeAppearance(root, next)
        res.writeHead(200, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' })
        res.end(JSON.stringify({ ok: true }))
      } catch (error) {
        res.writeHead(400, { 'content-type': 'application/json; charset=utf-8' })
        res.end(JSON.stringify({ ok: false, reason: error instanceof Error ? error.message : String(error) }))
      }
      return
    }
    if (req.method === 'POST' && rest === '/appearance') {
      try {
        const body = JSON.parse((await readRequestBody(req, 1024 * 1024)).toString('utf8'))
        const next = { ...readAppearance(root) }
        const colorOf = (value, fallback) =>
          typeof value === 'string' && /^#[0-9a-fA-F]{6}$/.test(value) ? value : fallback
        if (body && body.ball && typeof body.ball === 'object') {
          if (body.ball.kind === 'color') {
            next.ballKind = 'color'
            next.ballColor = colorOf(body.ball.color, '#4d6bfe')
            next.ballFile = ''
            next.ballCrop = null
          } else if (body.ball.kind === 'builtin') {
            next.ballKind = 'builtin'
            next.ballColor = ''
            next.ballFile = ''
            next.ballCrop = null
          }
          if (body.ball.shape !== undefined) next.ballShape = ballShapeOf(body.ball.shape)
          if (body.ball.size !== undefined) next.ballSize = ballSizeOf(body.ball.size)
          if (body.ball.crop !== undefined) next.ballCrop = ballCropOf(body.ball.crop)
        }
        if (body && body.chatBackground && typeof body.chatBackground === 'object') {
          if (body.chatBackground.type === 'color') {
            next.chatBackgroundType = 'color'
            next.chatBackgroundColor = colorOf(body.chatBackground.color, '#f4f6fb')
            next.chatBackgroundFile = ''
          } else if (body.chatBackground.type === 'none') {
            next.chatBackgroundType = 'none'
            next.chatBackgroundColor = ''
            next.chatBackgroundFile = ''
          }
        }
        if (body && typeof body.assistantName === 'string') {
          next.assistantName = assistantNameOf(body.assistantName)
        }
        if (body && (body.language === 'auto' || body.language === 'zh' || body.language === 'en')) {
          next.language = body.language
        }
        if (body && body.chatBackgroundFit !== undefined) {
          next.chatBackgroundFit = chatBackgroundFitOf(body.chatBackgroundFit)
        }
        if (body && body.chatBackgroundPosition !== undefined) {
          next.chatBackgroundPosition = chatBackgroundPositionOf(body.chatBackgroundPosition)
        }
        if (body && body.chatBackgroundCrop !== undefined) {
          next.chatBackgroundCrop = ballCropOf(body.chatBackgroundCrop)
        }
        if (body && body.messageColors && typeof body.messageColors === 'object') {
          if (body.messageColors.user !== undefined) next.chatUserColor = messageColorOf(body.messageColors.user)
          if (body.messageColors.ai !== undefined) next.chatAiColor = messageColorOf(body.messageColors.ai)
        }
        writeAppearance(root, next)
        res.writeHead(200, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' })
        res.end(JSON.stringify({ ok: true }))
      } catch (error) {
        res.writeHead(error && error.code === 'too-large' ? 413 : 400, {
          'content-type': 'application/json; charset=utf-8',
        })
        res.end(JSON.stringify({ ok: false, reason: error instanceof Error ? error.message : String(error) }))
      }
      return
    }
    if (req.method === 'POST' && rest === '/upload') {
      try {
        const target = url.searchParams.get('target') === 'ball' ? 'ball' : 'chat'
        const name = url.searchParams.get('name') || ''
        const data = await readRequestBody(req, 40 * 1024 * 1024)
        const ext = uploadExtension(name, req.headers['content-type'], target)
        if (data.length === 0 || !ext) {
          res.writeHead(400, { 'content-type': 'application/json; charset=utf-8' })
          res.end(JSON.stringify({ ok: false, reason: 'unsupported file' }))
          return
        }
        const media = join(root, 'media')
        mkdirSync(media, { recursive: true })
        const file = join(media, `${target === 'ball' ? 'ball' : 'chat-bg'}-${Date.now()}-${randomBytes(6).toString('hex')}${ext}`)
        writeFileSync(file, data)
        const next = { ...readAppearance(root) }
        if (target === 'ball') {
          next.ballKind = VIDEO_EXTS.has(ext) ? 'video' : ext === '.gif' ? 'gif' : 'image'
          next.ballFile = file
          next.ballColor = ''
          next.ballCrop = null
          next.ballHistory = addHistory(normalizeHistory(next.ballHistory, root), file, next.ballKind)
        } else {
          next.chatBackgroundType = 'image'
          next.chatBackgroundFile = file
          next.chatBackgroundColor = ''
          next.chatBackgroundCrop = null
          next.chatBackgroundHistory = addHistory(normalizeHistory(next.chatBackgroundHistory, root), file, 'image')
        }
        writeAppearance(root, next)
        res.writeHead(200, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' })
        res.end(JSON.stringify({
          ok: true,
          target,
          kind: next.ballKind || 'image',
          ...(target === 'ball'
            ? { url: `${APPEARANCE_ROUTE}/ball?v=${mediaVersion(file)}`, shape: ballShapeOf(next.ballShape), size: ballSizeOf(next.ballSize) }
            : {}),
        }))
      } catch (error) {
        res.writeHead(error && error.code === 'too-large' ? 413 : 500, {
          'content-type': 'application/json; charset=utf-8',
        })
        res.end(JSON.stringify({ ok: false, reason: error instanceof Error ? error.message : String(error) }))
      }
      return
    }
    if (req.method === 'POST' && rest === '/open') {
      if (!isHelperAlive(root)) {
        res.writeHead(503, { 'content-type': 'application/json; charset=utf-8' })
        res.end(JSON.stringify({ ok: false, reason: 'floating helper is not running' }))
        return
      }
      try {
        writeFileSync(join(root, 'open.request'), String(Date.now()), 'utf8')
        res.writeHead(200, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' })
        res.end(JSON.stringify({ ok: true }))
      } catch (error) {
        res.writeHead(500, { 'content-type': 'application/json; charset=utf-8' })
        res.end(JSON.stringify({ ok: false, reason: error instanceof Error ? error.message : String(error) }))
      }
      return
    }
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' })
    res.end('not found')
  }
}

function controlHelper(root, pid, terminate = false) {
  if (!Number.isSafeInteger(pid) || pid <= 0) return false
  const powershell = join(process.env.SystemRoot || 'C:\\Windows', 'System32', 'WindowsPowerShell', 'v1.0', 'powershell.exe')
  const script = fileURLToPath(new URL('./native/helper-control.ps1', import.meta.url))
  const helper = fileURLToPath(new URL('./native/ball.ps1', import.meta.url))
  const result = spawnSync(powershell, [
    '-NoProfile', '-NonInteractive', '-ExecutionPolicy', 'Bypass', '-File', script,
    '-HelperPid', String(pid), '-HelperScript', helper, '-StateFile', join(root, 'state.json'),
    ...(terminate ? ['-Terminate'] : []),
  ], { windowsHide: true, encoding: 'utf8', timeout: 8000 })
  return result.status === 0 && String(result.stdout).trim() === 'verified'
}

function isHelperAlive(root) {
  try { return controlHelper(root, Number(readFileSync(join(root, 'ball.pid'), 'utf8').trim())) }
  catch { return false }
}

function killPreviousHelper(root) {
  try {
    const pid = Number(readFileSync(join(root, 'ball.pid'), 'utf8').trim())
    if (!controlHelper(root, pid, true)) logHost('previous helper not terminated: identity unavailable or mismatched')
  } catch { /* no previous helper */ }
}

/**
 * Start the desktop ball and return its disposer.
 * @param {import('@deepseek-ai/cordis').Context} ctx - Host context with connection and webServer.
 * @returns {() => void} disposer owned by the plugin fiber.
 */
function startDesktopBall(ctx) {
  const root = localRoot()
  killPreviousHelper(root)

  const base = `${ctx.webServer.protocol}//127.0.0.1:${ctx.webServer.port}`
  const url = new URL(ctx.connection.authenticatedUrl(base))
  url.searchParams.set('dsh-ball-v', CLIENT_VERSION)
  const nonce = randomBytes(4).toString('hex')
  url.hash = `dsh-quick-chat=${nonce}`

  const state = {
    version: 1,
    url: url.href,
    title: `桌面悬浮球 · DSH ${nonce}`,
    pid: process.pid,
    edgeProfile: join(root, 'edge-profile'),
    webviewProfile: join(root, 'webview-profile'),
    positionFile: join(root, 'ball-position.json'),
    log: join(root, 'ball.log'),
    labels: {
      tooltip: '桌面悬浮球：点击打开',
      open: '打开桌面悬浮球',
      close: '关闭桌面悬浮球',
      icon: '更换悬浮球图标…',
      background: '更换聊天背景…',
      exit: '退出悬浮球（重启 DSH 恢复）',
    },
  }
  const statePath = writeState(root, state)
  const pidPath = join(root, 'ball.pid')
  const script = fileURLToPath(new URL('./native/ball.ps1', import.meta.url))
  const powershell = join(process.env.SystemRoot || 'C:\\Windows', 'System32', 'WindowsPowerShell', 'v1.0', 'powershell.exe')

  // Do not detach: on Windows a DETACHED_PROCESS PowerShell starts without a
  // usable desktop context for WPF and exits before creating the ball.
  // `-WindowStyle Hidden` keeps its console out of sight, and the helper owns
  // its own lifetime by watching the Host PID.
  const child = spawn(
    powershell,
    ['-NoProfile', '-STA', '-ExecutionPolicy', 'Bypass', '-WindowStyle', 'Hidden', '-File', script, '-StatePath', statePath],
    { detached: false, windowsHide: false, stdio: 'ignore' },
  )
  logHost(`helper spawned pid=${String(child.pid)} state=${statePath}`)
  child.on('error', (error) => {
    logHost(`helper spawn error: ${error instanceof Error ? error.stack || error.message : String(error)}`)
    console.warn('[quick-chat] desktop ball failed to start', error)
  })
  child.on('exit', (code) => {
    logHost(`helper exited code=${String(code)}`)
    if (code !== 0 && code !== null) console.warn(`[quick-chat] desktop ball helper exited with code ${String(code)}`)
  })
  child.unref()

  let disposed = false
  return () => {
    if (disposed) return
    disposed = true
    controlHelper(root, child.pid, true)
    // An older instance must not remove a replacement host's state or PID file.
    try {
      const current = JSON.parse(readFileSync(statePath, 'utf8'))
      if (current.url !== state.url) return
      rmSync(pidPath, { force: true })
      rmSync(statePath, { force: true })
    } catch (error) {
      if (error.code !== 'ENOENT') logHost(`helper state cleanup failed: ${error.message}`)
    }
  }
}

/**
 * Register the Windows desktop ball. Other platforms keep the renderer-only
 * bubble from the client half.
 */
export function apply(ctx) {
  // Appearance API is useful on every platform (the browser overlay can use a
  // custom chat background even when the WPF ball is unavailable).
  const root = localRoot()
  try {
    ctx.effect(
      () =>
        ctx.webServer.register({
          kind: 'prefix',
          path: APPEARANCE_ROUTE,
          handler: createAppearanceHandler(root, ctx),
        }),
      'quick-chat: appearance route',
    )
  } catch (error) {
    logHost(`appearance route unavailable: ${error instanceof Error ? error.stack || error.message : String(error)}`)
  }

  if (!isWindows) return
  const desktop = isDesktopHost(ctx)
  logHost(
    `apply electron=${process.versions.electron || 'none'} desktop=${desktop} ` +
      `profile=${process.env.DSH_PROFILE || 'none'} shell=${process.env.DSH_SHELL || 'none'} argv=${process.argv.join(' ')}`,
  )
  if (!desktop) return
  try {
    ctx.effect(() => startDesktopBall(ctx), 'quick-chat: desktop ball')
    logHost('desktop ball requested')
    console.info('[quick-chat] desktop ball requested')
  } catch (error) {
    logHost(`desktop ball unavailable: ${error instanceof Error ? error.stack || error.message : String(error)}`)
    console.warn('[quick-chat] desktop ball unavailable', error)
  }
}
