import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Lock } from "lucide-react";

import {
  getProjectBySlug,
  getProjectSlugs,
  type Project,
} from "@/data/projects";
import { ProjectMedia } from "@/components/work/project-media";
import { TrackCta } from "@/components/analytics/track-cta";

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Work · Ren Avellano" };
  return {
    title: `${project.name} · Case study - Ren Avellano`,
    description: project.tagline,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      url: `/work/${project.slug}`,
      title: `${project.name} · Case study`,
      description: project.tagline,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} · Case study`,
      description: project.tagline,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article className="container-page py-16 sm:py-24">
      <Link
        href="/#work"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to work
      </Link>

      {/* Header */}
      <header className="mt-8 max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-widest text-brand">
          {project.context} · {project.year}
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          {project.name}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">{project.tagline}</p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {project.href ? (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Visit live site
              <ExternalLink className="size-4" />
            </a>
          ) : (
            <span className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border px-6 text-sm text-muted-foreground">
              <Lock className="size-4" />
              Private project
            </span>
          )}
          {project.nda && (
            <span className="text-xs text-muted-foreground">
              Some details are limited under NDA.
            </span>
          )}
        </div>

        {/* Tech */}
        <ul className="mt-6 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <li
              key={t}
              className="rounded-full border border-border bg-secondary px-2.5 py-1 text-xs text-secondary-foreground"
            >
              {t}
            </li>
          ))}
        </ul>
      </header>

      {/* Media */}
      <div className="relative mt-12 aspect-[16/9] overflow-hidden rounded-2xl border border-border">
        <ProjectMedia project={project} priority />
      </div>

      {/* Story */}
      <div className="mt-16 grid gap-12 lg:grid-cols-[2fr_1fr]">
        <div className="max-w-2xl space-y-12">
          <Block label="Overview">
            <p>{project.story.summary}</p>
          </Block>
          <Block label="The problem">
            <p>{project.story.problem}</p>
          </Block>
          <Block label="My role">
            <p>{project.story.role}</p>
          </Block>
          <Block label="Key decisions">
            <BulletList items={project.story.decisions} />
          </Block>
          <Block label="Challenges">
            <BulletList items={project.story.challenges} />
          </Block>
        </div>

        {/* Result - highlighted aside */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-brand/30 bg-accent/40 p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-brand">
              Result
            </p>
            <p className="mt-3 text-foreground">{project.story.result}</p>
          </div>
        </aside>
      </div>

      {/* Gallery (only if real images are added) */}
      {project.gallery && project.gallery.length > 0 && (
        <Gallery project={project} />
      )}

      {/* CTA */}
      <div className="mt-20 rounded-2xl border border-border bg-card p-8 text-center sm:p-12">
        <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          Have a project like this?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          I build products end to end. Tell me what you&apos;re planning and
          let&apos;s see if I can help.
        </p>
        <TrackCta
          href="/#contact"
          source="case_study"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-primary px-7 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Let&apos;s talk
        </TrackCta>
      </div>
    </article>
  );
}

function Block({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </h2>
      <div className="mt-3 leading-relaxed text-foreground/90">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span
            aria-hidden="true"
            className="mt-2 size-1.5 shrink-0 rounded-full bg-brand"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Gallery({ project }: { project: Project }) {
  return (
    <div className="mt-16">
      <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        Gallery
      </h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {project.gallery!.map((img) => (
          <div
            key={img.src}
            className="relative aspect-video overflow-hidden rounded-xl border border-border"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              loading="lazy"
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
