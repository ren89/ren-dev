"use client";

import { useEffect, useState } from "react";

/**
 * Thin brand-gradient bar pinned at the top that fills with scroll progress.
 * Reflects position (not decorative motion), so it stays useful under
 * reduced-motion; no transition is applied.
 */
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = document.documentElement;
      const scrollable = el.scrollHeight - el.clientHeight;
      setProgress(scrollable > 0 ? Math.min(1, el.scrollTop / scrollable) : 0);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent"
      aria-hidden="true"
    >
      <div
        className="h-full origin-left bg-linear-to-r from-brand to-brand-2"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
