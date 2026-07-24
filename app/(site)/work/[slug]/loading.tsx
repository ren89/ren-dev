export default function Loading() {
  return (
    <div className="container-page py-16 sm:py-24">
      <div className="h-4 w-24 animate-pulse rounded bg-muted" />
      <div className="mt-8 max-w-3xl space-y-4">
        <div className="h-3 w-40 animate-pulse rounded bg-muted" />
        <div className="h-10 w-3/4 animate-pulse rounded-lg bg-muted" />
        <div className="h-5 w-2/3 animate-pulse rounded bg-muted" />
        <div className="flex gap-2 pt-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-6 w-16 animate-pulse rounded-full bg-muted"
            />
          ))}
        </div>
      </div>
      <div className="mt-12 aspect-[16/9] w-full animate-pulse rounded-2xl bg-muted" />
      <div className="mt-16 max-w-2xl space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-4 w-full animate-pulse rounded bg-muted" />
        ))}
      </div>
    </div>
  );
}
