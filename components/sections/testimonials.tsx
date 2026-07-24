import Image from "next/image";
import { Quote } from "lucide-react";

import {
  clientLogos,
  SHOW_TESTIMONIALS,
  testimonials,
  type Testimonial,
} from "@/data/testimonials";
import { Reveal } from "@/components/ui/reveal";

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="container-page scroll-mt-20 border-t border-border/60 py-24 sm:py-28"
    >
      <Reveal className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-widest text-brand">
          06 · Testimonials
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Trusted by the people I build with
        </h2>
        <p className="mt-4 text-muted-foreground">
          A few of the businesses and clients I&apos;ve worked with.
        </p>
      </Reveal>

      {/* Client logos (real) */}
      <Reveal delayMs={80} className="mt-10">
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
                    className="h-10 w-auto object-contain opacity-60 transition-opacity duration-300 [filter:brightness(0)] group-hover:opacity-100 dark:[filter:brightness(0)_invert(1)] sm:h-12"
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
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal as="li" key={i} delayMs={(i % 3) * 90}>
              <TestimonialCard testimonial={t} />
            </Reveal>
          ))}
        </ul>
      )}
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <Quote className="size-6 text-brand/50" aria-hidden="true" />
        {testimonial.placeholder && (
          <span className="rounded-full border border-dashed border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Placeholder
          </span>
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
    </figure>
  );
}
