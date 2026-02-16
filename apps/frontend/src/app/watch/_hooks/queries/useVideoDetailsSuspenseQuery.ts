import { getVideo } from '@/lib/api/video';
import { useSuspenseQuery } from '@tanstack/react-query';

export function useVideoDetailsSuspenseQuery(videoId: string) {
  return useSuspenseQuery({
    queryKey: ['videos', videoId],
    queryFn: () => getVideo(videoId),
  });
}
