/**
 * Motion tokens for framer-motion. Mirrors the CSS custom properties in
 * styles/globals.css (--dur-*, --ease-expo, --stagger) - framer needs
 * seconds as numbers and easing as a tuple, which a CSS var can't supply,
 * so this duplication is structural, not accidental. Keep both in sync:
 * DURATION.hover * 1000 === --dur-hover, and so on.
 *
 * No "use client" - this is plain data, importable from server or client.
 */

export const DURATION = {
  micro: 0.2,
  control: 0.28,
  hover: 0.3,
  media: 0.5,
  entrance: 0.6,
  reveal: 0.7,
} as const;

/** Same curve as tailwind.config.js `fade-up` / `page-in` (--ease-expo). */
export const EASE = {
  // NOT `as const` - framer-motion's Easing type rejects readonly tuples.
  out: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

export const TRANSITION = {
  default: { duration: DURATION.entrance, ease: EASE.out },
  reveal: { duration: DURATION.reveal, ease: EASE.out },
} as const;

export const SPRING = {
  /** Nav underline - critically damped, no overshoot past the next item. */
  underline: { type: "spring", stiffness: 380, damping: 34, mass: 0.7 } as const,
  /** Scroll-linked smoothing (process line-draw). */
  scrub: { stiffness: 120, damping: 26, restDelta: 0.001 } as const,
};

/**
 * Shared viewport options for every whileInView usage. framer-motion pools
 * IntersectionObservers by JSON.stringify({rootMargin, threshold}) - using
 * one frozen constant everywhere collapses what would be N observers into 1.
 * Values match the numbers the old components/ui/reveal.tsx used, so the
 * scroll trigger point doesn't shift.
 */
export const VIEWPORT = {
  once: true,
  amount: 0.15,
  margin: "0px 0px -10% 0px",
} as const;

const STAGGER_STEP = 0.06;
const STAGGER_TOTAL_MAX = 0.42;

/**
 * Per-child stagger delay that keeps the *total* cascade bounded rather than
 * the *step* fixed. The old Reveal call sites used `i * 90ms` (unbounded -
 * degrades as data grows) or `(i % cols) * 90ms` (resets oddly at row
 * breaks). This scales the step down so a 12-item grid still finishes within
 * STAGGER_TOTAL_MAX seconds.
 */
export function listStagger(count: number): number {
  if (count <= 1) return 0;
  return Math.min(STAGGER_STEP, STAGGER_TOTAL_MAX / (count - 1));
}
