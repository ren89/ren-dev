"use client";

import { useRef } from "react";
import {
  animate,
  useInView,
  useIsomorphicLayoutEffect,
  useMotionValue,
} from "framer-motion";

import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { EASE } from "@/components/motion/transitions";

/**
 * Animates a number counting up to `to` on first scroll-into-view. No
 * function props (format={(n) => ...} can't cross the RSC boundary that
 * about.tsx sits on) - prefix/suffix strings instead.
 *
 * The SSR/initial markup renders the FINAL value, never 0: correct for
 * crawlers, no-JS visitors, print before scrolling, and reduced motion.
 * useInView (not whileInView) because we need a JS boolean to kick off an
 * imperative animation, not a variant target.
 *
 * The count runs outside React render: a MotionValue writes node.textContent
 * directly via motionValue.on("change", ...), so there's no re-render per
 * frame. The reset-to-0 happens in a layout effect (useIsomorphicLayoutEffect)
 * so it never paints - a deep link landing with this already in view
 * wouldn't otherwise show a flash of "0".
 */
export function CountUp({
  to,
  prefix = "",
  suffix = "",
  className,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = usePrefersReducedMotion();
  const count = useMotionValue(to);

  useIsomorphicLayoutEffect(() => {
    const node = ref.current;
    if (!node || !isInView || reduced) return;

    count.set(0);
    node.textContent = `${prefix}0${suffix}`;

    const unsubscribe = count.on("change", (latest) => {
      node.textContent = `${prefix}${Math.round(latest)}${suffix}`;
    });
    const controls = animate(count, to, { duration: 1.2, ease: EASE.out });

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [isInView, reduced, to, prefix, suffix]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {to}
      {suffix}
    </span>
  );
}
