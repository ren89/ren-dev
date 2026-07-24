import { Hero } from "@/components/sections/hero";
import { Work } from "@/components/sections/work";
import { Playground } from "@/components/sections/playground";
import { Services } from "@/components/sections/services";
import { About } from "@/components/sections/about";
import { Process } from "@/components/sections/process";
import { Testimonials } from "@/components/sections/testimonials";
import { Contact } from "@/components/sections/contact";

/** Single-page portfolio. */
export default function Home() {
  return (
    <>
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
