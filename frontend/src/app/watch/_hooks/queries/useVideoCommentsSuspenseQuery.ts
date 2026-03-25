import { useSuspenseQuery } from '@tanstack/react-query';

import { getVideoComments } from '@/lib/api/video';

export function useVideoCommentsSuspenseQuery(videoId: string) {
  return useSuspenseQuery({
    queryKey: ['video-comments', videoId],
    queryFn: () => getVideoComments(videoId),
  });
}
