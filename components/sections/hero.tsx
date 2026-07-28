import { ArrowRight } from "lucide-react";

import { CTA } from "@/lib/site";
import { TrackCta } from "@/components/analytics/track-cta";
import { AvailabilityBadge } from "@/components/ui/availability-badge";
import { Button } from "@/components/ui/button";
import { HeroHeadline } from "@/components/sections/hero-headline";
import { HeroAurora } from "@/components/sections/hero-aurora";

/**
 * Hero - top of the homepage. Server component throughout: HeroHeadline is
 * plain CSS (see its own file for why), and HeroAurora is the only client
 * boundary, scoped to purely decorative background - the rest of this file
 * never crosses.
 * Staggered entrance (fade-up with incremental delays); all motion collapses
 * to an instant reveal under prefers-reduced-motion via the global guard.
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

          <HeroHeadline />

          <p className="mt-6 max-w-2xl animate-fade-up text-lg text-muted-foreground [animation-delay:620ms] sm:text-xl">
            I handle the full stack so you get a polished, production-ready web
            app - without juggling multiple people.
          </p>

          <div className="mt-9 flex animate-fade-up flex-col gap-3 [animation-delay:740ms] sm:flex-row sm:items-center">
            <Button
              asChild
              size="xl"
              shape="pill"
              className="group shadow-lg shadow-primary/20 hover:shadow-primary/30"
            >
              <TrackCta href={CTA.href} source="hero">
                {CTA.label}
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </TrackCta>
            </Button>
            <Button
              asChild
              variant="outline"
              size="xl"
              shape="pill"
              className="bg-background/50 backdrop-blur-sm"
            >
              <a href="#work">View my work</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
