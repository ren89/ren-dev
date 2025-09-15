import { myExperiences } from "@/data/data";
import { StaticImageData } from "next/image";

export type Experience = {
  title: string;
  company: string;
  date: string;
  description: string;
  technologies: string[];
};

export type Project = {
  type: "mobile" | "web" | "cross-platform";
  image?: StaticImageData;
  name: string;
  description: string;
  technologies: string[];
  href?: string;
  images?: { image?: StaticImageData; name: string }[];
};

export type Company = (typeof myExperiences)[number]["company"];

export const CompanyEnum = myExperiences.reduce((acc, { company }) => {
  acc[company] = company;
  return acc;
}, {} as Record<Company, string>);
