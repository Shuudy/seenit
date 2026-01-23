import { login } from '@/lib/api/auth';
import { AuthResponse, LoginCredentials } from '@/types/auth';
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';

export function useLoginMutation(): UseMutationResult<AuthResponse, Error, LoginCredentials> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      // Invalidate current user query to refetch authenticated user data
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });
}
