import {
  education,
  experience,
  profile,
  skills,
  summary,
} from "@/data/resume";
import { getFeaturedProjects } from "@/data/projects";

const stripProto = (u: string) => u.replace(/^https?:\/\//, "");

/**
 * Employer-facing resume: single-column, semantic, text-based (ATS-friendly).
 */
export function ResumeView() {
  const projects = getFeaturedProjects();

  return (
    <div className="mx-auto max-w-3xl">
      <header>
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {profile.name}
        </h1>
        <p className="mt-1 text-lg text-muted-foreground">{profile.title}</p>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <li>{profile.location}</li>
          <li>
            <a href={`mailto:${profile.email}`} className="hover:text-brand">
              {profile.email}
            </a>
          </li>
          {profile.phone && <li>{profile.phone}</li>}
          <li>
            <a
              href={profile.website}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand"
            >
              {stripProto(profile.website)}
            </a>
          </li>
          <li>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand"
            >
              {stripProto(profile.github)}
            </a>
          </li>
        </ul>
      </header>

      <Section title="Summary">
        <p className="text-sm leading-relaxed text-foreground/90">{summary}</p>
      </Section>

      <Section title="Experience">
        <div className="space-y-6">
          {experience.map((job) => (
            <div key={`${job.company}-${job.start}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <h3 className="text-sm font-semibold">
                  {job.role}{" "}
                  <span className="font-normal text-muted-foreground">
                    · {job.company}
                  </span>
                </h3>
                <span className="font-mono text-xs text-muted-foreground">
                  {job.start} - {job.end}
                </span>
              </div>
              <ul className="mt-2 space-y-1.5">
                {job.bullets.map((b, i) => (
                  <li
                    key={i}
                    className="flex gap-2 text-sm leading-relaxed text-foreground/90"
                  >
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-brand" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Skills">
        <dl className="space-y-2">
          {skills.map((g) => (
            <div key={g.label} className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
              <dt className="w-40 shrink-0 text-sm font-medium">{g.label}</dt>
              <dd className="text-sm text-muted-foreground">
                {g.items.join(", ")}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title="Education">
        <div className="space-y-4">
          {education.map((e) => (
            <div
              key={e.institution}
              className="flex flex-wrap items-baseline justify-between gap-x-3"
            >
              <div>
                <h3 className="text-sm font-semibold">{e.credential}</h3>
                <p className="text-sm text-muted-foreground">{e.institution}</p>
              </div>
              {(e.start || e.end) && (
                <span className="font-mono text-xs text-muted-foreground">
                  {e.start} - {e.end}
                </span>
              )}
            </div>
          ))}
        </div>
      </Section>

      <Section title="Selected Projects">
        <div className="space-y-4">
          {projects.map((p) => (
            <div key={p.slug}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
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
                <span className="font-mono text-xs text-muted-foreground">
                  {p.year}
                </span>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-foreground/90">
                {p.story.result}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {p.tech.join(" · ")}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function Section({
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
