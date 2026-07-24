import { ArrowUpRight, Github, Mail } from "lucide-react";

import { NAV_LINKS, SITE } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60">
      <div className="container-page py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand + blurb */}
          <div className="space-y-3">
            <a href="#home" className="font-mono text-sm font-medium">
              ren<span className="text-brand">-</span>dev
            </a>
            <p className="max-w-xs text-sm text-muted-foreground">
              {SITE.role} building fast, modern web apps end to end. Open to
              freelance and full-time work.
            </p>
          </div>

          {/* Navigate */}
          <nav aria-label="Footer">
            <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Navigate
            </h2>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Connect */}
          <div>
            <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Connect
            </h2>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href={SITE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  GitHub
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-2 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>
            © {year} {SITE.fullName}. All rights reserved.
          </p>
          <p className="font-mono">Built with Next.js &amp; Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
