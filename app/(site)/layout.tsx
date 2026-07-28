import { ReactNode } from "react";

import { SiteNav } from "@/components/layout/site-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { FloatingCta } from "@/components/layout/floating-cta";
import { CommandPalette } from "@/components/command/command-palette";
import { MotionProvider } from "@/components/motion/motion-provider";
import { getAllPosts } from "@/lib/blog";

/**
 * Layout for the portfolio site (home + case studies).
 * Owns the shared nav + footer. Routes outside this group (e.g. the
 * standalone /codeExercise demos) intentionally render without them - which
 * is also why MotionProvider is scoped here rather than the root layout.
 * MotionProvider is a client component, but `children` arrives from this
 * server layout already-rendered, so nothing below it is forced client-side.
 */
export default function SiteLayout({ children }: { children: ReactNode }) {
  const posts = getAllPosts().map((p) => ({ slug: p.slug, title: p.title }));

  return (
    <MotionProvider>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <SiteNav />
      <main id="content" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <SiteFooter />
      <FloatingCta />
      <CommandPalette posts={posts} />
    </MotionProvider>
  );
}
