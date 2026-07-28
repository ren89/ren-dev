"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import { MessageCircle } from "lucide-react";

import { CTA } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/**
 * Mobile-only floating contact button. Appears once the visitor scrolls past
 * the hero and hides again once they reach the contact section, so they're
 * never more than one tap from reaching out. Desktop uses the persistent nav
 * CTA.
 *
 * Visibility is split across the two primitives that actually fit each
 * question: an IntersectionObserver answers "has the visitor reached
 * contact" (no scroll-driven layout reads), and a rAF-throttled scroll
 * listener answers "are they past the hero" (a single number compare, no
 * DOM measurement). Neither calls getBoundingClientRect on the scroll path.
 */
export function FloatingCta() {
  const [pastHero, setPastHero] = useState(false);
  const [contactReached, setContactReached] = useState(false);

  useEffect(() => {
    const contact = document.getElementById("contact");
    if (!contact || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setContactReached(true);
      },
      { threshold: 0 },
    );
    io.observe(contact);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    let frame = 0;

    const check = () => {
      setPastHero(window.scrollY > window.innerHeight * 0.8);
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        check();
      });
    };

    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", check);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const visible = pastHero && !contactReached;

  return (
    <Button
      asChild
      size="md"
      shape="pill"
      className={cn(
        "fixed bottom-5 right-5 z-40 h-auto px-5 py-3 shadow-lg shadow-primary/25 transition-all duration-300 md:hidden print:hidden",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <a
        href={CTA.href}
        onClick={() => track("cta_click", { source: "floating" })}
        aria-hidden={!visible}
        tabIndex={visible ? 0 : -1}
      >
        <MessageCircle className="size-4" aria-hidden="true" />
        {CTA.label}
      </a>
    </Button>
  );
}
