import { StaticImageData } from "next/image";

export type Project = {
  type: "mobile" | "web" | "cross-platform";
  image?: StaticImageData;
  name: string;
  description: string;
  technologies: string[];
  href?: string;
  images?: { image?: StaticImageData; name: string }[];
};
