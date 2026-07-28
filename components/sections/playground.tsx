import { playground } from "@/data/projects";
import { SECTIONS } from "@/lib/site";
import { RevealItem, RevealList } from "@/components/motion/reveal";
import { Section, SectionHeader, sectionGrid } from "@/components/ui/section";
import { PlaygroundCard } from "@/components/work/playground-card";

export function Playground() {
  return (
    <Section id="playground">
      <SectionHeader
        {...SECTIONS.playground}
        title="Playground & past work"
        lede="Smaller builds, experiments, and earlier projects. A couple are still live to try; the rest are archived and no longer deployed."
      />
      <RevealList as="ul" className={sectionGrid(3)}>
        {playground.map((project) => (
          <RevealItem key={project.name}>
            <PlaygroundCard project={project} />
          </RevealItem>
        ))}
      </RevealList>
    </Section>
  );
}
