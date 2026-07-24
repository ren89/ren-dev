import { ArrowRight } from "lucide-react";

import { CTA } from "@/lib/site";
import { TrackCta } from "@/components/analytics/track-cta";
import { AvailabilityBadge } from "@/components/ui/availability-badge";

/**
 * Hero — top of the homepage.
 * Staggered entrance (fade-up with incremental delays); all motion collapses
 * to an instant reveal under prefers-reduced-motion via the global guard.
 * Background is the pure-CSS aurora below (no JS, no layout cost).
 */
export function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-[92vh] scroll-mt-20 items-center overflow-hidden"
    >
      <HeroAurora />

      <div className="container-page py-24">
        <div className="max-w-4xl">
          <AvailabilityBadge className="animate-fade-up" />
          <p className="mt-5 animate-fade-up font-mono text-sm uppercase tracking-widest text-brand [animation-delay:60ms]">
            Full-stack developer
          </p>

          <h1 className="mt-5 animate-fade-up font-display text-[2.75rem] font-bold leading-[1.05] tracking-tight [animation-delay:140ms] sm:text-6xl md:text-7xl">
            From idea to launched product —{" "}
            <span className="text-gradient">built end to end.</span>
          </h1>

          <p className="mt-6 max-w-2xl animate-fade-up text-lg text-muted-foreground [animation-delay:260ms] sm:text-xl">
            I handle the full stack so you get a polished, production-ready web
            app — without juggling multiple people.
          </p>

          <div className="mt-9 flex animate-fade-up flex-col gap-3 [animation-delay:380ms] sm:flex-row sm:items-center">
            <TrackCta
              href={CTA.href}
              source="hero"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-primary/30"
            >
              {CTA.label}
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </TrackCta>
            <a
              href="#work"
              className="inline-flex h-12 items-center justify-center rounded-full border border-input bg-background/50 px-7 text-sm font-medium backdrop-blur-sm transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              View my work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Decorative background: three blurred brand-color blobs that drift slowly,
 * over a faint grid that fades out toward the edges. Pointer-events-none and
 * aria-hidden so it never interferes with content or assistive tech.
 */
function HeroAurora() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black_50%,transparent_92%)]"
    >
      {/* Faint grid, masked to fade at the edges */}
      <div className="absolute inset-0 bg-grid opacity-[0.5] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      {/* Drifting glow blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 -top-16 h-72 w-72 animate-blob rounded-full bg-brand/30 blur-3xl sm:h-96 sm:w-96 dark:bg-brand/40" />
        <div className="absolute right-[-6rem] top-10 h-72 w-72 animate-blob rounded-full bg-brand-2/25 blur-3xl [animation-delay:-6s] sm:h-96 sm:w-96 dark:bg-brand-2/35" />
        <div className="absolute bottom-[-6rem] left-1/3 h-72 w-72 animate-blob rounded-full bg-brand-3/20 blur-3xl [animation-delay:-12s] sm:h-96 sm:w-96 dark:bg-brand-3/25" />
      </div>
    </div>
  );
}
