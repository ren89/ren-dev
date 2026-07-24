import { ReactNode } from "react";

import { SiteNav } from "@/components/layout/site-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { FloatingCta } from "@/components/layout/floating-cta";
import { CommandPalette } from "@/components/command/command-palette";
import { getAllPosts } from "@/lib/blog";

/**
 * Layout for the portfolio site (home + case studies).
 * Owns the shared nav + footer. Routes outside this group (e.g. the
 * standalone /codeExercise demos) intentionally render without them.
 */
export default function SiteLayout({ children }: { children: ReactNode }) {
  const posts = getAllPosts().map((p) => ({ slug: p.slug, title: p.title }));

  return (
    <>
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <SiteNav />
      {children}
      <SiteFooter />
      <FloatingCta />
      <CommandPalette posts={posts} />
    </>
  );
}
