import { useSuspenseQuery } from '@tanstack/react-query';

import { getRecommendedVideos } from '@/lib/api/video';

export function useRecommendedVideoListSuspenseQuery(videoId: string) {
  return useSuspenseQuery({
    queryKey: ['recommendedVideos', videoId],
    queryFn: () => getRecommendedVideos(videoId),
  });
}
