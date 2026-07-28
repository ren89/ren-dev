/** Single source of truth for navigation + contact details. */

export type NavLink = {
  id: string;
  label: string;
  href: string;
  /** "anchor" = in-page section (scroll-spy); "route" = a real page. */
  type: "anchor" | "route";
};

export const NAV_LINKS: NavLink[] = [
  { id: "home", label: "Home", href: "#home", type: "anchor" },
  { id: "work", label: "Work", href: "#work", type: "anchor" },
  {
    id: "playground",
    label: "Playground",
    href: "#playground",
    type: "anchor",
  },
  { id: "services", label: "Services", href: "#services", type: "anchor" },
  { id: "about", label: "About", href: "#about", type: "anchor" },
  { id: "blog", label: "Blog", href: "/blog", type: "route" },
  { id: "contact", label: "Contact", href: "#contact", type: "anchor" },
];

/** Only in-page sections participate in scroll-spy. */
export const SECTION_IDS = NAV_LINKS.filter((l) => l.type === "anchor").map(
  (l) => l.id,
);

export const CTA = { label: "Let's talk", href: "#contact" };

/**
 * Homepage section eyebrow numbering, spread into <SectionHeader {...}>.
 * Not derived from SECTION_IDS - that list is built from NAV_LINKS, which
 * omits "process" and "testimonials", so deriving from it would silently
 * renumber every section. Reorder here and every heading renumbers.
 */
export const SECTIONS = {
  work: { index: 1, eyebrow: "Work" },
  playground: { index: 2, eyebrow: "Playground" },
  services: { index: 3, eyebrow: "Services" },
  about: { index: 4, eyebrow: "About" },
  process: { index: 5, eyebrow: "How I work" },
  testimonials: { index: 6, eyebrow: "Testimonials" },
  contact: { index: 7, eyebrow: "Contact" },
} as const;

/**
 * Freelance availability - single source of truth for the badge.
 * Edit `status` / `label` here and it updates everywhere it appears.
 */
export const AVAILABILITY: {
  status: "available" | "limited" | "booked";
  label: string;
} = {
  status: "available",
  label: "Available for new projects",
};

export const SITE = {
  name: "ren-dev",
  fullName: "Ren Avellano",
  role: "Full-stack developer",
  email: "ren.avellano@gmail.com",
  github: "https://github.com/ren89",
  // Production URL (override via NEXT_PUBLIC_SITE_URL for a custom domain).
  // Trailing slashes are stripped so joined paths never double up ("//").
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://ren-dev-black.vercel.app"
  ).replace(/\/+$/, ""),
  // Booking/scheduling link (e.g. Calendly). Empty = "Book a call" affordances
  // stay hidden and flows fall back to the contact form / email.
  booking: "",
  // Add when available (see CONTENT_TODO.md):
  linkedin: "",
  twitter: "",
};
