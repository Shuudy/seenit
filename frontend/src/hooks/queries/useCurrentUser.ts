import { getCurrentUser } from '@/lib/api/auth';
import { User } from '@/types/auth';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export function useCurrentUser(): UseQueryResult<User, Error> {
  return useQuery<User, Error>({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
  });
}
