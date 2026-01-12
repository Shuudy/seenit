'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { User } from '@/types/user';

export function useAuthUserSuspenseQuery() {
  return useSuspenseQuery({
    queryKey: ['auth-user'],
    queryFn: async () => {
      const response = await apiClient<{ data: User }>('/me');
      return response.data;
    },
  });
}
