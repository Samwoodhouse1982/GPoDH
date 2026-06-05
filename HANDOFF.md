# GPODH — Project Handoff & Operating Manual

> **Audience:** Dr Shubs Upadhyay and any AI assistant (Claude / Claude Code) or
> developer taking over the **Global Perspectives on Digital Health (GPODH)**
> website. This document is intended to be exhaustive enough that someone with
> zero prior context can run, edit, deploy, and extend the project safely.
>
> **Last updated:** 2026-06-01.
> **Maintainer of record going forward:** Shubs Upadhyay (shwoodhouse@gmail.com).
>
> **Related docs:** `EDITING-GUIDE.md` (non-technical content editing) ·
> `HANDOVER.md` (non-technical guide to transferring ownership of the site to a
> new owner — GitHub repo, Vercel, OAuth App, domain).

---

## 0. ⚠️ Read this first (security & secrets policy)

**No live secret values are stored in this repository, and none should ever be.**
Committing a token, OAuth secret, or API key to git leaks it permanently (git
history is forever, even after deletion). This file therefore contains a
**registry of which secrets exist and where they live**, never the values
themselves. See [§9 Secrets registry](#9-secrets-registry).

**Action required:** During the build of this project, several GitHub Personal
Access Tokens (PATs) were pasted into a chat transcript. **Treat all of them as
compromised and revoke them** at GitHub → *Settings → Developer settings →
Personal access tokens*. Generate fresh ones as needed (see §9).

---

## 1. What this project is

GPODH is the website for the **Global Perspectives on Digital Health** podcast,
hosted by Dr Shubs Upadhyay. It showcases podcast **episodes**, **videos**
(talks/panels/clips from the YouTube channel), resources, a "work with us"
page, and a contact page. It also funnels toward Shubs' consulting
(`shubs.me`) and newsletter (Shubstack).

- **Current deployment URL:** **https://g-po-dh.vercel.app** (the Vercel default
  domain). A custom domain (`gpodh.org` / `www.gpodh.org`) may be attached later;
  if so, update the CMS `base_url` and the OAuth callback to match — see
  [§5 CMS](#5-content-management-decap-cms) and [§11 Blockers](#11-known-blockers-gotchas--decisions).
- **Repository:** `samwoodhouse1982/gpodh` (GitHub), default branch **`master`**.
- **Hosting/deploy:** **Vercel** (auto-deploys on push to `master`).
- **YouTube channel:** https://www.youtube.com/@globalpdhpodcast
- **Podcast hosting:** Transistor (episode embeds use `share.transistor.fm/e/...`).
- **Listen links:** Apple `podcasts.apple.com/us/podcast/id1744026517`,
  Spotify `open.spotify.com/show/15zbPaJeOknH1qZNL4Spau`, YouTube (above).
- **Related properties:** `shubs.me` (consulting), `shubstack.substack.com` (newsletter).

---

## 2. Tech stack

| Area | Choice | Notes |
|---|---|---|
| Framework | **Next.js 16.2.1** (App Router) | ⚠️ See AGENTS.md: this is a newer Next with breaking changes vs. older training data. **Read `node_modules/next/dist/docs/` before using unfamiliar Next APIs.** |
| UI | **React 19**, **TypeScript** | Components are **inline-styled** (style objects), driven by **CSS custom properties** in `src/app/globals.css`. There is *not* a utility-class design system; Tailwind v4 is present but most styling is inline + CSS vars. |
| Styling | Tailwind v4 (`@tailwindcss/postcss`) + CSS variables | Tokens live in `globals.css` (`@theme` block + `:root`). Both must be kept in sync. |
| Fonts | `next/font/google` — Cormorant Garamond (display), DM Sans (body), DM Mono (eyebrows) | `display: swap`. Exposed as `--font-cormorant`, `--font-dm-sans`, `--font-dm-mono`. |
| Search | **Fuse.js** (fuzzy) + a custom synonym **concept map** | See [§7 Search](#7-smart-search). |
| Globe | **d3-geo** + **topojson-client**, canvas-rendered | `HeroGlobe`/`Globe`, dynamically imported `ssr: false`. |
| CMS | **Decap CMS** (git-based, CDN-loaded) | See [§5 CMS](#5-content-management-decap-cms). |
| Deps (runtime) | `d3-geo`, `fuse.js`, `next`, `react`, `react-dom`, `topojson-client` | Deliberately lean. No CSS-in-JS lib, no framer-motion, no three.js. |

**Node:** use Node **20 or 22**. Some maintenance scripts use Node 22's
`--experimental-strip-types` to import `.ts` data files directly.

---

## 3. Repository layout

```
src/
  app/
    layout.tsx              Root layout: fonts, <Nav>, <main id=main-content>, <Footer>, skip-link
    globals.css             Design tokens, resets, animations, reduced-motion, skip-link
    page.tsx                Home (hero + globe, featured episode banner, about, value props, latest)
    episodes/page.tsx       Episodes hero + <EpisodeFilter> (search/filter grid)
    episodes/[slug]/page.tsx  Episode detail (player, bio, timestamps, transcript, related)
    videos/page.tsx         Server wrapper -> <VideoPageClient>
    videos/VideoPageClient.tsx  Videos hero, featured, search, grid, "Surprise me"
    videos/[slug]/page.tsx  Video detail page
    work-with-us/page.tsx   Partnerships + consulting (ConsultingBridge)
    resources/page.tsx      Resource links + Shubstack callout
    contact/page.tsx        Contact form (Web3Forms) + platforms
    api/auth/route.ts       Decap GitHub OAuth — step 1 (redirect to GitHub)
    api/callback/route.ts   Decap GitHub OAuth — step 2 (token exchange -> postMessage)
  components/
    layout/      Nav.tsx, Footer.tsx
    sections/    EpisodeFilter.tsx (episode search), EmailSignup.tsx, GlobeSection.tsx, LatestEpisodesCarousel.tsx
    ui/          EpisodeCard, VideoCard, FeaturedEpisodeBanner, HeroGlobe/Globe, HostModal,
                 SubscribeModal, TrailerModal, EmailSignupTile, OrgMarquee, SpeakerMarquee,
                 TranscriptToggle, ShareButtons, RelatedEpisodes, PlatformBadge, etc.
  lib/
    episodes.ts             Typed loader over src/data/episodes.json + ALL_THEMES/ALL_COUNTRIES
    videos.ts               Typed loader over src/data/videos.json + featuredVideo + CATEGORY_LABELS
    video-transcripts.ts    Legacy video transcripts keyed by slug (fallback for search/display)
    concept-map.ts          CONCEPT_MAP synonym dictionary + expandQuery() (shared by both searches)
    constants.ts            PLATFORMS, SOCIAL, CONSULTING copy
    utm.ts                  withUtm() helper for outbound campaign links
  data/
    episodes.json           { "episodes": [...] }  ← source of truth for episodes
    videos.json             { "videos": [...] }    ← source of truth for videos
public/
  admin/index.html          Decap CMS app (CDN)
  admin/config.yml          Decap collections + backend (direct publish, no PR)
  admin/undo/index.html     "Undo recent changes" tool (see §5) — self-contained, served at /admin/undo
  guests/                   Guest photos (referenced as /guests/<file>); CMS uploads land here
  logo-gpodh*.png, shubs-*.jpg/webp, logos/
scripts/
  sync-videos.mjs           YouTube RSS -> append new videos to videos.json
  export-analytics.mjs      Pulls last month's Vercel analytics -> analytics-archive/
analytics-archive/          Permanent monthly copies of Vercel Web Analytics (see §10)
.github/workflows/
  sync-videos.yml           Daily run of the sync script -> commits new videos straight to master
  archive-analytics.yml     Monthly: saves last month's analytics into analytics-archive/
```

---

## 4. Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (run this before every push to catch errors)
npm run start    # serve the production build
npm run lint     # eslint
```

**Always run `npm run build` before pushing.** The site is statically generated;
a type error or bad data file fails the Vercel deploy.

**The data files are the source of truth.** To edit episodes/videos without the
CMS, edit `src/data/episodes.json` / `src/data/videos.json` directly. `episodes.ts`
and `videos.ts` are thin typed loaders — do not put data back inline in the `.ts`
files.

---

## 5. Content management (Decap CMS)

A git-based CMS lives at **`/admin`** (currently https://g-po-dh.vercel.app/admin).
It edits the JSON data files and commits back to the repo.

### How it works
- `public/admin/index.html` loads Decap CMS from a CDN (no build step / npm dep).
- `public/admin/config.yml` defines:
  - **backend:** GitHub, repo `samwoodhouse1982/gpodh`, branch `master`,
    `base_url: https://g-po-dh.vercel.app`, `auth_endpoint: api/auth`.
  - **No `publish_mode`** — Decap is in *simple* mode, so hitting **Publish**
    commits straight to `master` and Vercel auto-deploys it to production (no PR
    / Workflow tab). Re-add `publish_mode: editorial_workflow` to restore review.
  - **media_folder:** `public/guests` (public path `/guests`) — image uploads.
  - **Two collections** (each edits one JSON file as a list):
    - **Episodes** → `src/data/episodes.json` (all episode fields + `featured` toggle).
    - **Videos** → `src/data/videos.json` (category, tags, transcript, thumbnail, `featured`).
- **Auth** is self-hosted via `src/app/api/auth` and `src/app/api/callback`
  (a standard Decap GitHub OAuth handshake). No third-party CMS cloud is used.

### ⚙️ One-time setup required to switch the CMS on
1. **Create a GitHub OAuth App:** GitHub → *Settings → Developer settings →
   OAuth Apps → New OAuth App*.
   - Homepage URL: `https://g-po-dh.vercel.app`
   - **Authorization callback URL:** `https://g-po-dh.vercel.app/api/callback`
   - Copy the **Client ID**; generate and copy a **Client secret**.
2. **Add env vars in Vercel** (Project → Settings → Environment Variables), then redeploy:
   - `GITHUB_OAUTH_CLIENT_ID`
   - `GITHUB_OAUTH_CLIENT_SECRET`
3. Open `/admin`, "Login with GitHub" (use an account with **write access** to the repo), edit.

### Editing rules / gotchas
- Each collection is a **single file**, so draft/publish **one change at a time**
  rather than keeping several open drafts of the same file (they would conflict).
- **"Appears at the top":** new entries are appended; **drag them to the top** of
  the list so they show first in list order. The homepage banner / featured video
  use the **`featured`** boolean regardless of position.
- `base_url` in `config.yml` and the OAuth callback URL **must match the domain
  you actually open `/admin` on.** It is currently `https://g-po-dh.vercel.app`.
  If you attach a custom domain (e.g. `www.gpodh.org`) and use it for `/admin`,
  update both to that domain or login will fail.

### ↩️ Undo recent changes — `/admin/undo`
Because publishing now goes straight to production with no PR review, there is a
self-serve safety net at **`/admin/undo`** (file: `public/admin/undo/index.html`).

- **What it is:** a single self-contained static page (inline HTML/CSS/JS, no
  build step, no npm dep) — the same pattern as `/admin`. Bookmark-able.
- **Sign-in:** reuses the *exact same* Decap GitHub OAuth popup (`/api/auth` →
  `/api/callback`, same `postMessage` handshake). No new secret or password.
- **What it shows:** the most recent **content** changes (anything touching
  `src/data/**` or `public/guests/**`) in plain English — *"Home page · 2 hours
  ago · Sam"*. Pure code/system commits are filtered out so they can't be
  reverted by accident.
- **What "Undo" does:** restores the file(s) that change touched to their state
  **immediately before** that change, as a new commit on `master` (which Vercel
  redeploys). It is itself just another commit, so an undo can be undone.
  - *Caveat:* it restores to the pre-change version, so if a **later** edit
    touched the **same file**, undoing the earlier one also rolls back that
    later edit **to that file**. Undoing the most recent change is always clean.
- **Security:** all GitHub calls run client-side with the signed-in user's
  token; writing requires **write access to the repo**, so a random GitHub user
  who logs in can read history but cannot change anything.
- **No native Decap feature backs this** — Decap has no version history/revert
  UI; this tool is bespoke and talks to the GitHub Git Data API directly.

---

## 5a. Editable site content (pages & global copy)

Beyond Episodes/Videos, page copy, images and links are being moved out of the
JSX into editable JSON under **`src/data/site/`**, each exposed as a CMS section.
This lets a non-technical editor change wording, images and links **without
touching code**, while the **designed layout stays fixed** (this is structured
content editing, not a freeform drag-and-drop page builder).

**Pattern (how each page is made editable):**
1. Create `src/data/site/<page>.json` holding every editable string/link/image
   path for that page (group related items as nested objects/arrays).
2. In the page/component, `import content from '@/data/site/<page>.json'` and
   replace hard-coded text/links/images with `content.*` references. (Works in
   both server and client components — it's a static import, no new deps.)
3. Add a **file collection** to `public/admin/config.yml` pointing at that JSON,
   with fields mirroring its shape (`object`/`list`/`image`/`string`/`text`
   widgets). Images use `widget: image` (uploads land in `media_folder`).
4. `npm run build` to verify, then commit.

**No new dependencies / no markdown renderer:** rich formatting is achieved with
structure (separate heading/body fields, `list` widgets for bullet points,
explicit link `url` fields), not a markdown parser. If true inline rich text
(bold/links within a paragraph) is needed later, add a renderer (e.g.
`react-markdown`) and switch those fields to `markdown` widgets.

**Status of the rollout:**

| Area | Editable? | Data file |
|---|---|---|
| Episodes | ✅ | `src/data/episodes.json` |
| Videos | ✅ | `src/data/videos.json` |
| Site settings (social, platforms, consulting CTA, SEO) | ✅ | `src/data/site/settings.json` |
| Contact page | ✅ | `src/data/site/contact.json` |
| Home page | ✅ | `src/data/site/home.json` |
| Work With Us page | ✅ | `src/data/site/work-with-us.json` |
| Resources page (intro + link lists) | ✅ | `src/data/site/resources.json` |
| Footer / Nav (labels, links) | ✅ | `src/data/site/global.json` |
| Reusable copy (email signup, modals, host bio) | ✅ | `src/data/site/reusable.json` |
| SEO titles & meta descriptions | ✅ | per-page `meta` + `settings.json` → `seo` |

The whole site is now content-editable. Every page and shared block reads from
JSON under `src/data/site/`, each exposed as a CMS section. The Contact page
(`contact.json` + the "Contact page" CMS section + `src/app/contact/page.tsx`)
remains the simplest reference example if you add a new page.

**Rich text:** prose fields (intros, bios, descriptions) are stored as Markdown
and rendered by `src/components/ui/RichText.tsx` — a small, dependency-free
renderer supporting **bold**, *italic*, links, line breaks and bullet lists.
In the CMS these fields use the `markdown` widget. If you ever need richer
formatting (tables, images-in-prose), swap `RichText` for `react-markdown`;
the field data is already plain Markdown so no content migration is needed.

**Homepage globe pins are editable** via the **"Homepage globe pins"** CMS
section (`src/data/site/globe.json`). It's a list of `{ name, label, lat, lon,
note }` consumed by `HeroGlobe.tsx` (which maps them to `coords: [lon, lat]`).
The label-placement engine handles any number of pins, so adding/removing one is
a pure data edit — no code change. Keep each pin tied to a real episode/video and
record which in `note`. The same section also holds the scrolling **"Insights in
Motion"** captions (`globe.json` → `journey`: an `intro` line + 6 `legs`, each a
`route` heading + `caption`), read by `GlobeSection.tsx`. Only that **text** is
editable — the scroll thresholds (`THRESHOLDS` in `GlobeSection.tsx`) and the
cities/arc choreography (`ROUTES`/`ROTATION_KEYFRAMES` in `Globe.tsx`) are
hand-tuned and stay in code, so adding/moving a *stop* still needs a dev. The CMS
legs list is locked to exactly 6 to keep it in sync with the thresholds.

**What stays fixed in code (by design):** layout/spacing, colours, the "Insights
in Motion" globe choreography (route, coordinates, scroll timing — only its
captions are editable), persona SVG icons and card-accent colours, and section
animations. These live in the components, not the JSON, so editors can't break
the design.

## 6. Automated video sync (YouTube → PR)

New uploads on the channel are pulled in automatically for review.

- **`scripts/sync-videos.mjs`** resolves the `@globalpdhpodcast` channel, reads
  its **public RSS feed** (no API key needed), and appends any uploads not
  already in `videos.json` (newest first), with `tags: []` and **no category**
  left for a human to fill in.
- **`.github/workflows/sync-videos.yml`** runs it **daily at 07:00 UTC** (and on
  demand via *Actions → Run workflow*), then **commits any new videos straight to
  `master`**, so they go live automatically the day they're published.
- **You tidy up afterwards in the CMS (still live):** set the `category`
  (`talk`/`panel`/`explainer`/`clip`) and `tags`, tidy the description, and
  optionally paste a `transcript`. New entries appear uncategorised until then.

### Required GitHub settings for the commit step
Repo → *Settings → Actions → General → Workflow permissions*:
- Select **Read and write permissions** (lets the workflow push to `master`).

---

## 7. Smart search

Two searches: episodes (`src/components/sections/EpisodeFilter.tsx`) and videos
(`src/app/videos/VideoPageClient.tsx`). Both use **Fuse.js** plus
**`expandQuery()`** from `src/lib/concept-map.ts`, which expands a query through a
**synonym dictionary** (`CONCEPT_MAP`) — e.g. searching "money" also matches
"funding/investment".

**Indexed fields:**
- **Episodes:** `title`, `guest`, `description`, `themes`, `topics`, `tags`,
  `guestRole`, `country`, `pullQuote`, `timestamps.label`, `bio`, `transcript`
  (transcript at low weight so titles still win). → Any episode added via the CMS
  is automatically fully searchable.
- **Videos:** `title`, `tags`, `description`, `transcript`. The transcript is
  taken from **`video.transcript`** (CMS field) and falls back to
  `src/lib/video-transcripts.ts` (the legacy per-slug store). → Paste a transcript
  in the CMS and it becomes searchable on next deploy.

**How new content reaches search:** the Fuse index is built at runtime from the
static `episodes.json`/`videos.json`. When a CMS draft is merged, Vercel rebuilds
and the new content (and transcript) is indexed automatically — no extra step.

**Adding synonyms:** `expandQuery` already applies to all content. Genuinely
*new* concepts (a topic never covered before) can be added in one line to
`CONCEPT_MAP` in `src/lib/concept-map.ts`.

---

## 8. Featured controls

Both `Episode` and `Video` types have an optional **`featured: boolean`**.
- Home page banner: `episodes.find(e => e.featured) ?? newest` (`src/app/page.tsx`).
- `/videos` featured slot: `featuredVideo = videos.find(v => v.featured) ?? videos[0]`
  (`src/lib/videos.ts`, used in `VideoPageClient.tsx`).
Set the toggle in the CMS or `"featured": true` in the JSON.

---

## 9. Secrets registry

**Values are intentionally NOT in this repo.** Store them in a password manager
and in Vercel's encrypted env vars. Inventory:

| Secret | Where it lives | Used for | Rotation |
|---|---|---|---|
| `GITHUB_OAUTH_CLIENT_ID` | Vercel env var + GitHub OAuth App | Decap CMS login | Regenerate the OAuth App / secret in GitHub Developer settings |
| `GITHUB_OAUTH_CLIENT_SECRET` | Vercel env var (only) | Decap CMS token exchange | Same as above; never commit |
| GitHub PAT (push/admin from CLI) | **Not stored in repo**; only needed in restricted remote envs | Pushing when a git proxy blocks normal auth | Fine-grained PAT with **Contents: write** (+ **Workflows: write** to edit `.github/workflows/**`). **The PATs used during the build were exposed in chat — revoke them.** |
| `GITHUB_TOKEN` (Actions) | Auto-provided by GitHub Actions | The video-sync & analytics-archive workflows push to `master` | Managed by GitHub; just enable **Read and write** workflow permissions (§6) |
| `VERCEL_TOKEN` | GitHub Actions **secret** | Monthly analytics archive (`archive-analytics.yml`, §10) | Regenerate at <https://vercel.com/account/tokens> |
| `VERCEL_PROJECT_ID` / `VERCEL_TEAM_ID` | GitHub Actions **variables** (not secret) | Identify the project for the analytics archive | From the Vercel project settings |
| Vercel account | Vercel dashboard | Hosting, deploys, env vars | Account owner (Shubs) |
| Transistor account | Transistor dashboard | Podcast hosting / episode embeds | Account owner |
| YouTube channel | Google account | Video source (RSS is public — **no API key needed**) | Account owner |

**No secrets are required to build or run the site locally** — only the two
`GITHUB_OAUTH_*` vars (for the CMS) and Actions permissions (for video PRs).

---

## 10. Deployment (Vercel)

- Push to `master` → Vercel builds and deploys automatically.
- Build command: `next build` (default). Output: static + a few dynamic routes
  (`/api/auth`, `/api/callback`).
- **Env vars in Vercel:** `GITHUB_OAUTH_CLIENT_ID`, `GITHUB_OAUTH_CLIENT_SECRET`
  (for the CMS). Nothing else currently.
- `next.config.ts` sets `images.formats` (AVIF/WebP) and `remotePatterns` for
  YouTube thumbnails + org-logo CDNs (needed because some `next/image` sources
  are remote).

### Web Analytics (Vercel)
- **Vercel Web Analytics** is wired in via `@vercel/analytics` — the `<Analytics />`
  component sits in `src/app/layout.tsx` so it covers every page. It's
  cookieless / privacy-friendly (no consent banner needed for it).
- ⚠️ **It only collects data once enabled in the dashboard:** Vercel project →
  **Analytics → Enable**. Until then the script is inert (no data, no cost).
- **Who sees the data:** whoever owns the Vercel project. On an ownership
  handover (`HANDOVER.md`) the analytics move with the project automatically.
- To switch to a different tool (GA4, Plausible) instead, remove the import +
  `<Analytics />` from the layout and add the alternative's snippet there.

### Archiving analytics monthly (free-tier retention workaround)
Vercel's free tier only keeps **~30 days** of analytics. A scheduled job copies
each month's numbers into the repo so the history is permanent.

- **Workflow:** `.github/workflows/archive-analytics.yml` — runs 06:00 UTC on the
  **1st of each month**; also runnable by hand via *Actions → Archive monthly
  analytics → Run workflow* (optional `month` input `YYYY-MM` for back-fill).
- **Script:** `scripts/export-analytics.mjs` → writes `analytics-archive/<month>/`
  (`raw.json` is the source of truth; `*.csv` are tidy summaries) and appends a
  row to `analytics-archive/index.csv`.
- **One-time setup** (repo → *Settings → Secrets and variables → Actions*):
  - Secret **`VERCEL_TOKEN`** — from <https://vercel.com/account/tokens>.
  - Variable **`VERCEL_PROJECT_ID`** — Vercel project → *Settings → Project ID*.
  - Variable **`VERCEL_TEAM_ID`** — only if the project lives under a Vercel Team.
- ⚠️ **It uses Vercel's _internal/undocumented_ web-analytics endpoint**, not a
  stable public API — it can change without notice. The script is defensive
  (saves raw responses, exits non-zero on total failure). If the export fails,
  the workflow **opens a reminder issue** to save that month by hand, so a broken
  endpoint never means silent data loss. Fixing it = updating the endpoint
  constants / extract helpers in `scripts/export-analytics.mjs`.
- After enabling, **test it** with a manual run (set `month` to a month that has
  data) and confirm a folder appears under `analytics-archive/`.

---

## 11. Known blockers, gotchas & decisions

1. **Forms — wired to Web3Forms.** The contact form and all three email-capture
   forms (`EmailSignup`, `EmailSignupTile`, `SubscribeModal`) submit through
   **Web3Forms** via `src/lib/web3forms.ts`. They share **one access key**, set
   as **`NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`** (Web3Forms keys are public by
   design). Submissions are told apart in the inbox by their `subject`
   (`New GPODH contact message` vs `New GPODH subscriber`), and each form has a
   hidden honeypot for basic spam protection.
   - **Setup:** create a key at <https://web3forms.com> (enter the destination
     email), then set `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` in Vercel (Project →
     Settings → Environment Variables) **and** redeploy. For local dev, copy
     `.env.example` → `.env.local` and fill it in. **Until the key is set, the
     forms show an error on submit** rather than silently faking success.
   - ⚠️ **Subscribe = email-to-inbox, not a mailing list.** Web3Forms just emails
     you each new subscriber; it does **not** add them to Shubstack or send the
     newsletter. Add subscribers to Substack manually, or repoint the subscribe
     forms at Substack's native signup if you'd rather automate that.
2. **Domain.** The live deployment is **`https://g-po-dh.vercel.app`** and the CMS
   `base_url` + OAuth callback are set to it. Episode `url` fields still point at
   `www.gpodh.org` (the intended custom domain). If/when a custom domain is
   attached and used for `/admin`, update `base_url` in `config.yml` and the
   OAuth App callback URL to match.
3. **CMS not live until OAuth set up.** `/admin` exists but login fails until the
   GitHub OAuth App + Vercel env vars are configured (§5). The OAuth popup flow
   could not be tested during the build (needs the deployed app + the OAuth App);
   verify after setup and report any error for adjustment.
4. **Editorial workflow is per-file.** Because each CMS collection is a single
   JSON file, avoid multiple simultaneous drafts of the same collection. If you
   later want per-episode draft PRs and a cleaner review board, migrate to Decap
   **folder collections** (one file per item) + a small build-time aggregation
   step into the JSON the app imports.
5. **Why Decap, not Tina.** The "git-based CMS" choice allowed either. Tina needs
   a Tina Cloud account + env vars and an `npm install`/codegen that the build
   environment (offline) could not perform/verify. Decap is fully self-hosted,
   CDN-loaded, and was verifiable at build time. Switching to Tina later is
   possible but is a larger change.
6. **Images were recompressed destructively.** A one-off pass (sharp) recompressed
   21 images **in place** (~13.9 MB saved; the hero `shubs-interview.jpg` went
   9.9 MB → 179 KB). Originals are only in git history. Spot-check the hero and
   guest photos look acceptable; recover from history if any are over-compressed.
7. **Remaining raw `<img>` tags.** `OrgMarquee` (many remote logos), and the
   single-instance featured thumbnails on the video/episode detail pages, still
   use raw `<img>` rather than `next/image`. Lower priority; convert for further
   optimization (remote hosts are already allow-listed in `next.config.ts`).
8. **Remote-env push quirk (only relevant in Claude-Code-on-web).** In the remote
   build environment the local git proxy returned 403 on push, so pushes were
   done directly via `https://<PAT>@github.com/...`. On a normal machine, plain
   `git push` works and no PAT-in-URL is needed.
9. **Workflow files need `Workflows: write`.** A fine-grained PAT without that
   scope cannot push files under `.github/workflows/**` (GitHub rejects the push).
10. **`d3-geo`/`topojson` + canvas globe and the marquees** are the main client-JS
    cost. `prefers-reduced-motion` now disables animations; the globe RAF loop
    could additionally be gated on reduced-motion if INP becomes a concern.

---

## 12. Outstanding TODO / suggested next steps

- [ ] **Wire up forms to a real backend** (contact + email capture) — highest value. *(On hold — owner will revisit.)*
- [x] Configure the **GitHub OAuth App + Vercel env vars** to enable the CMS. *(Done.)*
- [x] Enable **Actions write permissions** so the video-sync workflow can push to `master`. *(Done — Repo → Settings → Actions → General → Workflow permissions → Read and write.)*
- [ ] **Confirm canonical domain** and align `base_url` + OAuth callback.
- [ ] **Revoke the exposed PATs**; create fresh fine-grained tokens as needed.
- [x] Display CMS video transcripts on the **video detail pages** (now prefers the
      CMS `transcript` field, falling back to the bundled library).
- [x] Convert remaining photo `<img>` to `next/image` (banner, episode/video
      artwork, surprise-pick thumbnail). **OrgMarquee left as raw `<img>` on
      purpose** — mixed remote SVG logos that `next/image` can't optimise without
      `dangerouslyAllowSVG`.
- [x] Pre-seed `concept-map.ts` synonyms for upcoming topics (10 new clusters).
- [x] ~~Consider Decap **folder collections** for nicer per-item review.~~
      **Decision: skip.** The single-file list collections work; folder
      collections would force a build-time codegen step (client search needs the
      data statically bundled) and a rewrite of the video-sync workflow, for a
      mostly cosmetic per-item-review gain. Revisit only if per-item review
      becomes a real need.

---

## 13. Working conventions

- **British English** spelling (organisation, rigour, programme).
- **Run `npm run build` before every push.** Keep `master` deployable.
- **Commit messages:** clear, imperative subject + a short body explaining *why*.
  (During the assisted build, commits ended with a Claude session footer link;
  that is optional and can be dropped.)
- **Do not push to repositories other than `samwoodhouse1982/gpodh`.**
- **Heed `AGENTS.md`:** this Next.js version differs from older training data —
  consult `node_modules/next/dist/docs/` before using unfamiliar Next APIs.
- **Never commit secrets.** Use Vercel env vars + a password manager.

---

## 14. Change log (assisted build, Apr–Jun 2026)

Grouped highlights (see `git log` for the full list):

- **Content & UI overhaul** (Apr): episodes/videos/home/nav/globe, speaker
  marquee, host/trailer modals, work-with-us photo strip, colour refresh.
- **Marketing & copy** (late May): featured-episode banner; inline mailing-list
  tiles; merged Work-With-Us sections; consolidated consulting copy; impactful
  footer; `shubs.me` CTAs; SandiQ → ConsultingBridge.
- **Search** (late May): transcript-aware episode search; 31 video transcripts;
  shared synonym concept map (`expandQuery`).
- **Design consistency** (late May): standardized page heroes (spacing, borders,
  left gutter, animated entrance); lightened the videos page's dark sections;
  matched episode/video/contact headers to the homepage.
- **Performance & accessibility** (May 31): recompressed images (−13.9 MB);
  `next.config.ts` AVIF/WebP + remotePatterns; `next/image` for nav logo +
  cards; `prefers-reduced-motion`; skip-link + labelled landmarks; darker muted
  text; form `aria-live`/labels/`aria-busy`. Fixed hidden **Home** link in mobile
  nav.
- **Content infrastructure** (Jun 1): moved episodes & videos into editable JSON;
  added explicit `featured` controls; **automated video sync → PR**; **Decap CMS**
  for episodes & videos with **editorial workflow**; wired CMS/video transcripts
  into search.

---

*End of handoff. If you are an AI assistant picking this up: start by reading
this file, then `AGENTS.md`, then `src/lib/episodes.ts` + `src/lib/videos.ts` and
`src/app/globals.css`. Run `npm run build` to confirm a clean baseline before
making changes.*
