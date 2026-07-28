"use client";

import { Children, type ReactNode } from "react";
import { m } from "framer-motion";

import { cn } from "@/lib/utils";
import { VIEWPORT, listStagger } from "@/components/motion/transitions";
import { fadeUpVariants, listVariants } from "@/components/motion/variants";

/**
 * Replaces the old components/ui/reveal.tsx. Split into three pieces
 * instead of one polymorphic component: it drops the old @ts-expect-error
 * on the ref type for the common cases, and makes stagger a parent concern
 * (RevealList) instead of a per-item delayMs prop the caller had to compute.
 *
 * All three use whileInView + the shared VIEWPORT constant rather than
 * useInView: framer-motion pools IntersectionObservers by
 * JSON.stringify({rootMargin, threshold}), so every Reveal/RevealList on the
 * page collapses onto ONE observer instead of one per instance (the old
 * Reveal created a new IntersectionObserver per mount). whileInView also
 * mutates the visual element directly with no React re-render, whereas the
 * old implementation called setShown(true) - a render per revealed element.
 *
 * The hidden `initial` state ships in the SSR HTML as an inline style, which
 * neither the print stylesheet nor the reduced-motion CSS guard can reach
 * (they only affect animations/transitions, not computed styles) - both are
 * covered instead via the data-motion attribute + globals.css rules.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  /** Seconds. For one-off pairs; lists should use RevealList/RevealItem. */
  delay?: number;
}) {
  return (
    <m.div
      data-motion=""
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={fadeUpVariants}
      transition={{ delay }}
    >
      {children}
    </m.div>
  );
}

/**
 * Staggering container for a grid/list. Children must be RevealItem. Derives
 * its stagger step from the child count so the total cascade stays bounded
 * (see listStagger) - the old call sites used `i * 90ms` (unbounded, grows
 * with data) or `(i % cols) * 90ms` (resets oddly at row breaks).
 */
export function RevealList({
  children,
  className,
  as = "ul",
  stagger,
}: {
  children: ReactNode;
  className?: string;
  as?: "ul" | "ol";
  /** Override the count-derived stagger, in seconds. */
  stagger?: number;
}) {
  const count = Children.count(children);
  const staggerDelay = stagger ?? listStagger(count);
  // m[as] is a union of motion components; every member here accepts the
  // props passed below, so narrow to one concrete member instead of
  // suppressing the JSX union error with @ts-expect-error.
  const Tag = m[as] as typeof m.ul;

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={listVariants(staggerDelay)}
    >
      {children}
    </Tag>
  );
}

/** A list cell. Inherits its trigger + stagger delay from RevealList. */
export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <m.li data-motion="" className={className} variants={fadeUpVariants}>
      {children}
    </m.li>
  );
}
