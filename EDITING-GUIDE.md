# GPODH — Quick Editing Guide (for Shubs)

A plain-English guide to adding episodes and videos to the website and
publishing them. No coding needed. (Technical details live in `HANDOFF.md`.)

---

## Where you edit: the Content Manager

Go to **https://g-po-dh.vercel.app/admin/** and click **Login with GitHub**.
*(Tip: include the trailing slash.)*

> **First time only:** the login needs a quick one-time setup (a GitHub "OAuth
> App" + two settings in Vercel). If login doesn't work yet, that setup hasn't
> been done — see `HANDOFF.md` §5, or ask your developer/Claude to finish it.

Once you're in, you'll see two sections: **Episodes** and **Videos**.

---

## Golden rule: nothing goes live until you approve it

Every change you save becomes a **draft** first. To make it live:

1. Save your changes (top right).
2. Go to the **Workflow** tab at the top.
3. Find your draft and move it along to **Ready**, then click **Publish**.
4. The site rebuilds itself and your change is live in about **1–2 minutes**.

So feel free to add things and leave them as drafts — they won't appear on the
site until you publish.

---

## Add a new EPISODE

1. Click **Episodes** → open the **Episodes** entry.
2. Scroll to the bottom of the list and click **Add episodes** (adds a blank one).
3. **Drag the new item to the very top of the list** so it shows first on the site.
4. Fill in the fields:
   - **Title** — the episode title.
   - **Slug** — the web address, lowercase with hyphens, no spaces
     (e.g. `digital-health-in-kenya`). This becomes
     `gpodh.org/episodes/digital-health-in-kenya`.
   - **ID** — any unique number/text (just make it different from the others).
   - **Episode number** — e.g. `27`.
   - **Guest**, **Guest role**, **Date** (e.g. `Apr 2026`), **Duration** (e.g. `1hr 8min`).
   - **Description** — the summary shown in listings.
   - **Canonical URL** — the full episode link.
   - **Guest photo** — upload an image (it's saved automatically).
   - **Country**, **Themes**, **Tags** — add as many as you like (these power search & filters).
   - **Pull quote**, **Guest bio**, **Key topics**, **Timestamps** — optional rich content for the episode page.
   - **Transcript** — paste the full transcript. **This is included in search**, so
     people can find the episode by anything said in it.
   - Player links (Transistor / Spotify / YouTube IDs) — optional.
   - **Featured** — tick this to make it the big banner on the homepage.
5. **Save** → **Workflow** tab → **Publish**.

---

## Add or finish a VIDEO

Most videos appear **automatically**: every day the site checks your YouTube
channel and, if there's a new upload, it opens a **draft pull request** with the
title, description and date already filled in. You just add the finishing
touches and publish.

To finish a video (or add one by hand):

1. Click **Videos** → open the **Videos** entry.
2. Find the new video (or click **Add videos** to create one and drag it to the top).
3. Fill in / check:
   - **Title**, **Slug**, **ID**, **YouTube video ID** (the part after `watch?v=`), **Date**.
   - **Category** — choose `talk`, `panel`, `explainer`, or `clip`.
   - **Tags** — add a few (these help search and browsing).
   - **Description**.
   - **Transcript** — optional, but if you paste one it's **included in search**.
   - **Featured** — tick to pin it to the top of the Videos page.
4. **Save** → **Workflow** tab → **Publish**.

The thumbnail comes from YouTube automatically — you only need the "thumbnail
override" field if you want a custom image.

---

## Featuring something

- **Homepage banner** = the episode with **Featured** ticked (otherwise the newest).
- **Top of the Videos page** = the video with **Featured** ticked (otherwise the newest).

Tick **Featured** on exactly one item per type. Untick the old one when you move
the spotlight.

---

## Search: how it picks up your content

Search reads everything you enter — titles, descriptions, guest names, themes,
tags, **bios**, and **transcripts** — and understands synonyms (searching
"money" also finds "funding"). So the more you fill in (especially the
transcript), the more findable the episode/video becomes. It updates
automatically when you publish.

---

## If something looks wrong

- Gave it a few minutes and it's still not live? Check the **Workflow** tab —
  it may still be a draft, not published.
- Login won't work? The one-time setup (above) likely isn't finished.
- Anything else: hand the details to your developer or to Claude with a link to
  `HANDOFF.md`.

---

*That's it. Add → drag to top → fill in → Save → Workflow → Publish.*
