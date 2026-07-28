import Link from "next/link";
import { ArrowUpRight, Archive } from "lucide-react";

import type { PlaygroundProject } from "@/data/projects";
import { ProjectMedia } from "@/components/work/project-media";
import { Card, CardMedia } from "@/components/ui/card";
import { Badge, StatusDot } from "@/components/ui/badge";
import { Spotlight } from "@/components/motion/spotlight";
import { cn } from "@/lib/utils";

const MAX_TAGS = 4;

export function PlaygroundCard({ project }: { project: PlaygroundProject }) {
  const tags = project.tech.slice(0, MAX_TAGS);
  const isLive = project.status === "live" && Boolean(project.href);
  const external = project.href?.startsWith("http");

  return (
    <Card
      as="article"
      variant={isLive ? "interactive" : "surface"}
      padding="none"
      radius="md"
      focusRing
      className="group overflow-hidden"
    >
      {isLive && <Spotlight />}
      <CardMedia
        zoom={isLive}
        className={cn(!isLive && "opacity-70 saturate-[0.6]")}
      >
        <ProjectMedia project={project} />
      </CardMedia>
      <Badge
        variant="overlay"
        size="md"
        className={cn(
          "absolute left-3 top-3",
          !isLive && "text-muted-foreground",
        )}
      >
        {isLive ? (
          <>
            <StatusDot tone="live" ping={false} />
            Live
          </>
        ) : (
          <>
            <Archive className="size-3" />
            Archived
          </>
        )}
      </Badge>

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
            <Badge as="li" key={t} size="sm">
              {t}
            </Badge>
          ))}
        </ul>

        {isLive && (
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand">
            View demo
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        )}
      </div>
    </Card>
  );
}
