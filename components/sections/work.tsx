import { getFeaturedProjects } from "@/data/projects";
import { SECTIONS } from "@/lib/site";
import { RevealItem, RevealList } from "@/components/motion/reveal";
import { Section, SectionHeader, sectionGrid } from "@/components/ui/section";
import { ProjectCard } from "@/components/work/project-card";

export function Work() {
  const featured = getFeaturedProjects();

  return (
    <Section id="work">
      <SectionHeader
        {...SECTIONS.work}
        title="Selected work"
        lede="A few products I've built end to end - from data model and APIs to the interface people actually use. Open a case study for the full story."
      />
      <RevealList as="ul" className={sectionGrid(2)}>
        {featured.map((project) => (
          <RevealItem key={project.slug}>
            <ProjectCard project={project} />
          </RevealItem>
        ))}
      </RevealList>
    </Section>
  );
}
