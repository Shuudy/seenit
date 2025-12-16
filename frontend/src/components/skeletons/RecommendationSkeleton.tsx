export function RecommendationSkeleton() {
  return (
    <div className="flex cursor-default gap-2">
      <div className="bg-secondary/70 relative h-20 w-32 flex-shrink-0 animate-pulse overflow-hidden rounded" />
      <div className="min-w-0 flex-1 space-y-2">
        <div className="bg-secondary/60 h-3 w-10/12 animate-pulse rounded" />
        <div className="bg-secondary/50 h-3 w-8/12 animate-pulse rounded" />
        <div className="bg-secondary/40 h-3 w-6/12 animate-pulse rounded" />
      </div>
    </div>
  );
}
