import {
  ArrowRight,
  Check,
  Gauge,
  Layers,
  LayoutDashboard,
  LayoutTemplate,
  Rocket,
  type LucideIcon,
} from "lucide-react";

import { services, type Service, type ServiceIcon } from "@/data/services";
import { CTA } from "@/lib/site";
import { Reveal } from "@/components/ui/reveal";
import { TrackCta } from "@/components/analytics/track-cta";

const ICONS: Record<ServiceIcon, LucideIcon> = {
  layers: Layers,
  rocket: Rocket,
  dashboard: LayoutDashboard,
  template: LayoutTemplate,
  gauge: Gauge,
};

export function Services() {
  return (
    <section
      id="services"
      className="container-page scroll-mt-20 border-t border-border/60 py-24 sm:py-28"
    >
      <Reveal className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-widest text-brand">
          03 · Services
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          How I can help
        </h2>
        <p className="mt-4 text-muted-foreground">
          Whether you&apos;re starting from scratch or improving something you
          already have. Not sure which fits? Get a quote and we&apos;ll figure
          it out together.
        </p>
      </Reveal>

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <Reveal as="li" key={service.title} delayMs={(i % 3) * 90}>
            <ServiceCard service={service} />
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const Icon = ICONS[service.icon];

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/5">
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-primary-foreground">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>

      <h3 className="mt-5 font-display text-xl font-semibold tracking-tight">
        {service.title}
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">
        {service.description}
      </p>

      <ul className="mt-5 space-y-2.5">
        {service.points.map((point) => (
          <li key={point} className="flex gap-2.5 text-sm">
            <Check
              className="mt-0.5 h-4 w-4 shrink-0 text-brand"
              aria-hidden="true"
            />
            <span>{point}</span>
          </li>
        ))}
      </ul>

      <TrackCta
        href={CTA.href}
        source="service_card"
        className="group/link mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-foreground transition-colors hover:text-brand"
      >
        Get a quote
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-0.5" />
      </TrackCta>
    </article>
  );
}
