export function VideoCardSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <div className="bg-secondary/70 relative aspect-video animate-pulse overflow-hidden rounded-lg" />
      <div className="flex gap-3">
        <div className="flex-1 space-y-2">
          <div className="bg-secondary/60 h-3 w-5/6 animate-pulse rounded" />
          <div className="bg-secondary/50 h-3 w-4/6 animate-pulse rounded" />
          <div className="bg-secondary/40 h-3 w-3/6 animate-pulse rounded" />
        </div>
      </div>
    </div>
  );
}
