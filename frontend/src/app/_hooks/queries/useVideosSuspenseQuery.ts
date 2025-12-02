import { getVideos } from '@/lib/video';
import { useSuspenseQuery } from '@tanstack/react-query';

export function useVideosSuspenseQuery() {
  return useSuspenseQuery({
    queryKey: ['videos'],
    queryFn: getVideos,
  });
}
