// Download the org-marquee logos listed in src/data/org-logos.json into
// public/logos/, so the homepage marquee serves them from our own domain instead
// of hotlinking external hosts (which can break or block hotlinking at any time).
//
// The marquee already prefers /logos/<file> and falls back to the remote URL on
// error, so running this just makes the self-hosting take effect. Re-run it if a
// logo URL is updated in org-logos.json.
//
// Run (needs outbound network):  node scripts/fetch-org-logos.mjs

import { readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'

const DATA = path.join('src', 'data', 'org-logos.json')
const OUT_DIR = path.join('public', 'logos')

const UA =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'

async function main() {
  const orgs = JSON.parse(await readFile(DATA, 'utf8'))
  await mkdir(OUT_DIR, { recursive: true })

  let ok = 0
  const failed = []

  for (const org of orgs) {
    if (!org.remote) continue // already self-hosted (e.g. LSHTM)
    const dest = path.join(OUT_DIR, org.file)
    try {
      const res = await fetch(org.remote, { headers: { 'User-Agent': UA, Accept: 'image/*,*/*' } })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const buf = Buffer.from(await res.arrayBuffer())
      if (buf.length < 100) throw new Error(`suspiciously small (${buf.length} bytes)`)
      await writeFile(dest, buf)
      console.log(`✓ ${org.name} → ${dest} (${Math.round(buf.length / 1024)} KB)`)
      ok++
    } catch (err) {
      console.error(`✗ ${org.name}: ${err.message}`)
      failed.push(org.name)
    }
  }

  console.log(`\nDone: ${ok} downloaded${failed.length ? `, ${failed.length} failed (${failed.join(', ')})` : ''}.`)
  if (failed.length) {
    console.log('Failed logos keep using their remote URL via the marquee fallback.')
    process.exitCode = 1
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
