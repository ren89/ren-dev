import { Experience } from "@/lib/types";
import { ChipGroup } from "./chipGroup";
import { Section } from "./section";

export function ExperienceSection({
  experiences,
}: {
  experiences: Experience[];
}) {
  return (
    <Section title="Experience">
      <ol className="group/list">
        {experiences.map((exp) => (
          <li className="mb-12">
            <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
              <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-[#03123d] lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
              <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-[#6c7a97] sm:col-span-2">
                {exp.date}
              </header>
              <div className="z-10 sm:col-span-6">
                <h3 className="font-medium leading-snug ">
                  <span className="inline-flex items-baseline font-medium text-white leading-tight group/link text-base">
                    {exp.title} • {exp.company}
                  </span>
                </h3>
                <p className="mt-2 text-sm leading-normal">{exp.description}</p>
                <ChipGroup values={exp.technologies} />
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
