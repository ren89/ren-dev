import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * Project cover imagery. Uses next/image when a cover exists; otherwise
 * renders a branded gradient tile with the project's initial so cards and
 * case studies look intentional before real screenshots are added.
 * Accepts any object with a name and optional cover (Project or Playground).
 */
export function ProjectMedia({
  project,
  className,
  priority,
}: {
  project: { name: string; cover?: string };
  className?: string;
  priority?: boolean;
}) {
  if (project.cover) {
    return (
      <Image
        src={project.cover}
        alt={`${project.name} screenshot`}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        priority={priority}
        className={cn("object-cover", className)}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex size-full items-center justify-center bg-linear-to-br from-brand/15 via-background to-brand-2/15",
        className,
      )}
    >
      <div className="absolute inset-0 bg-grid opacity-40 mask-[radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <span className="relative font-display text-6xl font-bold text-gradient">
        {project.name.charAt(0)}
      </span>
    </div>
  );
}
