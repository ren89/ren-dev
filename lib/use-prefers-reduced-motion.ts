"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

/**
 * Live prefers-reduced-motion check. Unlike framer-motion's own
 * useReducedMotion() (which reads once at mount and never updates - see its
 * literal `// TODO` comment in motion-dom), this responds to the OS setting
 * changing mid-session, and uses useSyncExternalStore so the server snapshot
 * ("motion on") matches the initial client render with no hydration warning.
 *
 * Use this for anything MotionConfig's reducedMotion="user" can't reach:
 * useTransform output bound via style, or animate() on a raw MotionValue.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
