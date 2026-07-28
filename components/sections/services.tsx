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
import { CTA, SECTIONS } from "@/lib/site";
import { RevealItem, RevealList } from "@/components/motion/reveal";
import { Section, SectionHeader, sectionGrid } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/motion/spotlight";
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
    <Section id="services">
      <SectionHeader
        {...SECTIONS.services}
        title="How I can help"
        lede="Whether you're starting from scratch or improving something you already have. Not sure which fits? Get a quote and we'll figure it out together."
      />
      <RevealList as="ul" className={sectionGrid(3)}>
        {services.map((service) => (
          <RevealItem key={service.title}>
            <ServiceCard service={service} />
          </RevealItem>
        ))}
      </RevealList>
    </Section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const Icon = ICONS[service.icon];

  return (
    <Card as="article" variant="interactive" className="group h-full">
      <Spotlight />
      <span className="inline-flex size-11 items-center justify-center rounded-xl bg-accent text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-primary-foreground">
        <Icon className="size-5" aria-hidden="true" />
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
              className="mt-0.5 size-4 shrink-0 text-brand"
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
        <ArrowRight className="size-4 transition-transform duration-300 group-hover/link:translate-x-0.5" />
      </TrackCta>
    </Card>
  );
}
