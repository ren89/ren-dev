import type { ReactNode } from "react";

/**
 * Runs on every navigation within the (site) group (unlike layout, which
 * persists), giving each page a quick fade + rise. CSS-only; the global
 * reduced-motion guard turns it into an instant swap.
 */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="animate-page-in">{children}</div>;
}
