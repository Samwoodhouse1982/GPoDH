// Monthly archive of Vercel Web Analytics into the repo.
//
// WHY: Vercel's free tier only retains ~30 days of analytics. This script pulls
// the *previous* month's numbers and writes them into analytics-archive/ so the
// history is kept forever in git. It is run by
// .github/workflows/archive-analytics.yml on the 1st of each month.
//
// IMPORTANT — this uses Vercel's *internal* web-analytics endpoint, which is not
// an officially documented/stable API. It can change without notice. The script
// is therefore defensive: it always saves the raw API responses (the real
// archive) and treats the tidy CSV summaries as best-effort. If the whole fetch
// fails, it exits non-zero so the workflow can open a reminder issue instead of
// failing silently. If/when the endpoint changes, only the constants below and
// the small extract helpers should need tweaking.
//
// Required env (set as GitHub Actions secrets/vars — see HANDOFF §10):
//   VERCEL_TOKEN       (secret)  personal token from vercel.com/account/tokens
//   VERCEL_PROJECT_ID  (var)     Project → Settings → general → Project ID
//   VERCEL_TEAM_ID     (var)     only if the project lives under a Team
//   VERCEL_ENV         (var)     defaults to "production"
//
// Run locally:  VERCEL_TOKEN=... VERCEL_PROJECT_ID=... node scripts/export-analytics.mjs [YYYY-MM]

import { mkdir, writeFile, readFile } from 'node:fs/promises'
import path from 'node:path'

const API_BASE = 'https://vercel.com/api/web-analytics'
const ARCHIVE_DIR = 'analytics-archive'

// Breakdowns to archive. The timeseries gives the monthly totals; each "stat"
// gives a top-N table. Unknown/!supported breakdowns are skipped gracefully.
const BREAKDOWNS = ['path', 'referrer', 'country', 'device', 'os', 'browser']

const TOKEN = process.env.VERCEL_TOKEN
const PROJECT_ID = process.env.VERCEL_PROJECT_ID
const TEAM_ID = process.env.VERCEL_TEAM_ID || ''
const ENVIRONMENT = process.env.VERCEL_ENV || 'production'

function monthRange(label) {
  let year, month // month is 0-based
  if (label) {
    const [y, m] = label.split('-').map(Number)
    year = y
    month = m - 1
  } else {
    const now = new Date()
    year = now.getUTCFullYear()
    month = now.getUTCMonth() - 1
    if (month < 0) { month = 11; year-- }
  }
  const from = new Date(Date.UTC(year, month, 1, 0, 0, 0))
  const to = new Date(Date.UTC(year, month + 1, 1, 0, 0, 0))
  const lbl = `${from.getUTCFullYear()}-${String(from.getUTCMonth() + 1).padStart(2, '0')}`
  return { from, to, label: lbl }
}

function buildUrl(pathname, from, to) {
  const u = new URL(`${API_BASE}/${pathname}`)
  u.searchParams.set('projectId', PROJECT_ID)
  u.searchParams.set('environment', ENVIRONMENT)
  u.searchParams.set('from', from.toISOString())
  u.searchParams.set('to', to.toISOString())
  u.searchParams.set('limit', '100')
  if (TEAM_ID) u.searchParams.set('teamId', TEAM_ID)
  return u.toString()
}

async function getJson(url) {
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${TOKEN}`, Accept: 'application/json' },
  })
  const text = await res.text()
  if (!res.ok) {
    const snippet = text.slice(0, 300)
    throw new Error(`${res.status} ${res.statusText} for ${url}\n${snippet}`)
  }
  try {
    return JSON.parse(text)
  } catch {
    throw new Error(`Non-JSON response for ${url}: ${text.slice(0, 200)}`)
  }
}

// The API shape isn't guaranteed; pull a [{ label, total }] list out of whatever
// comes back so the CSVs survive minor response changes.
function toRows(json) {
  const arr = Array.isArray(json) ? json : json?.data || json?.rows || json?.results || []
  if (!Array.isArray(arr)) return []
  return arr.map((item) => {
    const label =
      item.key ?? item.path ?? item.value ?? item.referrer ?? item.country ??
      item.name ?? item.label ?? JSON.stringify(item)
    const total =
      item.total ?? item.count ?? item.visitors ?? item.views ?? item.value ?? ''
    return { label: String(label), total }
  })
}

function csvEscape(v) {
  const s = String(v ?? '')
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

function toCsv(header, rows) {
  return [header.map(csvEscape).join(','), ...rows.map((r) => r.map(csvEscape).join(','))].join('\n') + '\n'
}

async function main() {
  if (!TOKEN || !PROJECT_ID) {
    throw new Error('Missing VERCEL_TOKEN or VERCEL_PROJECT_ID — see HANDOFF §10 for setup.')
  }

  const { from, to, label } = monthRange(process.argv[2])
  console.log(`Exporting Vercel analytics for ${label} (${from.toISOString()} → ${to.toISOString()})`)

  const raw = { month: label, from: from.toISOString(), to: to.toISOString(), fetchedAt: new Date().toISOString(), timeseries: null, breakdowns: {}, errors: {} }
  let anySuccess = false

  // 1. Timeseries → monthly totals.
  try {
    raw.timeseries = await getJson(buildUrl('timeseries', from, to))
    anySuccess = true
  } catch (err) {
    raw.errors.timeseries = String(err.message || err)
    console.error('timeseries failed:', raw.errors.timeseries)
  }

  // 2. Each breakdown (top pages, referrers, countries, …).
  for (const key of BREAKDOWNS) {
    try {
      raw.breakdowns[key] = await getJson(buildUrl(`stats/${key}`, from, to))
      anySuccess = true
    } catch (err) {
      raw.errors[key] = String(err.message || err)
      console.error(`stats/${key} failed:`, raw.errors[key])
    }
  }

  if (!anySuccess) {
    throw new Error(
      'Every analytics request failed — the endpoint, token, or IDs are likely wrong.\n' +
        'First error: ' + (raw.errors.timeseries || Object.values(raw.errors)[0])
    )
  }

  // --- Write the archive --------------------------------------------------
  const dir = path.join(ARCHIVE_DIR, label)
  await mkdir(dir, { recursive: true })
  await writeFile(path.join(dir, 'raw.json'), JSON.stringify(raw, null, 2) + '\n')

  // Best-effort monthly total from the timeseries.
  const tsRows = toRows(raw.timeseries)
  const monthTotal = tsRows.reduce((sum, r) => sum + (Number(r.total) || 0), 0)

  // Per-breakdown CSVs.
  for (const key of BREAKDOWNS) {
    const rows = toRows(raw.breakdowns[key])
    if (rows.length) {
      await writeFile(path.join(dir, `${key}.csv`), toCsv([key, 'total'], rows.map((r) => [r.label, r.total])))
    }
  }

  // A one-line human summary for the month.
  await writeFile(
    path.join(dir, 'summary.csv'),
    toCsv(['metric', 'value'], [
      ['month', label],
      ['from', raw.from],
      ['to', raw.to],
      ['total_pageviews_or_visits', monthTotal || 'see raw.json'],
      ['breakdowns_saved', Object.keys(raw.breakdowns).filter((k) => toRows(raw.breakdowns[k]).length).join(' ') || 'none'],
      ['breakdowns_failed', Object.keys(raw.errors).join(' ') || 'none'],
    ])
  )

  // --- Append to the rolling history index --------------------------------
  const indexPath = path.join(ARCHIVE_DIR, 'index.csv')
  let index = ''
  try { index = await readFile(indexPath, 'utf8') } catch {}
  const lines = index.trim() ? index.trim().split('\n') : ['month,total_pageviews_or_visits,fetched_at']
  const header = lines[0]
  const body = lines.slice(1).filter((l) => !l.startsWith(label + ','))
  body.push([label, monthTotal || '', raw.fetchedAt].map(csvEscape).join(','))
  body.sort() // chronological because labels are YYYY-MM
  await writeFile(indexPath, [header, ...body].join('\n') + '\n')

  console.log(`Saved ${dir}/  (month total ≈ ${monthTotal || 'unknown — see raw.json'})`)
  if (Object.keys(raw.errors).length) {
    console.log('Some breakdowns were skipped:', Object.keys(raw.errors).join(', '))
  }

  if (process.env.GITHUB_OUTPUT) {
    const { appendFile } = await import('node:fs/promises')
    await appendFile(process.env.GITHUB_OUTPUT, `month=${label}\ntotal=${monthTotal || ''}\n`)
  }
}

main().catch((err) => {
  console.error('\nEXPORT FAILED:', err.message || err)
  process.exit(1)
})
