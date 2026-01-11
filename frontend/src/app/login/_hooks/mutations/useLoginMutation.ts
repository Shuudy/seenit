import { apiClient } from '@/lib/api-client';
import { setToken } from '@/lib/auth-token';
import { LoginResponse } from '@/types/api';
import { User } from '@/types/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useLoginMutation() {
  const queryClient = useQueryClient();
  return useMutation<LoginResponse, Error, { email: string; password: string }>({
    mutationFn: payload =>
      apiClient<LoginResponse>('/login', {
        method: 'POST',
        body: JSON.stringify(payload),
      }),

    onSuccess: response => {
      setToken(response.data.access_token);

      queryClient.setQueryData<User>(['auth-user'], response.data.user);

      queryClient.invalidateQueries({ queryKey: ['auth-user'] });
    },
  });
}
