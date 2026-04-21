import { useSuspenseQuery } from '@tanstack/react-query';

import { getVideos } from '@/lib/api/video';

export function useVideosSuspenseQuery() {
  return useSuspenseQuery({
    queryKey: ['videos'],
    queryFn: getVideos,
  });
}
