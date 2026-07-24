import { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/**
 * Standalone layout for the coding-exercise demos. Deliberately omits the
 * portfolio nav/footer — these are self-contained mini-apps. A small fixed
 * link lets visitors return to the portfolio.
 */
export default function ExerciseLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Link
        href="/#playground"
        className="fixed left-4 top-4 z-50 inline-flex items-center gap-1.5 rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to portfolio
      </Link>
      {children}
    </>
  );
}
