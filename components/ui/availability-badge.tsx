import { ArrowUpRight } from "lucide-react";

import { AVAILABILITY, SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const STATUS = {
  available: { dot: "bg-emerald-500", ping: true },
  limited: { dot: "bg-amber-500", ping: true },
  booked: { dot: "bg-muted-foreground", ping: false },
} as const;

/**
 * Small freelance-availability badge (pulsing dot + label). Driven by
 * AVAILABILITY in lib/site.ts. When a booking link is set and I'm available,
 * the badge becomes a "book a call" link; otherwise it is plain text. The
 * pulse stops under reduced-motion via the global guard.
 */
export function AvailabilityBadge({ className }: { className?: string }) {
  const s = STATUS[AVAILABILITY.status];
  const bookable = Boolean(SITE.booking) && AVAILABILITY.status !== "booked";

  const base = cn(
    "inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium backdrop-blur-sm",
    AVAILABILITY.status === "booked"
      ? "text-muted-foreground"
      : "text-foreground",
    bookable && "transition-colors hover:border-brand/40 hover:text-brand",
    className,
  );

  const inner = (
    <>
      <span className="relative flex size-2">
        {s.ping && (
          <span
            aria-hidden="true"
            className={cn(
              "absolute inline-flex size-full animate-ping rounded-full opacity-75",
              s.dot,
            )}
          />
        )}
        <span
          className={cn("relative inline-flex size-2 rounded-full", s.dot)}
        />
      </span>
      {AVAILABILITY.label}
      {bookable && <ArrowUpRight className="size-3.5" aria-hidden="true" />}
    </>
  );

  if (bookable) {
    return (
      <a
        href={SITE.booking}
        target="_blank"
        rel="noopener noreferrer"
        className={base}
      >
        {inner}
      </a>
    );
  }

  return <span className={base}>{inner}</span>;
}
