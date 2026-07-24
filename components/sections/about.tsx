import Link from "next/link";

import { CTA } from "@/lib/site";
import { Reveal } from "@/components/ui/reveal";
import { TrackCta } from "@/components/analytics/track-cta";

const FACTS = [
  { value: "6+ yrs", label: "Experience" },
  { value: "Full-stack", label: "Web & mobile" },
  { value: "Founder", label: "of Vow Studio" },
];

export function About() {
  return (
    <section
      id="about"
      className="container-page scroll-mt-20 border-t border-border/60 py-24 sm:py-28"
    >
      <div className="grid gap-10 lg:grid-cols-[300px_1fr] lg:gap-16">
        {/* Headshot */}
        <Reveal>
          <Headshot />
        </Reveal>

        {/* Bio */}
        <Reveal delayMs={120} className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-brand">
            04 · About
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Hi, I&apos;m Ren.
          </h2>

          <div className="mt-5 space-y-4 text-muted-foreground">
            <p>
              I&apos;m a full-stack developer with{" "}
              <span className="text-foreground">6+ years</span> of experience
              turning ideas into real, working products. Honestly, I just love
              building - full web apps, internal systems, or the occasional
              weekend experiment. If it means taking something from a blank
              screen to a thing people actually use, that&apos;s my favorite
              kind of work.
            </p>
            <p>
              I build products end to end, owning everything from the database
              to the interface - including{" "}
              <span className="text-foreground">Vow Studio</span>, a self-serve
              wedding-website SaaS I started for my own wedding, and systems for
              real businesses. If you&apos;re creating something, I&apos;d love
              to help you build it.
            </p>
          </div>

          {/* Quick facts */}
          <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-border/60 pt-6">
            {FACTS.map((f) => (
              <div key={f.label}>
                <dt className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
                  {f.value}
                </dt>
                <dd className="mt-1 text-xs text-muted-foreground">
                  {f.label}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <TrackCta
              href={CTA.href}
              source="about"
              className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {CTA.label}
            </TrackCta>
            <Link
              href="/resume"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-brand"
            >
              View résumé
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * Headshot placeholder - branded monogram tile until a real photo is added
 * to public/images/me/ (see CONTENT_TODO.md).
 */
function Headshot() {
  return (
    <div className="relative aspect-square w-full max-w-[300px] overflow-hidden rounded-2xl border border-border">
      <div className="flex size-full items-center justify-center bg-linear-to-br from-brand/20 via-background to-brand-2/20">
        <div className="absolute inset-0 bg-grid opacity-40 mask-[radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <span className="relative font-display text-7xl font-bold text-gradient">
          RA
        </span>
      </div>
    </div>
  );
}
