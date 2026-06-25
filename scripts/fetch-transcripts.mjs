// Fetch YouTube transcripts for videos that don't have one yet and append them
// to src/lib/video-transcripts.ts (keyed by slug).
//
// Designed to run in CI (GitHub Actions can reach YouTube; locked-down dev
// sandboxes usually can't). For every entry in src/data/videos.json whose slug
// is not already in video-transcripts.ts and which has no inline `transcript`,
// it resolves the caption track from the watch page and writes cleaned text.
// Videos without captions yet (e.g. just uploaded, auto-captions not ready) are
// skipped and picked up on a later run — the script is idempotent.
//
//   node scripts/fetch-transcripts.mjs
//
// The video page already renders whatever this produces: it reads
// `video.transcript ?? videoTranscripts[slug]` and shows a Transcript toggle.

import { readFile, writeFile, appendFile } from 'node:fs/promises'
import path from 'node:path'

const VIDEOS_PATH = path.join('src', 'data', 'videos.json')
const TRANSCRIPTS_PATH = path.join('src', 'lib', 'video-transcripts.ts')
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36'

// ─── Pure helpers (exported for unit testing) ───────────────────────────────

export const decode = (s = '') =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&#34;/g, '"')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))

// Pull a balanced JSON array for `key` out of a blob, tolerant of nested
// brackets and brackets inside strings (a plain non-greedy regex breaks when a
// track name uses {"runs":[...]}).
export function extractBalancedArray(text, key) {
  const start = text.indexOf(`"${key}":`)
  if (start === -1) return null
  const open = text.indexOf('[', start)
  if (open === -1) return null
  let depth = 0
  let inStr = false
  let esc = false
  for (let i = open; i < text.length; i++) {
    const c = text[i]
    if (inStr) {
      if (esc) esc = false
      else if (c === '\\') esc = true
      else if (c === '"') inStr = false
    } else if (c === '"') inStr = true
    else if (c === '[') depth++
    else if (c === ']') {
      depth--
      if (depth === 0) return text.slice(open, i + 1)
    }
  }
  return null
}

// timedtext XML -> array of cleaned caption segments.
export function parseTimedText(xml) {
  return [...xml.matchAll(/<text[^>]*>([\s\S]*?)<\/text>/g)]
    .map(([, s]) => decode(s).replace(/\s+/g, ' ').trim())
    .filter(Boolean)
}

// Caption segments -> readable paragraphs (the page renders pre-wrap). Breaks at
// a sentence end once past `target`, or forces a break well past it so that
// unpunctuated auto-captions still get paragraphs.
export function toParagraphs(segments, target = 600) {
  const text = segments.join(' ').replace(/\s+/g, ' ').trim()
  if (!text) return ''
  const out = []
  let buf = ''
  for (const word of text.split(' ')) {
    buf += (buf ? ' ' : '') + word
    if ((buf.length >= target && /[.?!]["')]?$/.test(word)) || buf.length >= target * 1.8) {
      out.push(buf)
      buf = ''
    }
  }
  if (buf) out.push(buf)
  return out.join('\n\n')
}

// Choose the best caption track: manual English, then any English, then first.
export function pickTrack(tracks) {
  return (
    tracks.find((t) => t.languageCode === 'en' && t.kind !== 'asr') ||
    tracks.find((t) => t.languageCode === 'en') ||
    tracks.find((t) => (t.languageCode || '').startsWith('en')) ||
    tracks[0] ||
    null
  )
}

// Build one TS map entry: a title comment + "slug": "text",
export function renderEntry(slug, title, text) {
  return `  // ${String(title).replace(/\r?\n/g, ' ')}\n  ${JSON.stringify(slug)}: ${JSON.stringify(text)},\n`
}

// Splice new entries in just after the object's opening brace.
export function insertEntries(source, entries) {
  const anchor = 'export const videoTranscripts: Record<string, string> = {\n'
  const at = source.indexOf(anchor)
  if (at === -1) throw new Error('Could not find the videoTranscripts object opener')
  const cut = at + anchor.length
  return source.slice(0, cut) + entries.join('') + source.slice(cut)
}

export function existingSlugs(tsSource) {
  return new Set([...tsSource.matchAll(/^ {2}"([^"]+)":/gm)].map((m) => m[1]))
}

// ─── Network + orchestration ────────────────────────────────────────────────

async function fetchText(url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA, 'Accept-Language': 'en-US,en;q=0.9' } })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.text()
}

export async function fetchTranscript(videoId, fetcher = fetchText) {
  const html = await fetcher(`https://www.youtube.com/watch?v=${videoId}&hl=en`)
  const arr = extractBalancedArray(html, 'captionTracks')
  if (!arr) return null // no captions available (yet)
  let tracks
  try {
    tracks = JSON.parse(arr)
  } catch {
    return null
  }
  const track = pickTrack(tracks)
  if (!track?.baseUrl) return null
  const segments = parseTimedText(await fetcher(track.baseUrl))
  if (!segments.length) return null
  return toParagraphs(segments)
}

async function main() {
  const { videos } = JSON.parse(await readFile(VIDEOS_PATH, 'utf8'))
  const tsSource = await readFile(TRANSCRIPTS_PATH, 'utf8')
  const have = existingSlugs(tsSource)

  const todo = videos.filter(
    (v) => v.youtubeVideoId && !have.has(v.slug) && !(v.transcript && v.transcript.trim()),
  )
  if (todo.length === 0) {
    console.log('Every video already has a transcript.')
    if (process.env.GITHUB_OUTPUT) await appendFile(process.env.GITHUB_OUTPUT, 'added=0\n')
    return
  }
  console.log(`Looking for transcripts for ${todo.length} video(s) without one...`)

  const entries = []
  for (const v of todo) {
    try {
      const text = await fetchTranscript(v.youtubeVideoId)
      if (!text) {
        console.log(`- skip  ${v.slug} (no captions available yet)`)
      } else {
        entries.push(renderEntry(v.slug, v.title, text))
        console.log(`- added ${v.slug} (${text.length} chars)`)
      }
    } catch (err) {
      console.log(`- skip  ${v.slug} (${err.message})`)
    }
    await new Promise((r) => setTimeout(r, 800)) // be gentle on YouTube
  }

  if (entries.length === 0) {
    console.log('No new transcripts available this run.')
    if (process.env.GITHUB_OUTPUT) await appendFile(process.env.GITHUB_OUTPUT, 'added=0\n')
    return
  }

  await writeFile(TRANSCRIPTS_PATH, insertEntries(tsSource, entries))
  console.log(`Wrote ${entries.length} transcript(s) to ${TRANSCRIPTS_PATH}.`)
  if (process.env.GITHUB_OUTPUT) await appendFile(process.env.GITHUB_OUTPUT, `added=${entries.length}\n`)
}

// Only run when executed directly (so tests can import the helpers above).
if (process.argv[1] && process.argv[1].endsWith('fetch-transcripts.mjs')) {
  main().catch((err) => {
    console.error(err)
    process.exit(1)
  })
}
