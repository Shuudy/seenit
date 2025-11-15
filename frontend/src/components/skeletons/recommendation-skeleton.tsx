export function RecommendationSkeleton() {
  return (
    <div className="flex cursor-default gap-2">
      <div className="relative h-20 w-32 flex-shrink-0 overflow-hidden rounded bg-secondary/70 animate-pulse" />
      <div className="min-w-0 flex-1 space-y-2">
        <div className="h-3 w-10/12 rounded bg-secondary/60 animate-pulse" />
        <div className="h-3 w-8/12 rounded bg-secondary/50 animate-pulse" />
        <div className="h-3 w-6/12 rounded bg-secondary/40 animate-pulse" />
      </div>
    </div>
  );
}