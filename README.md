# vahidshafiei.ir

A fast, static, text-first site for writing. Posts are Markdown files; publishing means pushing to GitHub. No server, no database, no login — and no hosting bill.

Built with [Astro](https://astro.build). Includes five themes, full-text search (`Ctrl K`), math (KaTeX), syntax-highlighted code, tags, RSS, a sitemap, and right-to-left Persian posts.

---

## 1. Run it on your computer

You need **Node.js** (version 18.20.8, 20.3, 22 or newer). Check with `node -v`.

```powershell
npm install
npm run dev
```

Open <http://localhost:4321>. Edits to posts and code appear instantly.

> Search needs the built site. To test it locally: `npm run build` then `npm run preview`.

## 2. Write a post

Create a file in `src/content/posts/`, or let the helper do it:

```powershell
npm run new -- "My first real post"
npm run new -- "عنوان نوشته" --fa      # Persian, right-to-left
```

The block at the top of each file is the *front matter*:

```yaml
---
title: "Understanding consolidation"
subtitle: "Optional line under the title"
description: "One or two sentences, shown in lists and search."
date: 2026-11-07
tags: ["Geotechnical", "Python"]
category: "Engineering"     # optional
featured: true              # optional: show on the home page
lang: fa                    # optional: right-to-left Persian
draft: true                 # remove or set false to publish
---
```

Drafts appear in `npm run dev` but are left out of the published site.

**Supported in the body:** headings, lists, tables, footnotes, blockquotes, links, images, code blocks (` ```python `), and math (`$inline$` and `$$display$$`).

**Images:** put files in `public/images/` and reference them as `![Description](/images/photo.jpg)`. Always write the description (alt text). Keep images small (under ~500 KB) — everything lives in the Git repository.

**Remove the sample posts:** delete `src/content/posts/sample-how-posts-work.md` and `src/content/posts/sample-persian.md`.

## 3. Publish on GitHub Pages

1. Create a **public** repository on GitHub (Pages is free for public repositories). Don't add a README or licence on GitHub — this project already has files.
2. In PowerShell, inside this folder (install [Git](https://git-scm.com/download/win) first if needed):

   ```powershell
   git init
   git add .
   git commit -m "First version"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```

3. On GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Open the **Actions** tab. The "Deploy to GitHub Pages" run takes 1–2 minutes. When it turns green your site is live at `https://YOUR-USERNAME.github.io/YOUR-REPO` (the styling may look broken there — that address is only a check; the real address is your domain below).

From now on, every `git push` to `main` re-publishes the site.

## 4. Connect vahidshafiei.ir

**Do these in order.**

1. **GitHub first:** Settings → Pages → **Custom domain** → enter `vahidshafiei.ir` → Save. (Adding the domain to GitHub *before* creating DNS records prevents someone else claiming it.) Optionally verify the domain under your account's Settings → Pages.
2. **Then DNS**, in the panel where your domain's DNS records are managed (your registrar, or nic.ir if your nameservers point there). Add:

   | Type | Name / Host | Value |
   | --- | --- | --- |
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |
   | CNAME | `www` | `YOUR-USERNAME.github.io` |

   Optional IPv6 (AAAA, name `@`): `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`.

   Remove any other `A`/`AAAA`/`CNAME` records for `@` and `www` that your DNS panel created by default. Don't use wildcard (`*`) records. These values come from GitHub's documentation — check [their page](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) if something stops working.
3. **Wait.** DNS changes can take up to 24 hours (often much less). Check progress in PowerShell:

   ```powershell
   Resolve-DnsName vahidshafiei.ir -Type A
   ```

   You should see the four `185.199.…` addresses.
4. Back in Settings → Pages, when the DNS check passes, tick **Enforce HTTPS**. GitHub issues the certificate for free (this can take a little while after the DNS check).

You don't need a `CNAME` file in the repository: the Actions deployment ignores it.

## 5. Customising

| What | Where |
| --- | --- |
| Name, tagline, description | `src/lib/site.ts` |
| Colours, fonts, spacing (all five themes) | `src/styles/global.css` (design tokens at the top) |
| Add a new theme | Add a `[data-theme='name']` block in `global.css`, add an entry in `src/components/ThemePicker.astro` |
| Domain | `site` in `astro.config.mjs`, and `Sitemap:` in `public/robots.txt` |

The site respects the visitor's reduced-motion setting, and fonts are bundled with the site (no calls to Google), so it loads quickly everywhere.

## 6. Limits of this version

- **No admin dashboard and no file uploads.** You write Markdown and push. Small images work; large PDFs, datasets and videos should wait for a real host.
- **No comments, view counts or download counts** (they need a server).
- Search runs in the visitor's browser over an index built at publish time, so it's instant and free, but it only knows about posts as of the last publish.

## 7. Troubleshooting

- **The Actions run is red:** open it and read the failing step. The most common cause is an invalid front-matter field — e.g. `description` longer than 300 characters, or a missing `title`/`date`.
- **A new post doesn't appear:** check `draft: true` isn't set, and that the date isn't mistyped (`2026-11-07`).
- **Site shows no styling at `github.io/REPO`:** expected before the custom domain is active, because the site is built for the root of a domain.
- **`Resolve-DnsName` shows other addresses:** a leftover default record. Delete it at your DNS provider.
- **Search says "Search index not found":** you're in `npm run dev`. Use `npm run build` + `npm run preview`.

## 8. Moving to a full CMS later

Every post's front matter (title, description, date, tags, category) maps directly onto the fields of the database-backed knowledge-base app, so your Markdown posts can be imported when you buy a host.
