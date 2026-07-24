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
| About / bio paragraph | ⬜ | About section (later phase) | 2–4 sentences, first person |
| Location | 🟡 | metadata | Currently "Philippines" — confirm/refine |
| Contact email | ✅ | `lib/site.ts` → footer | `ren.avellano@gmail.com` |
| GitHub | ✅ | `lib/site.ts` → nav/footer | https://github.com/ren89 |
| LinkedIn / X / other socials | ⬜ | `lib/site.ts` (`linkedin`, `twitter`) → footer | Add URLs here and they'll appear automatically |

## Visual assets

| Item | Status | Where to put the file | Notes |
|---|---|---|---|
| Headshot / photo | ⬜ | `public/images/me/headshot.{jpg,webp}` | Square, ≥800px. Optional but recommended |
| Personal logo / mark | ⬜ | `public/logo.svg` | Optional; text wordmark used until provided |
| Favicon / app icon | ⬜ | `app/icon.png` (Next.js convention) | 512×512 PNG |
| OG / social share image | ⬜ | `public/og.png` | 1200×630 for link previews |
| Résumé / CV | ⬜ | `public/ren-avellano-cv.pdf` | Linked from header/contact later |

## Projects

| Item | Status | Where it lives | Notes |
|---|---|---|---|
| Project data | 🟡 | `data/data.ts` | Real projects already exist here; we'll refine copy & imagery in the Projects phase |
| Project screenshots | ✅ | `public/images/**` | Many already present |

## Testimonials (optional)

| Item | Status | Where it will live | Notes |
|---|---|---|---|
| Testimonials/quotes | ⬜ | TBD (later phase) | Name, role, company, quote, optional avatar |

---

### How to give me content

- **Text:** paste it directly in chat, or add it to the relevant file and tell me.
- **Images:** drop the file into the path shown above, then tell me the filename.
- Tell me if any item should be **skipped** entirely (e.g. no testimonials section).
