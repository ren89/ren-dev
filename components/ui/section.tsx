import { type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

/**
 * Shared shell for the homepage sections (Work, Playground, Services, About,
 * Process, Testimonials, Contact) - replaces the identical
 * `container-page scroll-mt-20 border-t border-border/60 py-24 sm:py-28`
 * wrapper that used to be hand-copied into every section file.
 *
 * No "use client" - and it must stay that way. SectionHeader renders Reveal
 * (a client component), but children/title/lede are already-rendered
 * elements passed as props, so nothing beneath Section crosses the RSC
 * boundary. The moment this file gains "use client", every card under every
 * section does too.
 */
const sectionVariants = cva("container-page scroll-mt-20", {
  variants: {
    spacing: {
      section: "py-24 sm:py-28",
      page: "py-16 sm:py-24",
      none: "",
    },
    divider: {
      true: "border-t border-border/60",
      false: "",
    },
  },
  defaultVariants: { spacing: "section", divider: true },
});

export function Section({
  id,
  children,
  className,
  spacing,
  divider,
}: {
  id: string;
  children: ReactNode;
  className?: string;
} & VariantProps<typeof sectionVariants>) {
  return (
    <section id={id} className={cn(sectionVariants({ spacing, divider }), className)}>
      {children}
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  index,
  title,
  lede,
  level = "h2",
  delay,
  className = "max-w-2xl",
  children,
}: {
  eyebrow: string;
  /** 1 -> renders "01 · Work"; omit for an un-numbered header (e.g. /blog). */
  index?: number;
  title: ReactNode;
  lede?: ReactNode;
  level?: "h1" | "h2";
  /** Seconds. */
  delay?: number;
  className?: string;
  children?: ReactNode;
}) {
  const Heading = level;
  const label = index ? `${String(index).padStart(2, "0")} · ${eyebrow}` : eyebrow;

  return (
    <Reveal className={className} delay={delay}>
      <p className="font-mono text-xs uppercase tracking-widest text-brand">
        {label}
      </p>
      <Heading
        className={cn(
          "mt-3 font-display font-semibold tracking-tight",
          level === "h1"
            ? "text-4xl font-bold sm:text-5xl"
            : "text-3xl sm:text-4xl",
        )}
      >
        {title}
      </Heading>
      {lede && <p className="mt-4 text-muted-foreground">{lede}</p>}
      {children}
    </Reveal>
  );
}

/**
 * Grid classes for the card lists under a SectionHeader. Not a component -
 * every such list is also a RevealList (the animated container needs to
 * render the actual `<ul>`/`<ol>` itself), so this stays a className helper
 * rather than a second wrapper element.
 */
export function sectionGrid(cols: 2 | 3, className?: string) {
  return cn(
    "mt-12 grid gap-6",
    cols === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3",
    className,
  );
}

export { sectionVariants };
