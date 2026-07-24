# To-Do: content & launch

Only what's still outstanding. Everything else (copy, favicon, OG images, project
stories, screenshots wired, client logos, analytics, SEO, a11y) is done and in the code.

---

## Before going live (required)

- [x] **Formspree:** create a form at formspree.io, add `NEXT_PUBLIC_FORMSPREE_ID` in
  ```
  Vercel env vars, redeploy, and confirm via the first-submission email.
  (Until set, the form just tells visitors to email you.)
  ```
- [x] **Analytics:** turn on Analytics in the Vercel dashboard (code is already wired).
- [x] **Site URL:** set `NEXT_PUBLIC_SITE_URL` in Vercel to your production domain so
  ```
  OG/canonical links are absolute.
  ```
- [x] **Deploy:** merge `dev` into `main` (Vercel auto-builds).
- [x] **Lighthouse check:** run on the live URL with the browser window kept in the
  ```
  foreground (a background tab pauses the fade-in animations and gives a false
  `NO_FCP`).
  ```

## Content to add when ready (placeholders show until then)

- [ ] **Headshot** -> `public/images/me/headshot.{jpg,webp}` (square, >=800px).
  ```
  An "RA" tile shows until added.
  ```
- [ ] **Real testimonials** -> `data/testimonials.ts` (replace the placeholders;
  ```
  Eternal Homes to come). Or set `SHOW_TESTIMONIALS = false` to hide the quotes
  until you have real ones.
  ```
- [ ] **Eternal Homes screenshots** -> `public/images/eternal-homes/`, then set
  ```
  `cover` / `gallery` on that project in `data/projects.ts`.
  ```
- [x] **Bio:** a draft lives in `components/sections/about.tsx` - read and tweak it.
- [ ] **Blog posts:** replace/expand the two starter posts in `content/blog/`
  ```
  (or set `published: false` to hide them).
  ```
- [x] **Socials:** add LinkedIn / X URLs in `lib/site.ts` - they auto-appear in the footer.
- [ ] **Resume/CV:** drop a PDF in `public/` and tell me to link it.
- [ ] **Logo:** `public/logo.svg` (a text wordmark is used until then).

## Quick reference

- **New blog post:** add `content/blog/<slug>.mdx` with frontmatter
  (`title`, `description`, `date`, `tags`, `published`).
- **Budget dropdown currency:** edit the `BUDGETS` array in
  `components/sections/contact.tsx`.
