import { ThemeToggle } from "@/components/theme/theme-toggle";

/**
 * Phase 1 — Foundation preview.
 * Not the real homepage. This page exists only to verify the design system:
 * theme toggle + persistence, typography scale, color tokens, and motion.
 */
export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header / toggle */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="container-page flex h-16 items-center justify-between">
          <span className="font-mono text-sm text-muted-foreground">
            ren.dev <span className="text-brand">/</span> foundation
          </span>
          <ThemeToggle />
        </div>
      </header>

      <main className="container-page space-y-20 py-16 sm:py-24">
        {/* Hero specimen */}
        <section className="animate-fade-up space-y-6">
          <p className="font-mono text-sm uppercase tracking-widest text-brand">
            Design system · Bold Modern
          </p>
          <h1 className="max-w-4xl font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            Building fast, modern <span className="text-gradient">web apps</span>{" "}
            end to end.
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
            This is a foundation preview — flip the toggle (top-right) to confirm
            light/dark mode persists across refresh, and check that typography and
            color read well in both themes.
          </p>
        </section>

        {/* Typography scale */}
        <Section title="Typography">
          <div className="space-y-4">
            <TypeRow label="Display / H1" cls="font-display text-5xl font-bold tracking-tight">
              Space Grotesk
            </TypeRow>
            <TypeRow label="Display / H2" cls="font-display text-3xl font-semibold tracking-tight">
              Section heading
            </TypeRow>
            <TypeRow label="Body / lg" cls="text-lg">
              Inter keeps long-form copy comfortable to read at any size.
            </TypeRow>
            <TypeRow label="Body / base" cls="text-base text-muted-foreground">
              Muted supporting text for descriptions and captions.
            </TypeRow>
            <TypeRow label="Mono / label" cls="font-mono text-sm uppercase tracking-widest text-brand">
              JetBrains Mono — 01 · label
            </TypeRow>
          </div>
        </Section>

        {/* Color tokens */}
        <Section title="Color tokens">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            <Swatch name="background" className="bg-background" ring />
            <Swatch name="foreground" className="bg-foreground" />
            <Swatch name="primary" className="bg-primary" />
            <Swatch name="secondary" className="bg-secondary" />
            <Swatch name="muted" className="bg-muted" />
            <Swatch name="accent" className="bg-accent" />
            <Swatch name="brand" className="bg-brand" />
            <Swatch name="brand-2" className="bg-brand-2" />
            <Swatch name="brand-3" className="bg-brand-3" />
            <Swatch name="border" className="bg-border" />
            <Swatch name="destructive" className="bg-destructive" />
            <Swatch
              name="gradient"
              className="bg-gradient-to-br from-brand via-brand-2 to-brand-3"
            />
          </div>
        </Section>

        {/* Surfaces & motion */}
        <Section title="Surfaces & motion">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="animate-fade-up rounded-lg border border-border bg-card p-6 [animation-delay:80ms]">
              <h3 className="font-display text-xl font-semibold">Card surface</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Uses the <code className="font-mono text-brand">card</code> token,
                with <code className="font-mono text-brand">--radius</code> corners
                and a bordered edge.
              </p>
            </div>
            <div className="animate-fade-up rounded-lg border border-border bg-muted p-6 [animation-delay:160ms]">
              <h3 className="font-display text-xl font-semibold">Reduced motion</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                These cards fade up on load. Enable “reduce motion” in your OS and
                refresh — the animation disappears automatically.
              </p>
            </div>
          </div>
        </Section>
      </main>

      <footer className="border-t border-border/60">
        <div className="container-page py-8">
          <p className="text-sm text-muted-foreground">
            Foundation preview · Phase 1
          </p>
        </div>
      </footer>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-6">
      <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
}

function TypeRow({
  label,
  cls,
  children,
}: {
  label: string;
  cls: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1 border-b border-border/60 pb-4 sm:flex-row sm:items-baseline sm:gap-6">
      <span className="w-32 shrink-0 font-mono text-xs text-muted-foreground">
        {label}
      </span>
      <span className={cls}>{children}</span>
    </div>
  );
}

function Swatch({
  name,
  className,
  ring,
}: {
  name: string;
  className: string;
  ring?: boolean;
}) {
  return (
    <div className="space-y-2">
      <div
        className={`h-16 w-full rounded-md ${className} ${
          ring ? "ring-1 ring-inset ring-border" : ""
        }`}
      />
      <span className="block font-mono text-xs text-muted-foreground">{name}</span>
    </div>
  );
}
