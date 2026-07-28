import { ArrowUpRight } from "lucide-react";

import { AVAILABILITY, SITE } from "@/lib/site";
import { cn } from "@/lib/utils";
import { badgeVariants, StatusDot, type StatusTone } from "@/components/ui/badge";

const STATUS: Record<
  typeof AVAILABILITY.status,
  { tone: StatusTone; ping: boolean }
> = {
  available: { tone: "live", ping: true },
  limited: { tone: "warn", ping: true },
  booked: { tone: "idle", ping: false },
};

/**
 * Small freelance-availability badge (pulsing dot + label). Driven by
 * AVAILABILITY in lib/site.ts. When a booking link is set and I'm available,
 * the badge becomes a "book a call" link; otherwise it is plain text. The
 * pulse stops under reduced-motion via the global guard.
 *
 * Renders the native <a>/<span> directly via badgeVariants() rather than
 * <Badge as="a">: Badge's `as` union doesn't include "a" (its call sites are
 * all tag lists/pills, never links), and wrapping an <a> inside a <div>
 * badge would shrink the click target to just the inner content instead of
 * the full pill - the same reasoning as the buttonVariants() escape hatch
 * used for the non-interactive "Private project" pill on the case study page.
 */
export function AvailabilityBadge({ className }: { className?: string }) {
  const s = STATUS[AVAILABILITY.status];
  const bookable = Boolean(SITE.booking) && AVAILABILITY.status !== "booked";

  const base = cn(
    badgeVariants({ variant: "soft", size: "lg" }),
    AVAILABILITY.status === "booked"
      ? "text-muted-foreground"
      : "text-foreground",
    bookable && "transition-colors hover:border-brand/40 hover:text-brand",
    className,
  );

  const inner = (
    <>
      <StatusDot tone={s.tone} ping={s.ping} />
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
