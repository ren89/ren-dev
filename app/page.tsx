import { CTA } from "@/lib/site";

/**
 * Single-page portfolio.
 * Phase 2 provides the layout shell (nav + footer) and PLACEHOLDER sections
 * so smooth-scroll and active-section highlighting are verifiable.
 * Each section below is filled in by a later phase.
 */
export default function Home() {
  return (
    <>
      {/* HOME / hero */}
      <section
        id="home"
        className="container-page flex min-h-[90vh] scroll-mt-20 flex-col justify-center py-24"
      >
        <div className="animate-fade-up space-y-6">
          <p className="font-mono text-sm uppercase tracking-widest text-brand">
            Full-stack developer
          </p>
          <h1 className="max-w-4xl font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            I build fast, modern{" "}
            <span className="text-gradient">web apps</span> end to end.
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
            React, Next.js, and TypeScript on the front; scalable APIs and data
            behind them. This is the layout shell — use the nav to jump between
            sections and watch the active link update as you scroll.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={CTA.href}
              className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {CTA.label}
            </a>
            <a
              href="#work"
              className="inline-flex h-11 items-center justify-center rounded-full border border-input px-6 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              View work
            </a>
          </div>
        </div>
      </section>

      <PlaceholderSection
        id="work"
        eyebrow="01 · Work"
        title="Selected projects"
        note="Project grid arrives in a later phase."
      />
      <PlaceholderSection
        id="services"
        eyebrow="02 · Services"
        title="How I can help"
        note="Services content arrives in a later phase."
      />
      <PlaceholderSection
        id="about"
        eyebrow="03 · About"
        title="A bit about me"
        note="About content arrives in a later phase."
      />
      <PlaceholderSection
        id="contact"
        eyebrow="04 · Contact"
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
