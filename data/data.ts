import { Experience, Project } from "@/lib/types";

export const myExperiences: Experience[] = [
  {
    company: "Frntlne",
    date: "2024 - Present",
    description:
      "a marketing-tech platform dedicated to enhancing customer engagement and boosting sales confidence, I serve as a full stack developer. My role involves creating innovative features, optimizing code for scalability, resolving bugs, and occasionally providing technical support, reflecting the dynamic nature of our startup environment.",
    technologies: ["TypeScript", "React Native", "Hasura", "GraphQL", "AWS"],
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
  {
    href: "https://brittanychiang.com/",
    name: "My Portfolio by Britanny Chiang",
    description:
      "A personal portfolio inspired by the UI of Brittany Chiang. It showcases a clean, minimalistic design and is fully responsive. This project was created to quickly highlight my skills and projects.",
    technologies: ["NextJS", "Tailwind", "Typescript", "Shadcn", "Vercel"],
    image: "/images/portfolio.png",
  },
];
