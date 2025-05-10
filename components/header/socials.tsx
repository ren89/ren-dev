import { Github, Instagram, Linkedin } from "lucide-react";

export function Socials() {
  return (
    <div className="gap-2 ml-1 mt-8 flex items-center">
      <a
        href="https://github.com/ren89"
        target="_blank"
        className="hover:text-teal-300"
      >
        <Github strokeWidth={1} />
      </a>
      <a
        href="https://www.linkedin.com/in/reniel-avellano-52072a233/"
        target="_blank"
        className="hover:text-teal-300"
      >
        <Linkedin strokeWidth={1} href="tr" target="_blank" />
      </a>
      <a
        href="https://www.instagram.com/renrn_/"
        target="_blank"
        className="hover:text-teal-300"
      >
        <Instagram strokeWidth={1} href="tr" target="_blank" />
      </a>
    </div>
  );
}
