import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Page not found | Ren Avellano",
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* Ambient brand glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 mask-[radial-gradient(ellipse_at_center,black,transparent_75%)]"
      >
        <div className="absolute left-1/2 top-1/2 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/20 blur-3xl" />
      </div>

      <Link
        href="/"
        className="absolute left-6 top-6 font-mono text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        ren<span className="text-brand">-</span>dev
      </Link>

      <p className="font-display text-7xl font-bold tracking-tight sm:text-8xl">
        <span className="text-gradient">404</span>
      </p>
      <h1 className="mt-4 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
        This page took a wrong turn.
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
        Let&apos;s get you back on track.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button asChild size="md" shape="pill">
          <Link href="/">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back home
          </Link>
        </Button>
        <Button asChild variant="outline" size="md" shape="pill">
          <Link href="/#work">View my work</Link>
        </Button>
      </div>
    </main>
  );
}
