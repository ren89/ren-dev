import { SECTIONS } from "@/lib/site";
import { RevealItem, RevealList } from "@/components/motion/reveal";
import { Section, SectionHeader } from "@/components/ui/section";
import { ProcessSteps } from "@/components/sections/process-steps";

const STEPS = [
  {
    title: "Discovery",
    desc: "We talk through your goals, users, and scope so we're aligned before any code is written.",
  },
  {
    title: "Design & Plan",
    desc: "I map the flows and architecture, and we agree on exactly what the first version includes.",
  },
  {
    title: "Build",
    desc: "I develop it end to end - front end, back end, and data - with regular check-ins, no surprises.",
  },
  {
    title: "Launch",
    desc: "We ship to production, tested and ready for real users.",
  },
  {
    title: "Support",
    desc: "I stick around after launch to fix, refine, and help it grow.",
  },
];

export function Process() {
  return (
    <Section id="process">
      <SectionHeader
        {...SECTIONS.process}
        title="A simple, predictable process"
        lede="From first conversation to a launched product you can rely on - you always know what's happening and what's next."
      />

      <ProcessSteps>
        <RevealList as="ol" className="grid gap-y-10 md:grid-cols-5 md:gap-x-6">
          {STEPS.map((step, i) => (
            <RevealItem key={step.title} className="relative">
              <div className="flex items-center gap-4 md:block">
                <span className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border border-brand/40 bg-background font-mono text-sm font-semibold text-brand">
                  {i + 1}
                </span>
                <h3 className="font-display text-lg font-semibold tracking-tight md:mt-5">
                  {step.title}
                </h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground md:pr-4">
                {step.desc}
              </p>
            </RevealItem>
          ))}
        </RevealList>
      </ProcessSteps>
    </Section>
  );
}
