export function CommentSkeleton() {
  return (
    <div className="flex gap-4">
      <div className="bg-secondary/70 h-10 w-10 flex-shrink-0 animate-pulse rounded-full" />
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <div className="bg-secondary/60 h-3 w-32 animate-pulse rounded" />
          <div className="bg-secondary/40 h-3 w-16 animate-pulse rounded" />
        </div>
        <div className="bg-secondary/60 h-3 w-11/12 animate-pulse rounded" />
        <div className="bg-secondary/50 h-3 w-9/12 animate-pulse rounded" />
        <div className="flex gap-6 pt-2">
          <div className="bg-secondary/50 h-4 w-12 animate-pulse rounded" />
          <div className="bg-secondary/40 h-4 w-16 animate-pulse rounded" />
        </div>
      </div>
    </div>
  );
}
