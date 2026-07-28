import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full font-medium transition-colors duration-micro",
  {
    variants: {
      variant: {
        tech: "border border-border bg-secondary font-normal text-secondary-foreground",
        overlay: "bg-background/80 text-foreground backdrop-blur-sm",
        soft: "border border-border bg-card/60 text-foreground backdrop-blur-sm",
        outline: "border border-border text-foreground",
        dashed:
          "border border-dashed border-border font-mono uppercase tracking-widest text-muted-foreground",
      },
      size: {
        xs: "px-2 py-0.5 text-[10px]",
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-1 text-xs",
        lg: "px-3 py-1 text-xs",
      },
    },
    defaultVariants: { variant: "tech", size: "md" },
  },
);

type BadgeElement = "span" | "li" | "div";

type BadgeProps = React.ComponentPropsWithoutRef<"span"> &
  VariantProps<typeof badgeVariants> & { as?: BadgeElement };

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, as: Tag = "span", ...props }, ref) => {
    const Comp = Tag as React.ElementType;
    return (
      <Comp
        ref={ref}
        className={cn(badgeVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);
Badge.displayName = "Badge";

type StatusTone = "live" | "warn" | "idle";

const TONE_DOT: Record<StatusTone, string> = {
  live: "bg-success",
  warn: "bg-warning",
  idle: "bg-muted-foreground",
};

/**
 * Two-element live-status dot (solid dot + optional ping ring). Kept
 * separate from Badge rather than folded in as a variant - it's a distinct
 * two-node structure with its own `ping` axis, not a single-element style.
 */
function StatusDot({
  tone = "live",
  ping = true,
  className,
}: {
  tone?: StatusTone;
  ping?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("relative flex size-2", className)}>
      {ping && (
        <span
          aria-hidden="true"
          className={cn(
            "absolute inline-flex size-full animate-ping rounded-full opacity-75",
            TONE_DOT[tone],
          )}
        />
      )}
      <span
        className={cn("relative inline-flex size-2 rounded-full", TONE_DOT[tone])}
      />
    </span>
  );
}

export { Badge, StatusDot, badgeVariants };
export type { StatusTone };
