"use client";

import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { track } from "@vercel/analytics";
import { Menu, Search, X } from "lucide-react";

import { CTA, NAV_LINKS, SECTION_IDS, SITE, type NavLink } from "@/lib/site";
import { useActiveSection } from "@/lib/use-active-section";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { openCommandPalette } from "@/components/command/command-palette";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** In-page anchors become absolute ("/#work") when away from the homepage. */
function resolveHref(link: NavLink, isHome: boolean): string {
  if (link.type === "route") return link.href;
  return isHome ? link.href : `/${link.href}`;
}

function isLinkActive(
  link: NavLink,
  pathname: string,
  activeSection: string,
): boolean {
  if (link.type === "route")
    return pathname === link.href || pathname.startsWith(`${link.href}/`);
  return pathname === "/" && activeSection === link.id;
}

/**
 * Uses a plain <a> for same-page hash links (preserves native smooth-scroll)
 * and next/link for real navigation ("/blog", "/#work" from a subpage).
 * forwardRef so it can be a Radix Slot child (Button asChild).
 */
const SmartLink = forwardRef<
  HTMLAnchorElement,
  { href: string } & React.ComponentPropsWithoutRef<"a">
>(function SmartLink({ href, ...props }, ref) {
  if (href.startsWith("#")) return <a ref={ref} href={href} {...props} />;
  return <Link ref={ref} href={href} {...props} />;
});

export function SiteNav() {
  const active = useActiveSection(SECTION_IDS);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const ctaHref = isHome ? CTA.href : `/${CTA.href}`;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(
      /Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent),
    );
  }, []);

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
        "a[href], button:not([disabled])",
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
        "sticky top-0 z-50 animate-fade-down border-b transition-colors duration-300 print:hidden",
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
        <Link
          href="/"
          className="font-mono text-sm font-medium tracking-tight text-foreground"
          aria-label={`${SITE.name} - home`}
        >
          ren<span className="text-brand">-</span>dev
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <NavItem
                link={link}
                href={resolveHref(link, isHome)}
                active={isLinkActive(link, pathname, active)}
              />
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            onClick={openCommandPalette}
            aria-label="Open command menu"
            className="hidden items-center gap-2 rounded-full border border-input px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground lg:inline-flex"
          >
            <Search className="size-3.5" aria-hidden="true" />
            <kbd className="font-mono">{isMac ? "⌘K" : "Ctrl K"}</kbd>
          </button>
          <ThemeToggle />
          <Button asChild size="sm" className="rounded-full">
            <SmartLink
              href={ctaHref}
              onClick={() => track("cta_click", { source: "nav" })}
            >
              {CTA.label}
            </SmartLink>
          </Button>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-2 md:hidden">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="rounded-full"
            aria-label="Open command menu"
            onClick={openCommandPalette}
          >
            <Search className="size-5" aria-hidden="true" />
          </Button>
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
            <Menu className="size-5" aria-hidden="true" />
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
              <X className="size-5" aria-hidden="true" />
            </Button>
          </div>

          <ul className="mt-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const linkActive = isLinkActive(link, pathname, active);
              return (
                <li key={link.id}>
                  <SmartLink
                    href={resolveHref(link, isHome)}
                    onClick={closeMenu}
                    aria-current={linkActive ? "true" : undefined}
                    className={cn(
                      "block rounded-lg px-3 py-3 font-display text-2xl font-semibold tracking-tight transition-colors",
                      linkActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {link.label}
                  </SmartLink>
                </li>
              );
            })}
          </ul>

          <Button asChild size="lg" className="mt-6 w-full rounded-full">
            <SmartLink
              href={ctaHref}
              onClick={() => {
                track("cta_click", { source: "nav" });
                closeMenu();
              }}
            >
              {CTA.label}
            </SmartLink>
          </Button>
        </div>
      </div>
    </header>
  );
}

function NavItem({
  link,
  href,
  active,
}: {
  link: NavLink;
  href: string;
  active: boolean;
}) {
  return (
    <SmartLink
      href={href}
      aria-current={active ? "true" : undefined}
      className={cn(
        "relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
        active
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground",
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
    </SmartLink>
  );
}
