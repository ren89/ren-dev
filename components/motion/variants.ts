import { TRANSITION } from "@/components/motion/transitions";

/**
 * Shared framer-motion variants. No "use client" - plain data.
 */

export const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: TRANSITION.reveal },
};

/** Parent list container: fans stagger out to its RevealItem children. */
export function listVariants(staggerDelay: number) {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: staggerDelay },
    },
  };
}
