import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { getAllPosts, type Post } from "@/lib/blog";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Blog — Ren Avellano",
  description:
    "Writing on building products end to end, practical web-dev patterns, and lessons from real client work.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: "/blog",
    title: "Blog — Ren Avellano",
    description:
      "Writing on building products end to end, practical web-dev patterns, and lessons from real client work.",
  },
};

function formatDate(iso: string): string {
  if (!iso) return "";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(iso));
}

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="container-page py-16 sm:py-24">
      <Reveal className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-widest text-brand">
          Writing
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Blog
        </h1>
        <p className="mt-4 text-muted-foreground">
          Notes on building products end to end, practical patterns, and lessons
          from real client work.
        </p>
      </Reveal>

      {posts.length === 0 ? (
        <p className="mt-12 text-muted-foreground">
          No posts yet — check back soon.
        </p>
      ) : (
        <ul className="mt-12 grid gap-6 sm:grid-cols-2">
          {posts.map((post, i) => (
            <Reveal as="li" key={post.slug} delayMs={(i % 2) * 90}>
              <PostCard post={post} />
            </Reveal>
          ))}
        </ul>
      )}
    </div>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/5 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background">
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
            <li
              key={t}
              className="rounded-full border border-border bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
            >
              {t}
            </li>
          ))}
        </ul>
        <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
      </div>
    </article>
  );
}
