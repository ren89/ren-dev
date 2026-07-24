import { Hero } from "@/components/sections/hero";
import { Work } from "@/components/sections/work";
import { Playground } from "@/components/sections/playground";

/**
 * Single-page portfolio.
 * Phases 3–4 add the hero (#home), Work (#work), and Playground. Remaining
 * sections are still PLACEHOLDERS, filled in by later phases.
 */
export default function Home() {
  return (
    <>
      <Hero />

      <Work />

      <Playground />

      <PlaceholderSection
        id="services"
        eyebrow="03 · Services"
        title="How I can help"
        note="Services content arrives in a later phase."
      />
      <PlaceholderSection
        id="about"
        eyebrow="04 · About"
        title="A bit about me"
        note="About content arrives in a later phase."
      />
      <PlaceholderSection
        id="contact"
        eyebrow="05 · Contact"
        title="Let's build something"
        note="Contact form arrives in a later phase."
      />
    </>
  );
}

function PlaceholderSection({
  id,
  eyebrow,
  title,
  note,
}: {
  id: string;
  eyebrow: string;
  title: string;
  note: string;
}) {
  return (
    <section
      id={id}
      className="container-page flex min-h-[70vh] scroll-mt-20 flex-col justify-center border-t border-border/60 py-24"
    >
      <p className="font-mono text-xs uppercase tracking-widest text-brand">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 max-w-xl text-muted-foreground">{note}</p>
    </section>
  );
}
