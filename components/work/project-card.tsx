import Link from "next/link";
import { ArrowUpRight, ExternalLink, Lock } from "lucide-react";

import type { Project } from "@/data/projects";
import { ProjectMedia } from "@/components/work/project-media";
import { Card, CardMedia } from "@/components/ui/card";
import { Badge, StatusDot } from "@/components/ui/badge";
import { Spotlight } from "@/components/motion/spotlight";

const MAX_TAGS = 5;

export function ProjectCard({ project }: { project: Project }) {
  const tags = project.tech.slice(0, MAX_TAGS);
  const extra = project.tech.length - tags.length;

  return (
    <Card
      as="article"
      variant="interactive"
      padding="none"
      radius="lg"
      focusRing
      className="group overflow-hidden"
    >
      <Spotlight />

      {/* Media */}
      <CardMedia zoom parallax>
        <ProjectMedia project={project} />
      </CardMedia>
      <StatusBadge project={project} />

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
            <Badge as="li" key={t}>
              {t}
            </Badge>
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
    </Card>
  );
}

function StatusBadge({ project }: { project: Project }) {
  if (project.status === "private") {
    return (
      <Badge
        variant="overlay"
        size="md"
        className="absolute left-4 top-4 text-muted-foreground"
      >
        <Lock className="size-3" />
        Private
      </Badge>
    );
  }
  return (
    <Badge variant="overlay" size="md" className="absolute left-4 top-4">
      <StatusDot tone="live" />
      {project.nda ? "Live · NDA" : "Live"}
    </Badge>
  );
}
