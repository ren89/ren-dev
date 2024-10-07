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
