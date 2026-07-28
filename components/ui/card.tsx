import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { ParallaxLayer } from "@/components/motion/parallax";

/**
 * Intentionally divergent from shadcn's `card` (no CardHeader/CardTitle/
 * CardContent/CardFooter slots) - do not `npx shadcn add card` over this
 * file. The five card shapes in this app (media-topped article, icon-topped
 * article, quote figure, text-only article, centered CTA panel) don't share
 * a header/body/footer structure, so a slot API would buy nothing.
 */
const cardVariants = cva(
  "relative flex flex-col border transition-[transform,border-color,box-shadow,background-color] duration-hover ease-expo",
  {
    variants: {
      variant: {
        surface: "border-border bg-card",
        interactive:
          "border-border bg-card hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/5",
        panel: "border-border bg-card text-center",
        highlight: "border-brand/30 bg-accent/40",
      },
      padding: {
        none: "",
        sm: "p-5",
        md: "p-6",
        lg: "p-8",
        xl: "p-8 sm:p-12",
      },
      radius: {
        md: "rounded-xl",
        lg: "rounded-2xl",
      },
      focusRing: {
        true: "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background",
        false: "",
      },
    },
    defaultVariants: {
      variant: "surface",
      padding: "md",
      radius: "lg",
      focusRing: false,
    },
  },
);

type CardElement = "div" | "article" | "figure" | "section" | "li";

type CardProps = React.ComponentPropsWithoutRef<"div"> &
  VariantProps<typeof cardVariants> & { as?: CardElement };

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { className, variant, padding, radius, focusRing, as: Tag = "div", ...props },
    ref,
  ) => {
    const Comp = Tag as React.ElementType;
    return (
      <Comp
        ref={ref}
        className={cn(cardVariants({ variant, padding, radius, focusRing, className }))}
        {...props}
      />
    );
  },
);
Card.displayName = "Card";

/**
 * Shared media frame for the two card types with a cover image (project,
 * playground): the aspect-ratio crop plus the inner scale-on-hover wrapper.
 * `className` targets the inner wrapper - e.g. the playground archived-tile
 * desaturation (`opacity-70 saturate-[0.6]`).
 *
 * `parallax` nests the zoom wrapper inside a ParallaxLayer instead of a
 * plain div - a CSS `transition-transform` and framer's inline `transform`
 * can't coexist on the SAME element (the CSS one wins at its animation
 * origin and silently overrides framer's), so parallax gets its own
 * wrapper layer around the existing hover-scale div rather than merging
 * into it. This stays server-safe: CardMedia itself has no "use client",
 * it just renders a client component (ParallaxLayer) - the project/
 * playground card files that call it never cross the RSC boundary.
 */
function CardMedia({
  children,
  aspect = "16/10",
  zoom = false,
  parallax = false,
  className,
}: {
  children: React.ReactNode;
  aspect?: "16/10" | "16/9";
  zoom?: boolean;
  parallax?: boolean;
  className?: string;
}) {
  const inner = (
    <div
      className={cn(
        "size-full transition-transform duration-media",
        zoom && "group-hover:scale-105",
        className,
      )}
    >
      {children}
    </div>
  );

  return (
    <div
      className={cn(
        "relative overflow-hidden border-b border-border",
        aspect === "16/10" ? "aspect-[16/10]" : "aspect-[16/9]",
      )}
    >
      {parallax ? (
        <ParallaxLayer className="absolute inset-0" distance={24}>
          {inner}
        </ParallaxLayer>
      ) : (
        <div className="absolute inset-0">{inner}</div>
      )}
    </div>
  );
}

export { Card, CardMedia, cardVariants };
