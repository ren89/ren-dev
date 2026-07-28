import Image from "next/image";
import { Quote } from "lucide-react";

import {
  clientLogos,
  SHOW_TESTIMONIALS,
  testimonials,
  type Testimonial,
} from "@/data/testimonials";
import { SECTIONS } from "@/lib/site";
import { Reveal, RevealItem, RevealList } from "@/components/motion/reveal";
import { Section, SectionHeader, sectionGrid } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function Testimonials() {
  return (
    <Section id="testimonials">
      <SectionHeader
        {...SECTIONS.testimonials}
        title="Trusted by the people I build with"
        lede="A few of the businesses and clients I've worked with."
      />

      {/* Client logos (real) */}
      <Reveal delay={0.08} className="mt-10">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Worked with
        </p>
        <ul className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-6">
          {clientLogos.map((c) => (
            <li key={c.name}>
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={c.name}
                className="group inline-flex items-center"
              >
                {c.logo ? (
                  <Image
                    src={c.logo}
                    alt={c.name}
                    width={c.width ?? 200}
                    height={c.height ?? 120}
                    // Monochrome mark that adapts to the theme: dark logo in
                    // light mode, white logo in dark mode. Muted until hover.
                    className="h-10 w-auto object-contain opacity-60 transition-opacity duration-300 filter-[brightness(0)] group-hover:opacity-100 dark:filter-[brightness(0)_invert(1)] sm:h-12"
                  />
                ) : (
                  <span className="font-display text-lg font-semibold tracking-tight text-muted-foreground transition-colors group-hover:text-foreground">
                    {c.name}
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </Reveal>

      {/* Quotes */}
      {SHOW_TESTIMONIALS && (
        <RevealList as="ul" className={sectionGrid(3)}>
          {testimonials.map((t, i) => (
            <RevealItem key={i}>
              <TestimonialCard testimonial={t} />
            </RevealItem>
          ))}
        </RevealList>
      )}
    </Section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card as="figure" className="h-full">
      <div className="flex items-center justify-between">
        <Quote className="size-6 text-brand/50" aria-hidden="true" />
        {testimonial.placeholder && (
          <Badge variant="dashed" size="xs">
            Placeholder
          </Badge>
        )}
      </div>

      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      <figcaption className="mt-6 flex items-center gap-3 border-t border-border/60 pt-4">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent font-display text-sm font-semibold text-brand">
          {testimonial.name.charAt(0)}
        </span>
        <span className="text-sm">
          <span className="block font-medium text-foreground">
            {testimonial.name}
          </span>
          <span className="block text-muted-foreground">
            {testimonial.role} · {testimonial.company}
          </span>
        </span>
      </figcaption>
    </Card>
  );
}
