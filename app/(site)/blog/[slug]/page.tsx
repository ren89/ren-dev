import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";

import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { SITE } from "@/lib/site";
import { TrackCta } from "@/components/analytics/track-cta";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post not found — Ren Avellano" };
  return {
    title: `${post.title} — Ren Avellano`,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url: `/blog/${post.slug}`,
      title: post.title,
      description: post.description,
      publishedTime: post.date || undefined,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

const prettyCodeOptions: Options = {
  theme: { dark: "github-dark-dimmed", light: "github-light" },
  keepBackground: true,
};

function formatDate(iso: string): string {
  if (!iso) return "";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(iso));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date || undefined,
    keywords: post.tags.join(", "),
    url: `${SITE.url}/blog/${post.slug}`,
    author: { "@type": "Person", name: SITE.fullName, url: SITE.url },
  };

  return (
    <article className="container-page py-16 sm:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to blog
      </Link>

      <header className="mt-8 max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-widest text-brand">
          {formatDate(post.date)} · {post.readingTime}
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          {post.title}
        </h1>
        {post.description && (
          <p className="mt-4 text-lg text-muted-foreground">
            {post.description}
          </p>
        )}
        {post.tags.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <li
                key={t}
                className="rounded-full border border-border bg-secondary px-2.5 py-1 text-xs text-secondary-foreground"
              >
                {t}
              </li>
            ))}
          </ul>
        )}
      </header>

      <div className="mt-12 max-w-2xl">
        <div className="prose prose-neutral max-w-none dark:prose-invert prose-headings:font-display prose-headings:tracking-tight prose-a:text-brand prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl">
          <MDXRemote
            source={post.content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
              },
            }}
          />
        </div>
      </div>

      {/* CTA */}
      <div className="mt-16 max-w-2xl rounded-2xl border border-border bg-card p-8 text-center">
        <h2 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
          Working on something similar?
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          I build web apps end to end. Tell me about your project.
        </p>
        <TrackCta
          href="/#contact"
          source="blog_post"
          className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Let&apos;s talk
        </TrackCta>
      </div>
    </article>
  );
}
