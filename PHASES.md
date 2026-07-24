# Portfolio Build — Phased Roadmap

A phase-by-phase plan for building a freelance web-developer portfolio, from empty
project to a polished, SEO-ready, conversion-focused site — then optional "stretch"
features on top. Shared so others can follow the same path.

**Stack used here:** Next.js (App Router) · React · TypeScript · Tailwind CSS ·
MDX blog · Vercel (hosting + analytics). The *approach* is stack-agnostic, though.

---

## How the phases are run (the workflow)

Every phase follows the same gated loop — this is what keeps it controlled and reviewable:

1. **Investigate first.** Read the current code before writing anything. Audit what
   already exists.
2. **Skip what's done.** If a feature already works, call it out and don't rebuild it.
   Never regress something that works.
3. **Plan, then stop.** Present the plan for *one* phase only and wait for explicit
   approval before writing code.
4. **Build → verify → commit.** After approval: implement, confirm it builds + lints,
   then commit with a clear message. Stop and wait before the next phase.
5. **Preserve the essentials** every phase: responsive layout, animations, dark/light
   mode, accessibility, performance.

---

## Part 1 — Core build (foundation → launch)

The site itself, built in eight gated phases. All complete.

| # | Phase | What it delivers |
|---|---|---|
| 1 | **Foundation** | Design tokens + theming (light/dark), typography scale, spacing, motion approach, `prefers-reduced-motion` guard |
| 2 | **Layout shell** | Responsive nav + footer, mobile menu w/ focus trap, scroll-spy, skip link |
| 3 | **Hero** | Value-focused headline, primary/secondary CTAs, tasteful entrance animation, lightweight background |
| 4 | **Work / case studies** | Data-driven projects, cards with hover + scroll reveal, per-project case-study pages, graceful private/NDA handling |
| 5 | **Playground** | Compact cards for smaller/older projects (live vs. archived), no dead links |
| 6 | **Services** | Clear offering cards with benefit copy + "get a quote" CTAs |
| 7 | **Trust** | About (bio + headshot), "How I work" process stepper, testimonials (+ real client logos) |
| 8 | **Contact + launch polish** | Validated contact form (Formspree) + honeypot, persistent/mobile CTAs, SEO meta, favicon, custom 404, a11y + perf pass |

> Design system, animations, and dark/light mode are established in Phase 1 and reused
> everywhere after — not reinvented per phase.

---

## Part 2 — Stretch features (optional, gated)

Layered on after the core site works. Status reflects this build.

| Phase | Feature | Status | Notes |
|---|---|---|---|
| — | **Data-driven content** | ✅ Already done | Projects were already in typed data files — no migration needed |
| A | **Blog (MDX)** | ✅ Done | `/blog` + posts from `content/*.mdx`; reading time, tags, build-time syntax highlighting (Shiki, dual light/dark), zero client JS |
| B | **SEO & discoverability** | ✅ Done | `sitemap.xml`, `robots.txt`, JSON-LD (Person + BlogPosting), per-page OpenGraph + auto-generated OG images |
| C | **Analytics & conversion** | ✅ Done | Privacy-friendly (cookieless). Custom events: `contact_submitted` + `cta_click` (with source) to see where leads originate |
| D | **Command palette (⌘K)** | ✅ Done | Fuzzy jump to sections/projects/posts, toggle theme, copy email — a developer-signature touch |
| E | **Now / availability indicator** | ✅ Done | Status-aware "Available for new projects" badge (single-source config); sticky/floating CTAs already existed |
| F | **Micro-interactions & transitions** | ⏳ Planned | Route transitions, refined loading states, extra scroll-reveal/hover polish — all reduced-motion-safe |
| G | **Case-study deep dives** | ○ Optional | Before/after visuals + pull-quote metrics (base template already rich) |
| H | **Filtering & search** | ○ Optional | Filter/search projects — lower ROI at a small project count |
| I | **Perf & a11y (Lighthouse)** | ○ Optional | Measured audit on the live deploy; much already covered in Phase 8 |
| J | **PWA / installable** | ○ Optional | Manifest + offline for visited pages |

**Skipped by choice:** internationalization / multi-language.

**Legend:** ✅ done · ⏳ planned/next · ○ optional

---

## Tips for anyone following this

- **Audit before you build.** A lot of "phases" are already partly done — don't rebuild;
  extend.
- **One phase per PR/commit.** Small, reviewable, revertible.
- **Keep content data-driven early** (typed files or MDX). It pays off for the blog,
  case studies, and search later.
- **Bake in a11y + reduced motion from Phase 1**, not as a cleanup pass.
- **Don't fake social proof.** Use real logos/quotes; mark placeholders clearly.
