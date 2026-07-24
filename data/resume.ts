import { SITE } from "@/lib/site";

/**
 * Résumé / profile data - single source of truth for the /resume views.
 * Selected projects, services, and testimonials are pulled from their own
 * data files at render time, so they are not duplicated here.
 */

export type ResumeProfile = {
  name: string;
  title: string;
  location: string;
  phone?: string;
  email: string;
  website: string;
  github: string;
};

export type WorkExperience = {
  role: string;
  company: string;
  start: string;
  end: string;
  bullets: string[];
  location?: string;
  url?: string;
};

export type Education = {
  credential: string;
  institution: string;
  start?: string;
  end?: string;
  note?: string;
};

export type SkillGroup = { label: string; items: string[] };

/** Shown in the PDF footer. Update when the résumé content changes. */
export const updatedAt = "July 2026";

export const profile: ResumeProfile = {
  name: SITE.fullName,
  title: "Full-Stack Web Developer",
  location: "Pasig, Metro Manila, Philippines",
  phone: "0995 984 8364",
  email: SITE.email,
  website: SITE.url,
  github: SITE.github,
};

// DRAFT - written from Ren's inputs, pending Ren's approval before it ships.
export const summary =
  "Full-stack web developer who builds and ships production web and mobile apps with TypeScript, React, Next.js, and Node.js. Currently at frntlne, where I build product features, own the admin platform, and optimize front-end and back-end performance for faster load times. I also founded Vow Studio, a self-serve wedding-website SaaS, and have delivered custom systems for real businesses - taking products from idea to launch and supporting them in production.";

export const experience: WorkExperience[] = [
  {
    role: "Full-Stack Developer",
    company: "frntlne",
    start: "2023",
    end: "Present",
    bullets: [
      "Created innovative product features across the platform.",
      "Built the company's admin side from the ground up.",
      "Increased app performance by optimizing front-end and back-end code for faster loading times.",
      "Supported users by investigating and resolving reported bugs.",
    ],
  },
  {
    role: "Junior Software Engineer",
    company: "Servscale",
    start: "2022",
    end: "2023",
    bullets: [
      "Developed numerous projects using a diverse range of technologies and stacks.",
      "Delivered completed products within project deadlines.",
      "Led a team on several small-scale initiatives.",
      "Studied corrections from senior engineers to learn and grow professionally.",
    ],
  },
];

export const education: Education[] = [
  {
    credential: "Bachelor of Science in Information Technology",
    institution: "Technological University of the Philippines",
    start: "2018",
    end: "2022",
  },
  {
    credential:
      "Information Technology - Mobile Application and Web Development",
    institution: "STI Global City",
    start: "2016",
    end: "2018",
  },
];

export const skills: SkillGroup[] = [
  { label: "Languages", items: ["TypeScript", "JavaScript"] },
  { label: "Frameworks", items: ["React", "React Native", "Next.js", "Vite"] },
  {
    label: "Backend & Data",
    items: ["Node.js", "PostgreSQL", "Supabase", "Drizzle", "GraphQL", "Hasura"],
  },
  { label: "Tools & Platforms", items: ["Vercel", "AWS", "Git"] },
];
