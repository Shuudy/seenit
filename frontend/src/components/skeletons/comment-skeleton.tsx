export function CommentSkeleton() {
  return (
    <div className="flex gap-4">
      <div className="bg-secondary/70 h-10 w-10 flex-shrink-0 animate-pulse rounded-full" />
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <div className="h-3 w-32 rounded bg-secondary/60 animate-pulse" />
          <div className="h-3 w-16 rounded bg-secondary/40 animate-pulse" />
        </div>
        <div className="h-3 w-11/12 rounded bg-secondary/60 animate-pulse" />
        <div className="h-3 w-9/12 rounded bg-secondary/50 animate-pulse" />
        <div className="flex gap-6 pt-2">
          <div className="h-4 w-12 rounded bg-secondary/50 animate-pulse" />
          <div className="h-4 w-16 rounded bg-secondary/40 animate-pulse" />
        </div>
      </div>
    </div>
  );
}