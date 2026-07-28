"use client";

import { m, useScroll } from "framer-motion";

/**
 * Replaces components/ui/reading-progress.tsx. The old version drove a
 * React re-render every animation frame while scrolling (a rAF loop calling
 * setProgress()); this binds framer's scrollYProgress directly to a style
 * MotionValue, so there's no React render at all, and where the browser
 * supports it, the update runs via native ScrollTimeline off the main
 * thread.
 *
 * scrollYProgress is bound RAW - no spring, no transition. This reports
 * position, not decorative motion, so it must stay 1:1 with scroll and
 * usable under reduced motion. That's automatic here for a reason worth
 * documenting: a MotionValue bound through `style` never passes through
 * animateMotionValue, so MotionConfig's reducedMotion="user" cannot touch
 * it even though scaleX is a "positional" key it would otherwise neutralize.
 */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <div
      className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent"
      aria-hidden="true"
    >
      <m.div
        style={{ scaleX: scrollYProgress }}
        className="h-full origin-left bg-linear-to-r from-brand to-brand-2"
      />
    </div>
  );
}
