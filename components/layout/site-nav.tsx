"use client";

import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { track } from "@vercel/analytics";
import { m, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, Search, X } from "lucide-react";

import { CTA, NAV_LINKS, SECTION_IDS, SITE, type NavLink } from "@/lib/site";
import { useActiveSection } from "@/lib/use-active-section";
import { SPRING } from "@/components/motion/transitions";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { openCommandPalette } from "@/components/command/command-palette";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type UnderlineBox = { x: number; width: number } | null;

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
  const navListRef = useRef<HTMLUListElement>(null);
  const [underline, setUnderline] = useState<UnderlineBox>(null);

  // Add a subtle border/shadow once the page is scrolled. Runs on framer's
  // rAF-batched frameloop instead of a raw scroll listener - shares the
  // same scroll subscription the underline/parallax code elsewhere uses,
  // rather than adding a second one.
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 8));

  // Measure the active link and slide a shared underline to it. Reads
  // aria-current (already the single source of truth for "which link is
  // active"), not framer's layoutId - layoutId only ships in framer's
  // heavier domMax feature bundle, not worth +13KB gzipped for one 2px
  // underline site-wide.
  useEffect(() => {
    const list = navListRef.current;
    if (!list) return;

    const measure = () => {
      const el = list.querySelector<HTMLElement>('[aria-current="true"]');
      setUnderline(
        el ? { x: el.offsetLeft + 12, width: el.offsetWidth - 24 } : null,
      );
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(list);
    document.fonts?.ready.then(measure).catch(() => {});

    return () => ro.disconnect();
  }, [active, pathname, isHome]);

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
        <ul
          ref={navListRef}
          className="relative hidden items-center gap-1 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <NavItem
                link={link}
                href={resolveHref(link, isHome)}
                active={isLinkActive(link, pathname, active)}
              />
            </li>
          ))}
          <m.span
            aria-hidden="true"
            initial={false}
            animate={{
              x: underline?.x ?? 0,
              width: underline?.width ?? 0,
              opacity: underline ? 1 : 0,
            }}
            transition={SPRING.underline}
            className="pointer-events-none absolute -bottom-px left-0 h-0.5 rounded-full bg-linear-to-r from-brand to-brand-2"
          />
        </ul>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 md:flex">
          <Button
            variant="outline"
            size="xs"
            shape="pill"
            onClick={openCommandPalette}
            aria-label="Open command menu"
            className="hidden text-muted-foreground lg:inline-flex"
          >
            <Search className="size-3.5" aria-hidden="true" />
            <kbd className="font-mono">{isMac ? "⌘K" : "Ctrl K"}</kbd>
          </Button>
          <ThemeToggle />
          <Button asChild size="sm" shape="pill">
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
            shape="pill"
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
            shape="pill"
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
              shape="pill"
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

          <Button asChild size="lg" shape="pill" className="mt-6 w-full">
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
        "rounded-md px-3 py-2 text-sm font-medium transition-colors",
        active
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      {link.label}
    </SmartLink>
  );
}
