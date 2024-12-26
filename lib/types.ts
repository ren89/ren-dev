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
  images?: { image: string; name: string }[];
};

export type Company = (typeof myExperiences)[number]["company"];

export const CompanyEnum = myExperiences.reduce((acc, { company }) => {
  acc[company] = company;
  return acc;
}, {} as Record<Company, string>);
