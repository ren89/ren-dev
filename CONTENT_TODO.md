# Content & Assets — What to Add and Where

This file tracks the **real content** you'll need to supply as we build. Everything
listed here is currently a **placeholder** or **not yet created**. I'll keep this updated
each phase. Nothing here blocks Phase 1 (foundation) — it's a running checklist.

Legend: ⬜ needed · 🟡 placeholder in place · ✅ provided

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
| Favicon / app icon | ⬜ | `app/icon.png` (Next.js convention) | 512×512 PNG |
| OG / social share image | ⬜ | `public/og.png` | 1200×630 for link previews |
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

### How to give me content

- **Text:** paste it directly in chat, or add it to the relevant file and tell me.
- **Images:** drop the file into the path shown above, then tell me the filename.
- Tell me if any item should be **skipped** entirely (e.g. no testimonials section).
