"use client";

import { useRef, type ReactNode } from "react";
import { m, useScroll, useTransform, type MotionValue } from "framer-motion";

import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { useMediaQuery } from "@/lib/use-media-query";

/**
 * Page-scroll-driven parallax value - for background decoration that spans
 * the viewport (the hero aurora blobs), where one shared scroll subscription
 * is cheaper than measuring N individual elements. `disableBelowMd` zeroes
 * the range on small screens: a blurred, GPU-transformed layer costs more
 * relative to how small the effect reads on a phone.
 */
export function usePageParallax(
  range: [number, number],
  { disableBelowMd = false }: { disableBelowMd?: boolean } = {},
): MotionValue<number> {
  const reduced = usePrefersReducedMotion();
  const isMd = useMediaQuery("(min-width: 768px)");
  const { scrollY } = useScroll();
  const active = !reduced && (!disableBelowMd || isMd);
  return useTransform(scrollY, [0, 800], active ? range : [0, 0]);
}

/**
 * Drifts children as THEY cross the viewport - for in-flow content like a
 * card's media (as opposed to usePageParallax, which is scoped to the whole
 * page). `distance` is total px of travel; kept small so no gap opens at
 * the edges of the media's overflow-hidden frame.
 */
export function ParallaxLayer({
  children,
  distance = 24,
  className,
}: {
  children: ReactNode;
  distance?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [0, 0] : [-distance, distance],
  );

  return (
    <m.div ref={ref} style={{ y }} className={className}>
      {children}
    </m.div>
  );
}
