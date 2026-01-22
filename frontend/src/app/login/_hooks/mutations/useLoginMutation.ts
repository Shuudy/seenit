import { login } from '@/lib/api/auth';
import { AuthResponse, LoginCredentials } from '@/types/auth';
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';

export function useLoginMutation(options?: {
  onSuccess?: (data: AuthResponse) => void;
  onError?: (error: Error) => void;
}): UseMutationResult<AuthResponse, Error, LoginCredentials> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: login,
    onSuccess: data => {
      // Invalidate current user query to refetch authenticated user data
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      options?.onSuccess?.(data);
    },
    onError: options?.onError,
  });
}
