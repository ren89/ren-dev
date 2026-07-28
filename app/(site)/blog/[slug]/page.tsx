import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";

import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { SITE } from "@/lib/site";
import { formatDate } from "@/lib/utils";
import { TrackCta } from "@/components/analytics/track-cta";
import { ScrollProgressBar } from "@/components/motion/scroll-progress-bar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
  if (!post) return { title: "Post not found - Ren Avellano" };
  return {
    title: `${post.title} - Ren Avellano`,
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
      <ScrollProgressBar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
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
              <Badge as="li" key={t}>
                {t}
              </Badge>
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
      <Card variant="panel" padding="lg" className="mt-16 max-w-2xl">
        <h2 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
          Working on something similar?
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          I build web apps end to end. Tell me about your project.
        </p>
        <Button asChild size="md" shape="pill" className="mt-5">
          <TrackCta href="/#contact" source="blog_post">
            Let&apos;s talk
          </TrackCta>
        </Button>
      </Card>
    </article>
  );
}
