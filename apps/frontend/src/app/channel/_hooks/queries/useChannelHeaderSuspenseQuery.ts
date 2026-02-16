import { useSuspenseQuery } from '@tanstack/react-query';
import { getUser } from '@/lib/api/user';

export function useChannelHeaderSuspenseQuery(userId: string) {
  return useSuspenseQuery({
    queryKey: ['users', userId],
    queryFn: () => getUser(userId),
  });
}
