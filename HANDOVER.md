# Handing the GPODH website over to a new owner

> **Who this is for:** a **non-technical** person taking ownership of the
> Global Perspectives on Digital Health (GPODH) website — and anyone helping
> them do the move.
>
> **What it covers:** how to transfer the website so the new owner controls
> everything themselves, with nothing tied back to the previous owner's
> accounts.
>
> **How long it takes:** about **30–45 minutes**, mostly waiting on confirmation
> emails. You do **not** need to be a coder, but **two steps are easiest with a
> developer's help** — they are clearly marked **🧑‍💻 Developer step** below.

---

## 1. The big picture (read this first — it makes everything else make sense)

The website is made of **three separate accounts** that work together. Handing
over the site means handing over all three. Think of it like a shop:

| Plain-English name | The technical name | What it does | Like… |
|---|---|---|---|
| **The filing cabinet** | **GitHub** | Stores all the website's files and a history of every change ever made | The back-office where the master copies live |
| **The shop front** | **Vercel** | Takes those files and turns them into the live website people visit | The actual shop customers walk into |
| **The door lock** | A **GitHub "OAuth App"** | Lets you log in to edit content at `/admin` | The key to the staff-only door |

**How they connect:** whenever a change is saved in the filing cabinet (GitHub),
the shop front (Vercel) automatically notices and updates the live website within
about a minute. You don't have to "publish" manually.

> 💡 **The golden rule:** GitHub is the original. Vercel is a copy that's shown to
> the public. If you own the GitHub side, you own the website.

---

## 2. Before you start — the new owner needs two free accounts

Ask the **new owner** to create these (5 minutes, both free):

1. **A GitHub account** → https://github.com/signup
2. **A Vercel account** → https://vercel.com/signup
   - Tip: tell them to click **"Continue with GitHub"** when signing up for
     Vercel. It links the two accounts and makes step 4 much smoother.

Have them send you (the person doing the handover) their **GitHub username**.

> You'll also want to know: **is there a custom web address** (like
> `www.gpodh.org`), or is the site currently living at its temporary Vercel
> address `https://gpodh-site.vercel.app`? This affects Step 6.

---

## 3. Step 1 — Move the filing cabinet (GitHub repository)

This hands over the master copy of the whole website.

1. Go to the repository: **`github.com/shubs-me/GPoDH`**
2. Click **Settings** (top of the page).
3. Scroll to the very bottom — the **"Danger Zone"** — and click
   **Transfer ownership**.
4. Type the **new owner's GitHub username** when asked who to transfer to.
5. Confirm. The new owner gets an email and must **click to accept** (the
   transfer isn't final until they do).

✅ **Done when:** the new owner can see the repository under *their* GitHub
account.

> Nothing is lost in a transfer — all the content, history, and the automatic
> daily video updater move across with it.

---

## 4. Step 2 — Point a new shop front at it (Vercel)

Now the new owner connects their Vercel account to the repository they just
received.

**The new owner does this, logged into their own Vercel account:**

1. Click **Add New… → Project**.
2. Vercel shows their GitHub repositories — pick **`gpodh`**.
   - If it's not listed, click **"Adjust GitHub App Permissions"** / **"Import
     a different repository"** and give Vercel access to it.
3. Vercel automatically recognises the website (it's built with a tool called
   *Next.js*) — **don't change any of the build settings.**
4. **Before clicking Deploy**, do Step 3 below (the environment variables) —
   it's easiest to add them on this same screen, under **"Environment
   Variables."**
5. Click **Deploy** and wait ~1–2 minutes.

✅ **Done when:** Vercel shows a live preview of the website.

---

## 5. Step 3 — Re-add the two "hidden settings" (so the editor login works)

⚠️ **This is the step people forget.** The website's content editor (`/admin`)
needs two secret settings that **are deliberately not stored in the files** (for
security). They must be typed into the new Vercel project by hand, or the editor
login will fail with an error.

In the new Vercel project, go to **Settings → Environment Variables** and add
these two (the previous owner provides the values — see the box below):

| Name (type exactly) | What it is |
|---|---|
| `GITHUB_OAUTH_CLIENT_ID` | The public half of the editor's door lock |
| `GITHUB_OAUTH_CLIENT_SECRET` | The private half of the editor's door lock |

> 📋 **Where do the values come from?** They belong to the **GitHub OAuth App**
> (the "door lock"). The cleanest, most secure handover is for the **new owner to
> create their own door lock** — see Step 4 (next). If you do that, you'll get
> fresh values to paste in here. If instead you're reusing the existing lock, the
> previous owner copies the values from their current Vercel project's
> Environment Variables.

After adding them, go to the **Deployments** tab and **Redeploy** once so the new
settings take effect.

---

## 6. Step 4 — Hand over (or freshly create) the door lock 🧑‍💻 *Developer step*

The "door lock" is a **GitHub OAuth App** that lets staff log in to `/admin`. The
safest handover is for the **new owner to create their own**, so the old owner's
account is no longer involved at all.

**To create a fresh one (recommended):**
1. New owner goes to GitHub → **Settings → Developer settings → OAuth Apps →
   New OAuth App**.
2. Fill in:
   - **Application name:** e.g. *GPODH Content Manager*
   - **Homepage URL:** the website's address (see Step 5 for which one)
   - **Authorization callback URL:** the website's address **followed by**
     `/api/callback`
     *(e.g. `https://www.gpodh.org/api/callback`, or for now
     `https://gpodh-site.vercel.app/api/callback`)*
3. Click **Register**, copy the **Client ID**, then **Generate a client secret**
   and copy that too.
4. Paste those two values into Vercel as the two environment variables from
   Step 3, and redeploy.

> Why this is a "developer step": the **callback URL must exactly match** the
> website's address, and if the address ever changes, one line in the project's
> settings file (`public/admin/config.yml`, the `base_url`) must be updated to
> match too. A developer (or the AI assistant) can do this in two minutes — just
> tell them the final web address.

---

## 7. Step 5 — Sort out the web address (domain)

Decide the website's **permanent public address**:

- **Keeping the free Vercel address** (`https://gpodh-site.vercel.app`)? Then
  nothing to do here — but note the new owner's project will have its *own* Vercel
  address (something like `gpodh-xxxx.vercel.app`). Use that everywhere.
- **Using a custom domain** (e.g. `www.gpodh.org`)? In the new Vercel project go
  to **Settings → Domains → Add**, type the domain, and follow Vercel's
  instructions (it tells you what to enter at wherever the domain was bought —
  GoDaddy, Namecheap, etc.).

> ⚠️ **Whatever address you settle on, the door lock from Step 4 must use the
> same one** (Homepage + callback URL), and the `base_url` line in
> `public/admin/config.yml` must match it. Get the address finalised first, then
> set the lock to match — not the other way around.

---

## 8. Step 6 — Switch the daily video updater back on 🧑‍💻 *Quick check*

The site automatically checks the YouTube channel each morning and adds new
videos. After a repository transfer this needs one permission re-confirmed:

1. In the new owner's repository on GitHub: **Settings → Actions → General**.
2. Under **Workflow permissions**, select **Read and write permissions**.
3. Save.

✅ Without this, the daily auto-update of new videos won't be able to publish.

---

## 9. Final check — make sure everything works

Once the steps above are done, confirm these four things on the **new** live
site:

- [ ] **The website loads** at its address and looks right.
- [ ] **The content editor works:** open `/admin`, click *Login with GitHub*,
      and confirm you can open a page for editing. *(If login fails, it's almost
      always Step 3 or Step 4 — the secret settings or the callback URL.)*
- [ ] **The Undo tool works:** open `/admin/undo`, sign in, and confirm your
      recent changes are listed. *(You don't need to undo anything — just that
      the list appears.)*
- [ ] **Make one tiny test edit** in `/admin` (e.g. change a word), publish, and
      check it appears on the live site a minute later. Then undo it from
      `/admin/undo` to confirm that works too.

---

## 10. After a successful handover — tidying up

Once the new owner has confirmed everything works on **their** accounts:

- The **previous owner can delete their old Vercel project** (the old copy of the
  shop front) so there aren't two live versions floating around.
- The **previous owner should delete their old GitHub OAuth App** ("door lock")
  if a fresh one was created in Step 4.
- **Rotate/revoke any old access tokens** the previous owner created during
  development (see `HANDOFF.md → Secrets registry`).

After this, the new owner owns **everything** — filing cabinet, shop front, and
door lock — with no leftover ties to the previous owner.

---

## 11. What the new owner can do day-to-day (nothing technical)

Reassure the new owner that running the site needs **no coding**:

- **Edit any text, photo, episode, or video** → log in at **`/admin`** (full
  walkthrough in **`EDITING-GUIDE.md`**).
- **Undo a mistake** → **`/admin/undo`** (one click per change).
- **New YouTube videos appear automatically** every morning — they just add the
  category/tags afterwards in `/admin`.
- Everything is saved with a full history, so nothing can be permanently broken.

For anything deeper — a new page, a design change, a problem that won't fix
itself — that's a **developer (or the AI assistant) job**, and the complete
technical manual is in **`HANDOFF.md`**.

---

## 12. Quick glossary

| You'll hear… | It means… |
|---|---|
| **Repository / repo** | The filing cabinet of website files on GitHub |
| **Deploy** | Publishing the latest files as the live website (Vercel does this automatically) |
| **Environment variable** | A hidden setting (like a password) stored in Vercel, not in the files |
| **OAuth App** | The "door lock" on GitHub that powers the `/admin` editor login |
| **Callback URL** | The web address the login returns to — must match the live site exactly |
| **Domain** | The website's public address (e.g. `www.gpodh.org`) |
| **Custom domain** | Your own address instead of the free `…vercel.app` one |
