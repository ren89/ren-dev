import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { getAllPosts, type Post } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import { RevealItem, RevealList } from "@/components/motion/reveal";
import { Section, SectionHeader } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Spotlight } from "@/components/motion/spotlight";

export const metadata: Metadata = {
  title: "Blog - Ren Avellano",
  description:
    "Writing on building products end to end, practical web-dev patterns, and lessons from real client work.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: "/blog",
    title: "Blog - Ren Avellano",
    description:
      "Writing on building products end to end, practical web-dev patterns, and lessons from real client work.",
  },
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <Section id="blog" spacing="page" divider={false}>
      <SectionHeader
        eyebrow="Writing"
        level="h1"
        title="Blog"
        lede="Notes on building products end to end, practical patterns, and lessons from real client work."
      />

      {posts.length === 0 ? (
        <p className="mt-12 text-muted-foreground">
          No posts yet - check back soon.
        </p>
      ) : (
        <RevealList as="ul" className="mt-12 grid gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <RevealItem key={post.slug}>
              <PostCard post={post} />
            </RevealItem>
          ))}
        </RevealList>
      )}
    </Section>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <Card as="article" variant="interactive" focusRing className="group h-full">
      <Spotlight />
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {formatDate(post.date)} · {post.readingTime}
      </p>

      <h2 className="mt-3 font-display text-xl font-semibold tracking-tight">
        <Link
          href={`/blog/${post.slug}`}
          className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
        >
          {post.title}
        </Link>
      </h2>

      <p className="mt-2 flex-1 text-sm text-muted-foreground">
        {post.description}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <ul className="flex flex-wrap gap-1.5">
          {post.tags.slice(0, 3).map((t) => (
            <Badge as="li" key={t} size="sm">
              {t}
            </Badge>
          ))}
        </ul>
        <ArrowUpRight className="size-4 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
      </div>
    </Card>
  );
}
