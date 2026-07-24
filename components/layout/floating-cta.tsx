"use client";

import { useEffect, useState } from "react";
import { track } from "@vercel/analytics";
import { MessageCircle } from "lucide-react";

import { CTA } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Mobile-only floating contact button. Appears once the visitor scrolls past
 * the hero and hides again near the contact section, so they're never more
 * than one tap from reaching out. Desktop uses the persistent nav CTA.
 */
export function FloatingCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > window.innerHeight * 0.8;
      const contact = document.getElementById("contact");
      const contactInView = contact
        ? contact.getBoundingClientRect().top < window.innerHeight
        : false;
      setVisible(past && !contactInView);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <a
      href={CTA.href}
      onClick={() => track("cta_click", { source: "floating" })}
      className={cn(
        "fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 md:hidden print:hidden",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      )}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
    >
      <MessageCircle className="size-4" aria-hidden="true" />
      {CTA.label}
    </a>
  );
}
