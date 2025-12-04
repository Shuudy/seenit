import { RecommendationSkeleton } from '@/components/skeletons/recommendation-skeleton';

export function RecommendedVideoListFallback() {
  return (
    <div className="flex flex-col space-y-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <RecommendationSkeleton key={i} />
      ))}
    </div>
  );
}
