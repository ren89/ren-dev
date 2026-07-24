export default function Loading() {
  return (
    <div className="container-page py-16 sm:py-24">
      <div className="max-w-2xl space-y-4">
        <div className="h-3 w-24 animate-pulse rounded bg-muted" />
        <div className="h-10 w-40 animate-pulse rounded-lg bg-muted" />
        <div className="h-5 w-2/3 animate-pulse rounded bg-muted" />
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-4 rounded-2xl border border-border p-6">
            <div className="h-3 w-32 animate-pulse rounded bg-muted" />
            <div className="h-6 w-3/4 animate-pulse rounded bg-muted" />
            <div className="h-4 w-full animate-pulse rounded bg-muted" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
          </div>
        ))}
      </div>
    </div>
  );
}
