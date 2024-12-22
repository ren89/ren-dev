import { Experience, Project } from "@/lib/types";

export const myExperiences: Experience[] = [
  {
    company: "Frntlne",
    date: "2024 - Present",
    description:
      "a marketing-tech platform dedicated to enhancing customer engagement and boosting sales confidence, I serve as a full stack developer. My role involves creating innovative features, optimizing code for scalability, resolving bugs, and occasionally providing technical support, reflecting the dynamic nature of our startup environment.",
    technologies: [
      "TypeScript",
      "React Native",
      "Native Base",
      "Hasura",
      "GraphQL",
      "AWS",
      "Expo",
    ],
    title: "Full Stack Developer",
  },
  {
    company: "Servscale",
    date: "2022 - 2024",
    description:
      "During my time at Servscale, an outsourcing company, I developed numerous projects utilizing a diverse range of technologies and stacks. This exploration allowed me to identify my true focus in development. I successfully deployed these projects for various clients and had the opportunity to lead a team on several small-scale initiatives.",
    technologies: [
      "JavaScript",
      "TypeScript",
      "Flutter",
      "Firebase",
      "SQL",
      "Python",
      "NextJS",
    ],
    title: "Junior Software Engineer",
  },
];

export const myProjects: Project[] = [
  // {
  //   href: "https://brittanychiang.com/",
  //   name: "My Portfolio (inpired in Britanny Chiang Portfolio)",
  //   description:
  //     "A personal portfolio inspired by the UI of Brittany Chiang. It showcases a clean, minimalistic design and is fully responsive. This project was created to quickly highlight my skills and projects.",
  //   technologies: ["NextJS", "Tailwind", "Typescript", "Shadcn", "Vercel"],
  //   image: "/images/portfolio.png",
  // },
  {
    href: undefined,
    name: "Buildustry",
    description:
      "Buildustry connects clients, contractors, and skilled laborers to manage construction projects. Clients post jobs, build teams, track progress, and message team members directly. Contractors update project statuses and showcase their work, while team members can rate completed projects, fostering trust and transparency.",
    technologies: [
      "NextJS",
      "Tailwind",
      "Shadcn",
      "Javascript",
      "SQLite",
      "Primsa",
    ],
    image: "/images/buildustry.png",
  },
  {
    href: undefined,
    name: "Shuffled",
    description:
      "Shuffled is an e-commerce platform for pre-loved clothing, featuring live selling with a unique “mine” button. During live sales, the first user to click “mine” claims the item, which is added to their cart with a checkout timer. If they don’t complete the purchase in time, the item returns to the sale. Shuffled also includes all standard e-commerce features: stores, user profiles, search, categories, cart, payment, shipping, and a live comment section for real-time interaction.",
    technologies: ["MongoDB", "Express", "React", "NodeJS"],
    image: "/images/shuffled.png",
  },

  {
    href: undefined,
    name: "E-Vill",
    description:
      "e-Vill is a web platform designed for barangays, enabling citizens to request documents, file complaints online and track their status, reducing the need for multiple trips. The admin side allows barangay officials to manage requests, post announcements, and address citizen complaints, complete with image attachments. e-Vill fosters efficient, transparent, and connected barangay services.",
    technologies: ["HTML", "CSS", "NodeJs", "Firebase"],
    image: "/images/evill.png",
  },
];
