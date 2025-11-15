export function VideoInfoSkeleton() {
  return (
    <div>
      <div className="bg-secondary/70 mb-3 aspect-video w-full animate-pulse overflow-hidden rounded-lg" />

      <div className="mb-3 h-5 w-3/4 rounded bg-secondary/60 animate-pulse" />

      <div className="border-secondary flex flex-col gap-4 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-secondary/70 h-10 w-10 flex-shrink-0 animate-pulse rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-40 rounded bg-secondary/60 animate-pulse" />
            <div className="h-3 w-28 rounded bg-secondary/40 animate-pulse" />
          </div>
        </div>

        <div className="flex gap-2">
          <div className="h-9 w-24 rounded-full bg-secondary/60 animate-pulse" />
          <div className="h-9 w-24 rounded-full bg-secondary/50 animate-pulse" />
        </div>
      </div>

      <div className="bg-secondary mt-4 rounded-lg p-4">
        <div className="mb-2 h-3 w-56 rounded bg-secondary/60 animate-pulse" />
        <div className="space-y-2">
          <div className="h-3 w-11/12 rounded bg-secondary/60 animate-pulse" />
          <div className="h-3 w-10/12 rounded bg-secondary/50 animate-pulse" />
          <div className="h-3 w-9/12 rounded bg-secondary/40 animate-pulse" />
        </div>
        <div className="mt-3 h-4 w-24 rounded bg-secondary/50 animate-pulse" />
      </div>
    </div>
  );
}