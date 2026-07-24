/**
 * Services shown in the Services section. Edit copy here freely — the
 * component maps `icon` to a lucide icon, so no layout changes are needed.
 */

export type ServiceIcon =
  "layers" | "rocket" | "dashboard" | "template" | "gauge";

export type Service = {
  title: string;
  /** Benefit-focused one-liner. */
  description: string;
  /** Short "what you get" points. */
  points: string[];
  icon: ServiceIcon;
};

export const services: Service[] = [
  {
    title: "Full-stack web apps",
    description:
      "I design, build, and ship complete web applications end to end — so you get one person who owns the whole product.",
    points: [
      "Auth, database, and dashboards wired together",
      "Built to scale as your users grow",
      "Deployed and production-ready",
    ],
    icon: "layers",
  },
  {
    title: "SaaS & MVPs for startups",
    description:
      "Turn your concept into a working product you can put in front of real users — fast, without cutting corners on quality.",
    points: [
      "Ship a focused first version quickly",
      "A clean codebase you can build on",
      "Room to grow into a full platform",
    ],
    icon: "rocket",
  },
  {
    title: "Admin systems & internal tools",
    description:
      "Custom dashboards and back-office systems to manage users, data, payments, and day-to-day operations in one place.",
    points: [
      "Role-based access and approvals",
      "Reports and data you can act on",
      "Replaces spreadsheets and manual work",
    ],
    icon: "dashboard",
  },
  {
    title: "Landing pages & marketing sites",
    description:
      "Fast, polished, conversion-focused pages that make a strong first impression and turn visitors into leads.",
    points: [
      "Mobile-first and lightning fast",
      "SEO and accessibility baked in",
      "Designed to convert, not just look good",
    ],
    icon: "template",
  },
  {
    title: "Website redesign & performance",
    description:
      "Modernize an existing site with a better look, faster load times, and a mobile experience your users will enjoy.",
    points: [
      "Refreshed, modern design",
      "Speed and Core Web Vitals improvements",
      "Accessibility and responsive fixes",
    ],
    icon: "gauge",
  },
];
