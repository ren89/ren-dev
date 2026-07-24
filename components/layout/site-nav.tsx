"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

import { CTA, NAV_LINKS, SECTION_IDS, SITE } from "@/lib/site";
import { useActiveSection } from "@/lib/use-active-section";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const active = useActiveSection(SECTION_IDS);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Add a subtle border/shadow once the page is scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll + trap focus while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";

    // Focus the first link in the panel.
    const first = panelRef.current?.querySelector<HTMLElement>("a, button");
    first?.focus();

    return () => {
      document.body.style.overflow = "";
      previouslyFocused?.focus();
    };
  }, [open]);

  const closeMenu = useCallback(() => setOpen(false), []);

  const onPanelKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!focusables || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const activeEl = document.activeElement;

      if (e.shiftKey && activeEl === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && activeEl === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [],
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 animate-fade-down border-b transition-colors duration-300",
        scrolled
          ? "border-border/60 bg-background/80 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60"
          : "border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="container-page flex h-16 items-center justify-between gap-4"
      >
        {/* Brand */}
        <a
          href="#home"
          className="font-mono text-sm font-medium tracking-tight text-foreground"
          aria-label={`${SITE.name} — home`}
        >
          ren<span className="text-brand">-</span>dev
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <NavItem link={link} active={active === link.id} />
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Button asChild size="sm" className="rounded-full">
            <a href={CTA.href}>{CTA.label}</a>
          </Button>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button
            ref={toggleRef}
            type="button"
            variant="outline"
            size="icon"
            className="rounded-full"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </Button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div className="md:hidden">
        {/* Backdrop */}
        <div
          aria-hidden="true"
          onClick={closeMenu}
          className={cn(
            "fixed inset-0 z-40 bg-background/70 backdrop-blur-sm transition-opacity duration-300",
            open ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        />

        {/* Panel */}
        <div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          onKeyDown={onPanelKeyDown}
          className={cn(
            "fixed inset-x-0 top-0 z-50 origin-top border-b border-border bg-background px-5 pb-8 pt-4 shadow-xl transition-all duration-300 ease-out",
            open
              ? "translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-4 opacity-0",
          )}
        >
          <div className="flex h-16 items-center justify-between">
            <span className="font-mono text-sm font-medium">
              ren<span className="text-brand">-</span>dev
            </span>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="rounded-full"
              aria-label="Close menu"
              onClick={() => {
                setOpen(false);
                toggleRef.current?.focus();
              }}
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>

          <ul className="mt-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  onClick={closeMenu}
                  aria-current={active === link.id ? "true" : undefined}
                  className={cn(
                    "block rounded-lg px-3 py-3 font-display text-2xl font-semibold tracking-tight transition-colors",
                    active === link.id
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <Button asChild size="lg" className="mt-6 w-full rounded-full">
            <a href={CTA.href} onClick={closeMenu}>
              {CTA.label}
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}

function NavItem({ link, active }: { link: (typeof NAV_LINKS)[number]; active: boolean }) {
  return (
    <a
      href={link.href}
      aria-current={active ? "true" : undefined}
      className={cn(
        "relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
        active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
      )}
    >
      {link.label}
      {/* Active underline */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-linear-to-r from-brand to-brand-2 transition-all duration-300",
          active ? "opacity-100" : "opacity-0",
        )}
      />
    </a>
  );
}
