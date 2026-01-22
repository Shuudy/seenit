import { getCurrentUser } from '@/lib/api/auth';
import { useQuery } from '@tanstack/react-query';

export function useCurrentUser() {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const response = await getCurrentUser();
      return response.user;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
  });
}
