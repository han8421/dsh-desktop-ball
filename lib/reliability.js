import { readdirSync, rmSync } from 'node:fs'
import { basename, join, resolve } from 'node:path'

// null means ignore an unsupported/malformed Range and send the full resource.
// false means a syntactically valid but unsatisfiable single byte range.
export function parseByteRange(value, size) {
  if (typeof value !== 'string') return null
  const match = /^bytes=(\d*)-(\d*)$/.exec(value.trim())
  if (!match || (!match[1] && !match[2])) return null
  if (size === 0) return false
  const first = match[1] ? Number(match[1]) : null
  const last = match[2] ? Number(match[2]) : null
  if ((first !== null && !Number.isSafeInteger(first)) || (last !== null && !Number.isSafeInteger(last))) return false
  if (first === null) return last > 0 ? { start: Math.max(0, size - last), end: size - 1 } : false
  if (first >= size || (last !== null && last < first)) return false
  return { start: first, end: Math.min(last ?? size - 1, size - 1) }
}

// Only generated, direct children are eligible. Never follow directories or links.
export function pruneMedia(root, appearance, onError = () => {}) {
  const media = resolve(root, 'media')
  const referenced = new Set([
    appearance.ballFile, appearance.chatBackgroundFile,
    ...(Array.isArray(appearance.ballHistory) ? appearance.ballHistory.map(x => x?.file) : []),
    ...(Array.isArray(appearance.chatBackgroundHistory) ? appearance.chatBackgroundHistory.map(x => x?.file) : []),
  ].filter(x => typeof x === 'string' && x).map(x => resolve(x).toLowerCase()))
  try {
    for (const entry of readdirSync(media, { withFileTypes: true })) {
      if (!entry.isFile() || !/^(ball|chat-bg)-\d+(?:-[a-f0-9]+)?\.(png|jpe?g|gif|webp|bmp|mp4|wmv|avi|mov|webm)$/i.test(entry.name)) continue
      const file = join(media, basename(entry.name))
      if (referenced.has(file.toLowerCase())) continue
      try { rmSync(file) } catch (error) { onError(error) }
    }
  } catch (error) {
    if (error.code !== 'ENOENT') onError(error)
  }
}
