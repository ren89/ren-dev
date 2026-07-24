import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";

import { NAV_LINKS, SITE } from "@/lib/site";

/** GitHub mark - inlined because lucide-react dropped brand icons in v1. */
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.05-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.39 1.24-3.23-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.05.14 3 .4 2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.92 1.24 3.23 0 4.62-2.81 5.64-5.49 5.94.43.37.81 1.1.81 2.22 0 1.61-.01 2.9-.01 3.29 0 .32.22.7.83.58A12 12 0 0 0 24 12.5C24 5.87 18.63.5 12 .5Z" />
    </svg>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 print:hidden">
      <div className="container-page py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand + blurb */}
          <div className="space-y-3">
            <Link href="/" className="font-mono text-sm font-medium">
              ren<span className="text-brand">-</span>dev
            </Link>
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
                  <Link
                    href={link.type === "route" ? link.href : `/${link.href}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/resume"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Résumé
                </Link>
              </li>
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
                  <GithubIcon className="size-4" />
                  GitHub
                  <ArrowUpRight
                    className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Mail className="size-4" aria-hidden="true" />
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
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="transition-colors hover:text-foreground"
            >
              Privacy
            </Link>
            <span className="font-mono">Built with Next.js &amp; Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
