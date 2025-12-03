import { getVideos } from '@/lib/api/video';
import { useSuspenseQuery } from '@tanstack/react-query';

export function useVideosSuspenseQuery() {
  return useSuspenseQuery({
    queryKey: ['videos'],
    queryFn: getVideos,
  });
}
