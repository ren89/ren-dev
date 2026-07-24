import { playground } from "@/data/projects";
import { Reveal } from "@/components/ui/reveal";
import { PlaygroundCard } from "@/components/work/playground-card";

export function Playground() {
  return (
    <section
      id="playground"
      className="container-page scroll-mt-20 border-t border-border/60 py-24 sm:py-28"
    >
      <Reveal className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-widest text-brand">
          02 · Playground
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Playground &amp; past work
        </h2>
        <p className="mt-4 text-muted-foreground">
          Smaller builds, experiments, and earlier projects. A couple are still
          live to try; the rest are archived and no longer deployed.
        </p>
      </Reveal>

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {playground.map((project, i) => (
          <Reveal as="li" key={project.name} delayMs={(i % 3) * 90}>
            <PlaygroundCard project={project} />
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
