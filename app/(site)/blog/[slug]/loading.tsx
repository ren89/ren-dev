export default function Loading() {
  return (
    <div className="container-page py-16 sm:py-24">
      <div className="h-4 w-24 animate-pulse rounded bg-muted" />
      <div className="mt-8 max-w-2xl space-y-4">
        <div className="h-3 w-40 animate-pulse rounded bg-muted" />
        <div className="h-12 w-4/5 animate-pulse rounded-lg bg-muted" />
        <div className="h-5 w-2/3 animate-pulse rounded bg-muted" />
      </div>
      <div className="mt-12 max-w-2xl space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-4 w-full animate-pulse rounded bg-muted" />
        ))}
      </div>
    </div>
  );
}
