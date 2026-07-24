/**
 * Work / case-study data — the single source of truth for the Work section
 * and the `/work/[slug]` pages. Add or edit projects here without touching
 * any layout code.
 *
 * The story prose was drafted from Ren's notes and reviewed/approved by Ren.
 * frntlne's product description mirrors the public site (frntlne.com) and is
 * kept high-level under NDA.
 */

export type ProjectStatus = "live" | "private";

export type ProjectImage = { src: string; alt: string };

export type Project = {
  slug: string;
  name: string;
  /** One-line summary shown on the card. */
  tagline: string;
  /** Client / context label (e.g. "Client work", "Personal SaaS"). */
  context: string;
  year: string;
  status: ProjectStatus;
  /** Live URL. Omitted for private/dead projects (no dead links). */
  href?: string;
  /** True when specifics are limited by an NDA. */
  nda?: boolean;
  featured: boolean;
  /** Curated, client-facing tech tags. */
  tech: string[];
  /** Optional cover image path under /public. Falls back to a branded tile. */
  cover?: string;
  gallery?: ProjectImage[];
  story: {
    /** Short intro paragraph. */
    summary: string;
    problem: string;
    role: string;
    decisions: string[];
    challenges: string[];
    /** Qualitative impact — no invented metrics. */
    result: string;
  };
};

export const projects: Project[] = [
  {
    slug: "vow-studio",
    name: "Vow Studio",
    tagline:
      "A self-serve SaaS that lets couples build their entire wedding website — no designer required.",
    context: "Personal SaaS product",
    year: "2026",
    status: "live",
    href: "https://www.getvowstudio.com/",
    featured: true,
    tech: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "Postgres",
      "Drizzle ORM",
      "Zod",
      "Tailwind CSS",
      "shadcn/ui",
    ],
    cover: "/images/vowStudio/hero-site.png",
    gallery: [
      {
        src: "/images/vowStudio/dashboard.png",
        alt: "A couple's dashboard for managing their wedding site",
      },
      {
        src: "/images/vowStudio/theming.png",
        alt: "Theming controls — changing colors and fonts and hiding sections the couple doesn't want to show",
      },
      {
        src: "/images/vowStudio/seating.png",
        alt: "The seating arrangement tool for couples",
      },
      {
        src: "/images/vowStudio/rsvp.png",
        alt: "The RSVP page guests use to respond",
      },
      {
        src: "/images/vowStudio/gallery.png",
        alt: "The photo gallery guests can browse",
      },
    ],
    story: {
      summary:
        "Vow Studio began as the wedding website I was building for my fiancée and me. Partway through I realised the platform could work for any couple, so I redesigned it into a fully self-serve SaaS.",
      problem:
        "Most online wedding invitations are made-to-order: you buy a template, then trade messages with a designer who personalises it for you. Every change means another round-trip, and you never fully control the result.",
      role: "Founder and sole full-stack developer — product design, data modelling, auth, storage, and the entire front end.",
      decisions: [
        "Built a fully dynamic, multi-tenant platform so each couple's site — home, story, wedding details, RSVP, seating plan and FAQs — is generated from their own data.",
        "Designed a guided onboarding flow that walks a couple through building and publishing their site end to end, removing any need to contact an admin.",
        "Gave couples full control over the look — changing colors and fonts and showing or hiding any section — so each site feels personal without touching a line of code.",
        "Used Postgres with Drizzle ORM and Zod validation at every route boundary to keep the data layer type-safe and predictable.",
        "Leaned on Supabase for auth and storage to ship a real product quickly without a bespoke backend.",
      ],
      challenges: [
        "Designing a schema flexible enough to serve many couples while keeping every site feeling bespoke.",
        "Making self-serve editing simple enough for non-technical users, largely on their phones.",
      ],
      result:
        "A live, self-serve product where any couple can sign up and publish a complete, personalised wedding website themselves — no designer and no back-and-forth.",
    },
  },
  {
    slug: "eternal-homes",
    name: "Eternal Homes",
    tagline:
      "A policy and payment tracking platform bringing an established funeral-plan provider online.",
    context: "Client work",
    year: "2026",
    status: "live",
    href: "https://eternalhomesph.com/",
    featured: true,
    tech: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "Postgres",
      "Drizzle ORM",
      "React Hook Form",
      "Zod",
      "Tailwind CSS",
      "Recharts",
    ],
    // cover: "/images/eternal-homes/cover.png", // TODO: add screenshots
    story: {
      summary:
        "Eternal Homes is a policy-management platform for an established funeral-plan provider taking its long-running business online for the first time.",
      problem:
        "The business had operated for years with no digital system. Clients had no way to see their plan or track payments, and staff processed applications and documents entirely by hand.",
      role: "Full-stack developer building the system end to end, working closely with the owner to translate their operations into software.",
      decisions: [
        "Built a client portal where policyholders can browse available plans, track their policy and payment progress, and download their documents.",
        "Built an admin console to manage users and policies, approve or reject applications, and generate the documents clients download.",
        "Architected for scale from day one — the data model is prepared for a future agent tier (agent-managed clients and commission tracking) that isn't live yet.",
        "Used Postgres with Drizzle ORM, plus React Hook Form and Zod, for reliable, validated application and document workflows.",
      ],
      challenges: [
        "Modelling real-world plan, policy, payment and approval operations into a clean, extensible schema.",
        "Preparing for a future agent and commission system without over-engineering the current client-first release.",
      ],
      result:
        "The provider now has a genuine online presence and a system their clients use to track plans and payments — a foundation built to grow into agent management and commissions as their vision expands.",
    },
  },
  {
    slug: "frntlne",
    name: "frntlne",
    tagline:
      "A mobile-first learning platform that turns short videos into real-world sales impact for frontline teams.",
    context: "Product company · under NDA",
    year: "Ongoing",
    status: "live",
    href: "https://app.frntlne.com/",
    nda: true,
    featured: true,
    tech: [
      "Next.js",
      "React Native",
      "Expo",
      "Gluestack UI",
      "GraphQL",
      "Hasura",
      "AWS",
      "AI",
      "TypeScript",
    ],
    story: {
      // Kept high-level under NDA; product description mirrors the public site frntlne.com
      summary:
        "frntlne is a mobile-first learning platform that helps brands and retailers train their frontline teams — store staff, distributors and contractors — with short, engaging videos that build product knowledge and sales skills. I work on it as one of the full-stack developers on the team.",
      problem:
        "Traditional frontline training is long, forgettable, and hard to deliver to distributed teams — and even harder to measure. frntlne replaces it with fast, reward-driven video learning and real-time performance tracking.",
      role: "One of the full-stack developers on the team. I build product features and develop related applications for the company — such as internal admin tools — across web and mobile.",
      decisions: [
        "Contributed to taking the product cross-platform with React Native and Expo, shipping to the App Store, Google Play and web from a shared codebase.",
        "Worked across a modern stack — Next.js on the web, GraphQL/Hasura for data, AWS for infrastructure, and Gluestack UI on mobile.",
        "Helped bring AI into some of the product's features.",
      ],
      challenges: [
        "Delivering features at startup pace as part of a team while keeping the codebase scalable across multiple apps.",
      ],
      result:
        "Contributed to a production platform available on the App Store, Google Play and the web, used to train frontline teams. Further detail is covered by NDA.",
    },
  },
];

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/* ─────────────────────────────────────────────────────────────
 * PLAYGROUND — smaller / older projects and experiments.
 * Compact cards only (no case-study pages). "live" items link to a
 * working demo; "archived" items are no longer deployed (no dead links).
 * ───────────────────────────────────────────────────────────── */

export type PlaygroundStatus = "live" | "archived";

export type PlaygroundProject = {
  name: string;
  tagline: string;
  tech: string[];
  status: PlaygroundStatus;
  /** Demo URL (internal route or external). Omitted when archived. */
  href?: string;
  /** Cover image under /public; falls back to a branded tile. */
  cover?: string;
};

export const playground: PlaygroundProject[] = [
  {
    name: "Tic Tac Toe",
    tagline: "A classic player-vs-player Tic Tac Toe game.",
    tech: ["Next.js", "TypeScript"],
    status: "live",
    href: "/codeExercise/tictactoe",
    cover: "/images/tictactoe/tictactoe.png",
  },
  {
    name: "Todo List",
    tagline: "A small todo app built to practice clean code and custom hooks.",
    tech: ["Next.js", "TypeScript"],
    status: "live",
    href: "/codeExercise/todo",
    cover: "/images/todo/todo.png",
  },
  {
    name: "Property Listing App",
    tagline: "A property listing platform with search, filters, and admin CRUD.",
    tech: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
    status: "archived",
    cover: "/images/propertyListing/home.jpg",
  },
  {
    name: "Campus Entry Monitor",
    tagline: "RFID campus-entry tracking with real-time guardian alerts.",
    tech: ["Next.js", "Supabase", "Twilio", "RFID"],
    status: "archived",
    cover: "/images/campusEntryMonitor/home.jpg",
  },
  {
    name: "Shuffled",
    tagline: "A live-selling e-commerce platform for pre-loved clothing.",
    tech: ["React", "Express", "MongoDB", "Node.js"],
    status: "archived",
    cover: "/images/shuffled/homeScreen.png",
  },
  {
    name: "Buildustry",
    tagline:
      "A platform connecting clients, contractors, and laborers on construction projects.",
    tech: ["Next.js", "Prisma", "SQLite"],
    status: "archived",
    cover: "/images/buildustry/dashboard.png",
  },
  {
    name: "E-Vill",
    tagline: "An online barangay portal for document requests and complaints.",
    tech: ["Node.js", "Firebase", "HTML", "CSS"],
    status: "archived",
    cover: "/images/eVill/barangayHome.png",
  },
  {
    name: "frntlne V2",
    tagline: "An earlier version of the frntlne learning platform.",
    tech: ["Python", "Flutter", "AWS"],
    status: "archived",
    cover: "/images/frntlne/frntlnev2.png",
  },
  {
    name: "PicMe",
    tagline: "A marketplace connecting people with photographers and models.",
    tech: ["Flutter", "Firebase"],
    status: "archived",
  },
  {
    name: "Trashure",
    tagline:
      "A mobile app linking junk sellers with junkyards, with route optimization.",
    tech: ["Flutter", "Firebase", "Google Maps"],
    status: "archived",
  },
  {
    name: "Portfolio (v1)",
    tagline: "An experimental portfolio exploring MDX, caching, and theming.",
    tech: ["Next.js", "MDX", "Tailwind CSS"],
    status: "archived",
    cover: "/images/blog/blog.png",
  },
];
