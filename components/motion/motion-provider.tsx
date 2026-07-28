"use client";

import { type ReactNode } from "react";
import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";

import { TRANSITION } from "@/components/motion/transitions";

/**
 * Mounted once in app/(site)/layout.tsx - NOT the root layout, so the
 * /codeExercise demos (outside the (site) group) ship zero motion runtime.
 *
 * `features={domAnimation}` (not domMax) intentionally excludes layoutId:
 * domMax costs +13.3 KB gzipped more, and the only place layoutId would help
 * (the nav active-underline) is built instead with a measured, animated
 * span - see components/layout/site-nav.tsx. Features are loaded
 * synchronously, not via the async `features={() => import(...)}` form,
 * because `initial` styles apply before the feature bundle loads; deferring
 * it would flash whileInView content at opacity 0 across the whole page.
 *
 * `strict` makes any accidental `motion.*` (instead of `m.*`) throw at
 * runtime, which is what keeps future code on the smaller bundle.
 *
 * `reducedMotion="user"` only neutralizes transform/box "positional" keys
 * (x, y, width, height, scale, rotate, ...) - opacity, filter, and color
 * still animate at full duration. That's the correct WCAG outcome (fades
 * aren't a vestibular trigger; motion is), but it IS a behavior change from
 * the old global CSS guard, which collapsed everything to ~0ms. It also
 * only resolves once, at each component's mount - a mid-session OS toggle
 * won't retroactively change an already-mounted animation. Anything that
 * needs to react live to the OS setting mid-session (scroll-linked
 * parallax, count-up) uses lib/use-prefers-reduced-motion.ts instead.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user" transition={TRANSITION.default}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
