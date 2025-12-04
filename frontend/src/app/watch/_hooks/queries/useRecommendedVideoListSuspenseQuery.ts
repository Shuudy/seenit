import { getRecommendedVideos } from '@/lib/api/video';
import { useSuspenseQuery } from '@tanstack/react-query';

export function useRecommendedVideoListSuspenseQuery(videoId: string) {
  return useSuspenseQuery({
    queryKey: ['recommendedVideos', videoId],
    queryFn: () => getRecommendedVideos(videoId),
  });
}
