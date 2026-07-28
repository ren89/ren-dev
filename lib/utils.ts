import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge doesn't know about the custom duration/ease keys added in
 * tailwind.config.js (duration-hover, ease-expo, etc) - without this, e.g.
 * cn("duration-300", "duration-hover") keeps both classes instead of the
 * later one winning, and the CSS cascade decides the result unpredictably.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      duration: [
        {
          duration: [
            "micro",
            "control",
            "hover",
            "media",
            "entrance",
            "reveal",
          ],
        },
      ],
      ease: [{ ease: ["expo"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Shared date formatter for blog listings/posts. `month` defaults to the
 * short form used on the index; pass "long" for the full post header.
 */
export function formatDate(
  iso: string,
  month: "short" | "long" = "short",
): string {
  if (!iso) return "";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month,
    day: "numeric",
  }).format(new Date(iso));
}
