import { useSuspenseQuery } from '@tanstack/react-query';

import { getVideo } from '@/lib/api/video';

export function useVideoDetailsSuspenseQuery(videoId: string) {
  return useSuspenseQuery({
    queryKey: ['videos', videoId],
    queryFn: () => getVideo(videoId),
  });
}
