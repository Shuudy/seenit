export function VideoCardSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <div className="bg-secondary/70 animate-pulse relative aspect-video overflow-hidden rounded-lg" />
      <div className="flex gap-3">
        <div className="flex-1 space-y-2">
          <div className="h-3 w-5/6 rounded bg-secondary/60 animate-pulse" />
          <div className="h-3 w-4/6 rounded bg-secondary/50 animate-pulse" />
          <div className="h-3 w-3/6 rounded bg-secondary/40 animate-pulse" />
        </div>
      </div>
    </div>
  );
}