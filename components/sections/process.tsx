import { Reveal } from "@/components/ui/reveal";

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
    <section
      id="process"
      className="container-page scroll-mt-20 border-t border-border/60 py-24 sm:py-28"
    >
      <Reveal className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-widest text-brand">
          05 · How I work
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          A simple, predictable process
        </h2>
        <p className="mt-4 text-muted-foreground">
          From first conversation to a launched product you can rely on - you
          always know what&apos;s happening and what&apos;s next.
        </p>
      </Reveal>

      <div className="relative mt-14">
        {/* Horizontal connector (desktop) */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-5 hidden h-px bg-border md:block"
        />

        <ol className="grid gap-y-10 md:grid-cols-5 md:gap-x-6">
          {STEPS.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              delayMs={i * 90}
              className="relative"
            >
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
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
