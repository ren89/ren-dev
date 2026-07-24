import { Hero } from "@/components/sections/hero";
import { Work } from "@/components/sections/work";
import { Playground } from "@/components/sections/playground";
import { Services } from "@/components/sections/services";
import { About } from "@/components/sections/about";
import { Process } from "@/components/sections/process";
import { Testimonials } from "@/components/sections/testimonials";
import { Contact } from "@/components/sections/contact";
import { SITE } from "@/lib/site";

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.fullName,
  url: SITE.url,
  jobTitle: "Full-stack developer",
  description:
    "Full-stack developer building fast, modern web apps with React, Next.js, and TypeScript.",
  knowsAbout: ["React", "Next.js", "TypeScript", "Supabase", "Web development"],
  sameAs: [SITE.github, SITE.linkedin, SITE.twitter].filter(Boolean),
};

/** Single-page portfolio. */
export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />
      <Hero />
      <Work />
      <Playground />
      <Services />
      <About />
      <Process />
      <Testimonials />
      <Contact />
    </>
  );
}
