# Content & Assets — What to Add and Where

This file tracks the **real content** you'll need to supply as we build. Everything
listed here is currently a **placeholder** or **not yet created**. I'll keep this updated
each phase. Nothing here blocks Phase 1 (foundation) — it's a running checklist.

Legend: ⬜ needed · 🟡 placeholder in place · ✅ provided

---

## 🚀 Launch checklist (do before going live)

1. **Contact form (prod):** add `NEXT_PUBLIC_FORMSPREE_ID` in Vercel → Settings →
   Environment Variables, redeploy, and confirm the form via Formspree's first-submission email.
2. **Analytics:** enable Analytics in the Vercel dashboard (the code is wired via
   `@vercel/analytics`; data only flows once enabled on a Vercel deployment).
3. **Site URL:** if you use a custom domain later, set `NEXT_PUBLIC_SITE_URL=https://yourdomain`
   in Vercel so canonical + OG/Twitter links are absolute and correct. (Defaults to
   `https://ren-dev-black.vercel.app`.)
4. **Real content:** headshot (`public/images/me/`), real testimonials
   (`data/testimonials.ts`), Eternal Homes case-study screenshots (`public/images/eternal-homes/`).
5. **Deploy:** merge `dev` → `main` (or push), and Vercel builds/deploys automatically.
6. **Verify a live share:** paste your URL into a Slack/LinkedIn message or
   [opengraph.xyz](https://www.opengraph.xyz) to confirm the preview card renders.

---

## Identity & copy

| Item | Status | Where it will live | Notes |
|---|---|---|---|
| Full name | ✅ | `app/layout.tsx` (metadata) | "Ren Avellano" |
| Role / positioning | ✅ | metadata + hero (later) | "Full-stack developer, mainly web" |
| Short tagline (1 line) | ⬜ | Hero section (Phase 2) | e.g. "I build fast, modern web apps end to end." |
| About / bio paragraph | 🟡 | `components/sections/about.tsx` | DRAFT written for you (6+ yrs, loves building) — verify/edit |
| Location | 🟡 | metadata | Currently "Philippines" — confirm/refine |
| Contact email | ✅ | `lib/site.ts` → footer | `ren.avellano@gmail.com` |
| GitHub | ✅ | `lib/site.ts` → nav/footer | https://github.com/ren89 |
| LinkedIn / X / other socials | ⬜ | `lib/site.ts` (`linkedin`, `twitter`) → footer | Add URLs here and they'll appear automatically |

## Visual assets

| Item | Status | Where to put the file | Notes |
|---|---|---|---|
| Headshot / photo | ⬜ | `public/images/me/headshot.{jpg,webp}` | Square, ≥800px. Placeholder "RA" tile shown in About until added |
| Personal logo / mark | ⬜ | `public/logo.svg` | Optional; text wordmark used until provided |
| Favicon / app icon | ✅ | `app/icon.svg` | On-brand "R" mark generated; replace file to change |
| OG / social share image | ✅ | `app/opengraph-image.tsx` | Generated via next/og (also used for Twitter); edit the JSX or replace with a static image to change |
| Résumé / CV | ⬜ | `public/ren-avellano-cv.pdf` | Linked from header/contact later |

## Projects (Work section)

Featured case studies live in **`data/projects.ts`** (the old `data/data.ts` is now
unused/legacy). Story prose has been reviewed and approved by Ren.

| Item | Status | Where to put it | Notes |
|---|---|---|---|
| Vow Studio story | ✅ | `data/projects.ts` | Approved |
| Eternal Homes story | ✅ | `data/projects.ts` | Approved |
| frntlne story | ✅ | `data/projects.ts` | Approved; kept high-level for NDA |
| Vow Studio screenshots | ✅ | `public/images/vowStudio/` | Wired: cover = hero-site; gallery = dashboard, theming, seating, rsvp, gallery |
| Eternal Homes screenshots | ⬜ | `public/images/eternal-homes/` | Then set `cover:` / `gallery:` |
| frntlne screenshots | ⬜ | — | Intentionally none (legacy images retired; branded placeholder used) |

### Playground (smaller / past projects)

Compact cards in **`data/projects.ts`** → `playground` array (no case-study pages).
`status: "live"` shows a demo link; `status: "archived"` = no link.

| Item | Status | Notes |
|---|---|---|
| Tic Tac Toe, Todo | ✅ live | On-site demos (`/codeExercise/*`) |
| Property Listing, Campus Entry Monitor | 🟡 archived | Vercel deploys are down; shown as Archived. Redeploy → set `status:"live"` + `href` |
| Shuffled, Buildustry, E-Vill, frntlne V2, PicMe, Trashure, Portfolio v1 | 🟡 archived | Old/retired; PicMe & Trashure use placeholder (no images) |

## Testimonials & client logos

Data in **`data/testimonials.ts`**. Quotes are **placeholders** with fake attribution
(clearly labelled "Placeholder" in the UI) — never ship fabricated quotes as real. Set
`SHOW_TESTIMONIALS = false` to hide the quotes grid until you have real ones.

| Item | Status | Where to put it | Notes |
|---|---|---|---|
| Real testimonial — Eternal Homes | ⬜ | `data/testimonials.ts` | You're collecting this; replace a placeholder, drop `placeholder: true` |
| Other real testimonials (student clients) | ⬜ | `data/testimonials.ts` | Replace remaining placeholders as collected |
| Client logo — Eternal Homes | ✅ | `public/images/eternalHomes/logo.png` | Wired into `clientLogos` |
| Client logo — frntlne | ✅ | `public/images/frntlne/logo.png` | Wired into `clientLogos` |

---

## Contact form (Formspree)

The Contact form posts to Formspree, read from an env var so no keys live in the repo.

1. Create a form at **https://formspree.io** → copy its **form ID** (e.g. `xrgkabcd`).
2. Local: copy `.env.example` → `.env.local` and set `NEXT_PUBLIC_FORMSPREE_ID=<your id>`.
3. Production: add the same `NEXT_PUBLIC_FORMSPREE_ID` in **Vercel → Project → Settings → Environment Variables**, then redeploy.

Until the ID is set, the form validates but shows a "please email me directly" message
instead of sending. Honeypot spam protection is built in. Budget ranges are in PHP (₱) —
edit the `BUDGETS` array in `components/sections/contact.tsx` to change the values.

| Item | Status | Notes |
|---|---|---|
| Formspree form ID | ⬜ | Add via `NEXT_PUBLIC_FORMSPREE_ID` (see above) |
| Book-a-call link | ⬜ | Optional; none yet. Add later next to the email option |

### How to give me content

- **Text:** paste it directly in chat, or add it to the relevant file and tell me.
- **Images:** drop the file into the path shown above, then tell me the filename.
- Tell me if any item should be **skipped** entirely (e.g. no testimonials section).
