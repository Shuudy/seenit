import { useSuspenseQuery } from '@tanstack/react-query';

import { getUserVideos } from '@/lib/api/user';

export function useChannelVideoGridSuspenseQuery(userId: string) {
  return useSuspenseQuery({
    queryKey: ['users', userId, 'videos'],
    queryFn: () => getUserVideos(userId),
  });
}
