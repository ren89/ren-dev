"use client";

import { useSyncExternalStore } from "react";

/**
 * Generic matchMedia hook, same useSyncExternalStore shape as
 * use-prefers-reduced-motion.ts (live updates, no hydration mismatch).
 * Used to gate the hero aurora's scroll parallax below the `md` breakpoint,
 * where a blurred, transformed layer is a bigger GPU cost relative to how
 * small the effect reads on a phone screen.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
