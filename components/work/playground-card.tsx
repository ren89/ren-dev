import Link from "next/link";
import { ArrowUpRight, Archive } from "lucide-react";

import type { PlaygroundProject } from "@/data/projects";
import { ProjectMedia } from "@/components/work/project-media";
import { cn } from "@/lib/utils";

const MAX_TAGS = 4;

export function PlaygroundCard({ project }: { project: PlaygroundProject }) {
  const tags = project.tech.slice(0, MAX_TAGS);
  const isLive = project.status === "live" && Boolean(project.href);
  const external = project.href?.startsWith("http");

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background",
        isLive &&
          "hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg hover:shadow-brand/5",
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border">
        <div
          className={cn(
            "absolute inset-0 transition-transform duration-500",
            isLive && "group-hover:scale-105",
            !isLive && "opacity-70 saturate-[0.6]",
          )}
        >
          <ProjectMedia project={project} />
        </div>
        <span
          className={cn(
            "absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-background/80 px-2.5 py-1 text-xs font-medium backdrop-blur-sm",
            isLive ? "text-foreground" : "text-muted-foreground",
          )}
        >
          {isLive ? (
            <>
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Live
            </>
          ) : (
            <>
              <Archive className="h-3 w-3" />
              Archived
            </>
          )}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold tracking-tight">
          {isLive ? (
            <Link
              href={project.href!}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
            >
              {project.name}
            </Link>
          ) : (
            project.name
          )}
        </h3>

        <p className="mt-1.5 text-sm text-muted-foreground">
          {project.tagline}
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <li
              key={t}
              className="rounded-full border border-border bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
            >
              {t}
            </li>
          ))}
        </ul>

        {isLive && (
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand">
            View demo
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        )}
      </div>
    </article>
  );
}
