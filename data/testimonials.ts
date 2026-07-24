/**
 * Testimonials + client logos.
 *
 * NOTE (Ren): the testimonials below are PLACEHOLDERS with obviously-fake
 * attribution - never ship fabricated quotes credited to a real person.
 * Replace them with real quotes as you collect them (Eternal Homes to follow),
 * or set `SHOW_TESTIMONIALS` to false to hide the quotes grid until then.
 * Client logos are real; drop logo files in public/images/clients/ and set `logo`.
 */

export const SHOW_TESTIMONIALS = true;

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
  /** Marks a non-real placeholder so the UI can label it clearly. */
  placeholder?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    placeholder: true,
    quote:
      "A short, honest quote from a happy client will live here - what it was like to work together and the result they got.",
    name: "Client Name",
    role: "Founder",
    company: "Company",
  },
  {
    placeholder: true,
    quote:
      "Another real quote goes here once collected. Keep it specific: the problem, the outcome, and why they'd recommend me.",
    name: "Client Name",
    role: "Owner",
    company: "Business",
  },
  {
    placeholder: true,
    quote:
      "Space for a third testimonial. Short and genuine beats long and polished.",
    name: "Client Name",
    role: "Project Lead",
    company: "Company",
  },
];

export type ClientLogo = {
  name: string;
  href?: string;
  /** Logo image under /public; falls back to a text chip. */
  logo?: string;
  width?: number;
  height?: number;
};

export const clientLogos: ClientLogo[] = [
  {
    name: "Eternal Homes",
    href: "https://eternalhomesph.com/",
    logo: "/images/eternalHomes/logo.png",
    width: 1364,
    height: 1082,
  },
  {
    name: "frntlne",
    href: "https://www.frntlne.com/",
    logo: "/images/frntlne/logo.png",
    width: 1516,
    height: 1080,
  },
];
