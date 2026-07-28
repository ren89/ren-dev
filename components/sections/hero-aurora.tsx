"use client";

import { m } from "framer-motion";

import { usePageParallax } from "@/components/motion/parallax";

/**
 * Decorative background: three blurred brand-color blobs that drift slowly
 * (CSS animate-blob, unchanged) plus a subtle scroll-linked parallax drift
 * per blob for depth. Pointer-events-none and aria-hidden so it never
 * interferes with content or assistive tech.
 *
 * "use client" only for this decorative piece - hero.tsx itself stays a
 * server component; see hero.tsx and hero-headline.tsx for why the headline
 * is deliberately NOT framer-motion.
 *
 * Each blob is a motion.div (parallax `y`) wrapping a plain div (CSS
 * animate-blob): a CSS animation and framer's inline `transform` on the
 * SAME element would collide - the CSS animation's `transform` wins at the
 * animation origin and silently overrides framer's. Nesting keeps both.
 */
export function HeroAurora() {
  const y1 = usePageParallax([-10, 10], { disableBelowMd: true });
  const y2 = usePageParallax([-18, 18], { disableBelowMd: true });
  const y3 = usePageParallax([-8, 8], { disableBelowMd: true });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 mask-[linear-gradient(to_bottom,black_50%,transparent_92%)]"
    >
      {/* Faint grid, masked to fade at the edges */}
      <div className="absolute inset-0 bg-grid opacity-[0.5] mask-[radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      {/* Drifting glow blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <m.div className="absolute -left-24 -top-16" style={{ y: y1 }}>
          <div className="size-72 animate-blob rounded-full bg-brand/30 blur-3xl sm:size-96 dark:bg-brand/40" />
        </m.div>
        <m.div className="absolute right-[-6rem] top-10" style={{ y: y2 }}>
          <div className="size-72 animate-blob rounded-full bg-brand-2/25 blur-3xl [animation-delay:-6s] sm:size-96 dark:bg-brand-2/35" />
        </m.div>
        <m.div className="absolute bottom-[-6rem] left-1/3" style={{ y: y3 }}>
          <div className="size-72 animate-blob rounded-full bg-brand-3/20 blur-3xl [animation-delay:-12s] sm:size-96 dark:bg-brand-3/25" />
        </m.div>
      </div>
    </div>
  );
}
