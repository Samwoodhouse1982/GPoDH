# Analytics archive

A permanent, in-repo copy of the site's monthly traffic numbers — because
Vercel's free tier only keeps the last ~30 days.

A scheduled job (`.github/workflows/archive-analytics.yml`) writes one folder
per month here on the 1st of each month:

```
analytics-archive/
  index.csv          ← one row per month (month, total, when it was fetched)
  2026-05/
    raw.json         ← the full raw data (the real archive — source of truth)
    summary.csv      ← month total + what was/wasn't captured
    path.csv         ← top pages
    referrer.csv     ← where visitors came from
    country.csv      ← visitors by country
    device.csv / os.csv / browser.csv
```

- **`raw.json` is the source of truth.** The `.csv` files are tidy summaries
  generated from it; if a column ever looks off, `raw.json` still has everything.
- **Setup / how it works / how to run it by hand:** see `HANDOFF.md` §10.
- If the automatic export ever fails, the job opens a GitHub **issue** reminding
  you to save that month from the Vercel dashboard by hand, so nothing is lost.
