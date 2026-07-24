import { AVAILABILITY } from "@/lib/site";
import { cn } from "@/lib/utils";

const STATUS = {
  available: { dot: "bg-emerald-500", ping: true },
  limited: { dot: "bg-amber-500", ping: true },
  booked: { dot: "bg-muted-foreground", ping: false },
} as const;

/**
 * Small freelance-availability badge (pulsing dot + label). Driven by
 * AVAILABILITY in lib/site.ts. The pulse stops under reduced-motion via the
 * global guard. Works in both server and client trees.
 */
export function AvailabilityBadge({ className }: { className?: string }) {
  const s = STATUS[AVAILABILITY.status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium backdrop-blur-sm",
        AVAILABILITY.status === "booked"
          ? "text-muted-foreground"
          : "text-foreground",
        className,
      )}
    >
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
    </span>
  );
}
