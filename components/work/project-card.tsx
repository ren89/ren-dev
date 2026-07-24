import Link from "next/link";
import { ArrowUpRight, ExternalLink, Lock } from "lucide-react";

import type { Project } from "@/data/projects";
import { ProjectMedia } from "@/components/work/project-media";

const MAX_TAGS = 5;

export function ProjectCard({ project }: { project: Project }) {
  const tags = project.tech.slice(0, MAX_TAGS);
  const extra = project.tech.length - tags.length;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/5 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background">
      {/* Media */}
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border">
        <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
          <ProjectMedia project={project} />
        </div>
        <StatusBadge project={project} />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {project.context} · {project.year}
        </p>

        <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">
          {/* Stretched link makes the whole card open the case study,
              while the live-demo link below stays independently clickable. */}
          <Link
            href={`/work/${project.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {project.name}
          </Link>
        </h3>

        <p className="mt-2 text-sm text-muted-foreground">{project.tagline}</p>

        {/* Tech tags */}
        <ul className="mt-4 flex flex-wrap gap-2">
          {tags.map((t) => (
            <li
              key={t}
              className="rounded-full border border-border bg-secondary px-2.5 py-1 text-xs text-secondary-foreground"
            >
              {t}
            </li>
          ))}
          {extra > 0 && (
            <li className="rounded-full px-2.5 py-1 text-xs text-muted-foreground">
              +{extra} more
            </li>
          )}
        </ul>

        {/* Actions */}
        <div className="mt-6 flex items-center justify-between pt-2">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
            View case study
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>

          {project.href && (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              // z-10 lifts it above the stretched card link
              className="relative z-10 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-brand"
              aria-label={`Open ${project.name} live demo in a new tab`}
            >
              <ExternalLink className="size-4" />
              Live demo
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function StatusBadge({ project }: { project: Project }) {
  if (project.status === "private") {
    return (
      <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-background/80 px-2.5 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm">
        <Lock className="size-3" />
        Private
      </span>
    );
  }
  return (
    <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-background/80 px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
        <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
      </span>
      {project.nda ? "Live · NDA" : "Live"}
    </span>
  );
}
