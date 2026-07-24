"use client";

import { forwardRef, type ComponentPropsWithoutRef, type MouseEvent } from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";

/**
 * A contact-directed CTA link that records where it was clicked
 * (track("cta_click", { source })) before navigating. Uses a plain <a> for
 * same-page hash links (keeps native smooth-scroll) and next/link otherwise.
 * forwardRef so it works as a Radix Slot child (Button asChild).
 */
export const TrackCta = forwardRef<
  HTMLAnchorElement,
  { href: string; source: string } & ComponentPropsWithoutRef<"a">
>(function TrackCta({ href, source, onClick, ...props }, ref) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    track("cta_click", { source });
    onClick?.(e);
  };

  if (href.startsWith("#")) {
    return <a ref={ref} href={href} onClick={handleClick} {...props} />;
  }
  return <Link ref={ref} href={href} onClick={handleClick} {...props} />;
});
