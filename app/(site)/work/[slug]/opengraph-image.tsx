import { ImageResponse } from "next/og";

import { getProjectBySlug, getProjectSlugs } from "@/data/projects";
import { OgCard, OG_SIZE } from "@/lib/og-template";

export const alt = "Case study — Ren Avellano";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  return new ImageResponse(
    (
      <OgCard
        eyebrow={project ? `${project.context} · ${project.year}` : "Case study"}
        title={project?.name ?? "Case study"}
        subtitle={project?.tagline}
      />
    ),
    { ...OG_SIZE },
  );
}
