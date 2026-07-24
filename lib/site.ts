/** Single source of truth for navigation + contact details. */

export type NavLink = { id: string; label: string; href: string };

export const NAV_LINKS: NavLink[] = [
  { id: "home", label: "Home", href: "#home" },
  { id: "work", label: "Work", href: "#work" },
  { id: "services", label: "Services", href: "#services" },
  { id: "about", label: "About", href: "#about" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export const SECTION_IDS = NAV_LINKS.map((l) => l.id);

export const CTA = { label: "Let's talk", href: "#contact" };

export const SITE = {
  name: "ren-dev",
  fullName: "Ren Avellano",
  role: "Full-stack developer",
  email: "ren.avellano@gmail.com",
  github: "https://github.com/ren89",
  // Add when available (see CONTENT_TODO.md):
  linkedin: "",
  twitter: "",
};
