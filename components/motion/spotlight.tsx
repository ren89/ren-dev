"use client";

import { useEffect, useRef } from "react";

/**
 * Mouse-follow glow for cards. Rendered as a childless leaf INSIDE a Card
 * (not a wrapper around it) - a wrapper would clip the card's
 * focus-within:ring-offset-2 if given overflow-hidden, desync the card's own
 * hover:-translate-y-1 from the glow, break the h-full grid-cell chain, and
 * add an extra positioned ancestor near the after:absolute stretched links.
 * As a leaf, none of that applies: Card is already `relative`, so this only
 * needs to exist.
 *
 * The glow span itself is pointer-events-none (it must never intercept
 * clicks meant for the card's stretched link), so the pointer listener is
 * attached imperatively to the PARENT element instead of via a JSX handler
 * on this span. No framer-motion, no React state: two CSS custom properties
 * written on pointermove, CSS does the rest. A MotionValue here would be
 * strictly worse - a subscription per card for something style.setProperty
 * does for free.
 */
export function Spotlight() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const parent = ref.current?.parentElement;
    if (!parent) return;

    let frame = 0;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = parent.getBoundingClientRect();
        parent.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
        parent.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
      });
    };

    parent.addEventListener("pointermove", onMove);
    return () => {
      parent.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className="spotlight-glow pointer-events-none absolute inset-0 rounded-[inherit]"
    />
  );
}
