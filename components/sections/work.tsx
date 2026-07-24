import { getFeaturedProjects } from "@/data/projects";
import { Reveal } from "@/components/ui/reveal";
import { ProjectCard } from "@/components/work/project-card";

export function Work() {
  const featured = getFeaturedProjects();

  return (
    <section
      id="work"
      className="container-page scroll-mt-20 border-t border-border/60 py-24 sm:py-28"
    >
      <Reveal className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-widest text-brand">
          01 · Work
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Selected work
        </h2>
        <p className="mt-4 text-muted-foreground">
          A few products I&apos;ve built end to end — from data model and APIs
          to the interface people actually use. Open a case study for the full
          story.
        </p>
      </Reveal>

      <ul className="mt-12 grid gap-6 sm:grid-cols-2">
        {featured.map((project, i) => (
          <Reveal as="li" key={project.slug} delayMs={i * 90}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
