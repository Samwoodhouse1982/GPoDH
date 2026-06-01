// Sync new YouTube uploads into src/data/videos.json.
//
// Resolves the channel from its handle, reads the public RSS feed, and appends
// any uploads that aren't already listed (newest first) with sensible defaults.
// Category and tags are intentionally left for a human to fill in during review
// — this script is run by .github/workflows/sync-videos.yml, which opens a PR.
//
// Run locally with:  node scripts/sync-videos.mjs

import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const HANDLE = 'globalpdhpodcast'
const DATA_PATH = path.join('src', 'data', 'videos.json')

const decode = (s = '') =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .trim()

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
    .replace(/-+$/g, '')

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const fmtDate = (iso) => {
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? '' : `${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`
}

const trimDescription = (s) => {
  const clean = decode(s).replace(/\s+/g, ' ').trim()
  if (clean.length <= 400) return clean
  const cut = clean.slice(0, 400)
  const lastStop = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('! '), cut.lastIndexOf('? '))
  return (lastStop > 200 ? cut.slice(0, lastStop + 1) : cut.replace(/\s+\S*$/, '')) + '…'
}

async function resolveChannelId(handle) {
  const res = await fetch(`https://www.youtube.com/@${handle}`, {
    headers: { 'User-Agent': 'Mozilla/5.0 (gpodh-video-sync)', 'Accept-Language': 'en' },
  })
  if (!res.ok) throw new Error(`Channel page fetch failed: ${res.status}`)
  const html = await res.text()
  const m =
    html.match(/"channelId":"(UC[\w-]+)"/) ||
    html.match(/channel\/(UC[\w-]+)/) ||
    html.match(/"externalId":"(UC[\w-]+)"/)
  if (!m) throw new Error('Could not resolve channelId from channel page')
  return m[1]
}

async function fetchFeed(channelId) {
  const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`)
  if (!res.ok) throw new Error(`RSS fetch failed: ${res.status}`)
  const xml = await res.text()
  const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map(([, e]) => ({
    videoId: (e.match(/<yt:videoId>([^<]+)<\/yt:videoId>/) || [])[1] || '',
    title: decode((e.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || ''),
    published: (e.match(/<published>([^<]+)<\/published>/) || [])[1] || '',
    description: (e.match(/<media:description>([\s\S]*?)<\/media:description>/) || [])[1] || '',
  }))
  return entries.filter((x) => x.videoId)
}

async function main() {
  const videos = JSON.parse(await readFile(DATA_PATH, 'utf8'))
  const existingIds = new Set(videos.map((v) => v.youtubeVideoId))
  const existingSlugs = new Set(videos.map((v) => v.slug))
  let maxId = videos.reduce((m, v) => Math.max(m, Number(v.id) || 0), 0)

  const channelId = await resolveChannelId(HANDLE)
  const feed = await fetchFeed(channelId)

  // Oldest → newest so we can unshift and keep the newest at the front.
  const fresh = feed
    .filter((e) => !existingIds.has(e.videoId))
    .sort((a, b) => new Date(a.published) - new Date(b.published))

  if (fresh.length === 0) {
    console.log('No new videos.')
    return
  }

  const added = []
  for (const e of fresh) {
    let slug = slugify(e.title) || `video-${e.videoId.toLowerCase()}`
    let unique = slug
    let n = 2
    while (existingSlugs.has(unique)) unique = `${slug}-${n++}`
    existingSlugs.add(unique)
    const entry = {
      id: String(++maxId),
      slug: unique,
      title: e.title,
      description: trimDescription(e.description),
      youtubeVideoId: e.videoId,
      date: fmtDate(e.published),
      // category and tags left blank for a human to set during PR review.
      tags: [],
    }
    videos.unshift(entry)
    added.push(entry)
  }

  await writeFile(DATA_PATH, JSON.stringify(videos, null, 2) + '\n')

  const summary = added.map((v) => `- ${v.title} (${v.youtubeVideoId})`).join('\n')
  console.log(`Added ${added.length} video(s):\n${summary}`)

  // Surface details to the workflow for the PR body.
  if (process.env.GITHUB_OUTPUT) {
    const { appendFile } = await import('node:fs/promises')
    await appendFile(
      process.env.GITHUB_OUTPUT,
      `added=${added.length}\n` +
        `summary<<EOF\n${summary}\nEOF\n`
    )
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
