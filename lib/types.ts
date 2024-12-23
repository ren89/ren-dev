import { myExperiences } from "@/data/data";

export type Experience = {
  title: string;
  company: string;
  date: string;
  description: string;
  technologies: string[];
};

export type Project = {
  image: string;
  name: string;
  description: string;
  technologies: string[];
  href?: string;
};

export type Company = (typeof myExperiences)[number]["company"];

export const CompanyEnum = myExperiences.reduce((acc, { company }, index) => {
  acc[company] = company;
  return acc;
}, {} as Record<Company, string>);
