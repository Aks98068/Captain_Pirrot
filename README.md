# Captain Pirrot — Cybersecurity Research Platform (Next.js + TypeScript + MySQL)

Next.js App Router site. Content (team, education, GitHub repos, blog, contact info) is read from a
**MySQL / MariaDB** database. There is no login or sign-up — the site only *reads* data
(the contact form saves one row per message).

## Quick start

```bash
npm install
npm run dev            # http://localhost:3000  — works immediately on bundled sample data
```

## Connect the database

1. Create the DB user/password in MySQL or MariaDB (XAMPP / MySQL Workbench / CLI).
2. `cp .env.example .env.local` and fill in `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`.
3. `npm run db:setup` — creates the database + tables and loads the sample data from `db/seed.json`.
4. `npm run build && npm start`

If `DB_HOST` is empty (or the DB is down) the site falls back to `db/seed.json`, so it never shows a blank page.

## Replace the sample team with real people

`db/seed.json` is **sample data** (names, GitHub usernames, LinkedIn URLs, universities are placeholders).
Either edit `db/seed.json` and run `npm run db:setup` again (updates members/posts by `slug`),
or edit the rows directly in the tables:

| What | Table |
| --- | --- |
| Members, GitHub/LinkedIn links, skills, certifications | `team_members` |
| Education / qualifications (end_year NULL = present) | `member_education` |
| GitHub repositories shown as cards | `member_repos` |
| Blog posts (`status='published'`) | `blog_posts` |
| Contact page details + footer links | `contact_info`, `site_settings` |
| Messages sent from the contact form | `contact_messages` |

Tip: if a member has **no rows in `member_repos`** but has a `github_username`, their public repos are fetched
live from the GitHub API (cached 1 hour). Set `GITHUB_TOKEN` in `.env.local` for a higher rate limit.

Blog `content` uses light markdown: `## heading`, `> quote`, `- list`, `**bold**`, `` `code` `` and ``` fenced code ```.

## Pages

| URL | What |
| --- | --- |
| `/` | Home (now includes a "Meet the team" section) |
| `/team` | All members → GitHub chip, LinkedIn chip, Education chip |
| `/team/[slug]` | Member profile: education, certifications, skills, repos, posts |
| `/github` | All repositories + member picker |
| `/github/[slug]` | One member's repositories as cards (click → real GitHub repo) |
| `/blog`, `/blog/[slug]` | Blog from the database (category filter, table of contents) |
| `/contact` | Contact details from the database + form (`POST /api/contact`) |

## Splash screen

`components/SplashScreen.tsx` — shown once per browser session before the site. Click or press any key to skip.
To show it on every page load, remove the two `sessionStorage` lines in that file and `splashGuard` in `app/layout.tsx`.

## Notes

- The root layout uses `force-dynamic`, so edits in the database show up immediately without rebuilding.
- `robots` is still `noindex` in `app/layout.tsx` — remove it when you want search engines to index the site.
- Research / projects / writeups / resources / CTF pages still use the static data in `lib/data.ts`.
