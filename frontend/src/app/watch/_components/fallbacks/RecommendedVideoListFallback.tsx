import { RecommendationSkeleton } from '@/components/skeletons/RecommendationSkeleton';

export function RecommendedVideoListFallback() {
  return (
    <div className="flex flex-col space-y-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <RecommendationSkeleton key={index} />
      ))}
    </div>
  );
}
