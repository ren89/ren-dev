import { ImageResponse } from "next/og";

import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { OgCard, OG_SIZE } from "@/lib/og-template";

export const alt = "Blog — Ren Avellano";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return new ImageResponse(
    (
      <OgCard
        eyebrow="Blog"
        title={post?.title ?? "Blog"}
        subtitle={post?.description}
      />
    ),
    { ...OG_SIZE },
  );
}
