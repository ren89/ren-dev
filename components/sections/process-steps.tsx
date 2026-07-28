"use client";

import { useRef, type ReactNode } from "react";
import { m, useScroll, useSpring } from "framer-motion";

import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { SPRING } from "@/components/motion/transitions";

/**
 * Owns the ref the horizontal connector line measures scroll against, and
 * draws it left-to-right as the section enters. process.tsx stays a server
 * component - the <ol> of steps is passed through as children.
 *
 * scaleX, not pathLength: the connector is a plain div (no SVG needed for a
 * straight line), and scaleX is a framer "positional" key, so
 * MotionConfig's reducedMotion="user" would neutralize it automatically -
 * pathLength is not covered by that mechanism.
 */
export function ProcessSteps({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.35"],
  });
  const scaleX = useSpring(scrollYProgress, SPRING.scrub);

  return (
    <div ref={ref} className="relative mt-14">
      {/* Horizontal connector (desktop) */}
      <m.div
        aria-hidden="true"
        style={{ scaleX: reduced ? 1 : scaleX }}
        className="absolute inset-x-0 top-5 hidden h-px origin-left bg-border md:block"
      />
      {children}
    </div>
  );
}
