import { profile, summary } from "@/data/resume";
import { getFeaturedProjects } from "@/data/projects";
import { services } from "@/data/services";
import {
  clientLogos,
  SHOW_TESTIMONIALS,
  testimonials,
} from "@/data/testimonials";
import { CTA, SITE } from "@/lib/site";
import { AvailabilityBadge } from "@/components/ui/availability-badge";
import { TrackCta } from "@/components/analytics/track-cta";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

/**
 * Client-facing profile: what I do, results, social proof, and a contact CTA.
 * Only real (non-placeholder) testimonials are shown.
 */
export function ClientProfileView() {
  const projects = getFeaturedProjects();
  const realTestimonials = SHOW_TESTIMONIALS
    ? testimonials.filter((t) => !t.placeholder)
    : [];

  return (
    <div className="mx-auto max-w-3xl">
      <header>
        <AvailabilityBadge />
        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {profile.name}
        </h1>
        <p className="mt-1 text-lg text-muted-foreground">{profile.title}</p>
        <p className="mt-4 leading-relaxed text-foreground/90">{summary}</p>
      </header>

      <ProfileSection title="What I do">
        <ul className="space-y-4">
          {services.map((s) => (
            <li key={s.title}>
              <h3 className="text-sm font-semibold">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.description}</p>
            </li>
          ))}
        </ul>
      </ProfileSection>

      <ProfileSection title="Selected work">
        <div className="space-y-5">
          {projects.map((p) => (
            <div key={p.slug}>
              <h3 className="text-sm font-semibold">
                {p.href ? (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand"
                  >
                    {p.name}
                  </a>
                ) : (
                  p.name
                )}
                <span className="font-normal text-muted-foreground">
                  {" "}
                  · {p.context}
                </span>
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>
              <p className="mt-1 text-sm leading-relaxed text-foreground/90">
                <span className="font-medium text-brand">Result: </span>
                {p.story.result}
              </p>
            </div>
          ))}
        </div>
      </ProfileSection>

      <ProfileSection title="Worked with">
        <ul className="flex flex-wrap gap-x-8 gap-y-3">
          {clientLogos.map((c) => (
            <li
              key={c.name}
              className="font-display text-sm font-semibold text-muted-foreground"
            >
              {c.name}
            </li>
          ))}
        </ul>
        {realTestimonials.length > 0 && (
          <div className="mt-6 space-y-4">
            {realTestimonials.map((t, i) => (
              <blockquote
                key={i}
                className="border-l-2 border-brand/40 pl-4 text-sm leading-relaxed text-foreground/90"
              >
                &ldquo;{t.quote}&rdquo;
                <footer className="mt-1 text-xs text-muted-foreground">
                  {t.name}, {t.role} · {t.company}
                </footer>
              </blockquote>
            ))}
          </div>
        )}
      </ProfileSection>

      <Card as="section" variant="panel" className="mt-10 print:hidden">
        <h2 className="font-display text-xl font-semibold tracking-tight">
          Let&apos;s build something
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Tell me about your project.
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="md" shape="pill">
            <TrackCta href="/#contact" source="resume_profile">
              {CTA.label}
            </TrackCta>
          </Button>
          {SITE.booking && (
            <Button asChild variant="outline" size="md" shape="pill">
              <TrackCta
                href={SITE.booking}
                source="book_call"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a call
              </TrackCta>
            </Button>
          )}
          <a
            href={`mailto:${SITE.email}`}
            className="text-sm text-muted-foreground transition-colors hover:text-brand"
          >
            {SITE.email}
          </a>
        </div>
      </Card>
    </div>
  );
}

function ProfileSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-8 border-t border-border/60 pt-6">
      <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-brand">
        {title}
      </h2>
      {children}
    </section>
  );
}
