import { logout } from '@/lib/api/auth';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

export function useLogoutMutation(): UseMutationResult<void, Error, void> {
  return useMutation({
    mutationFn: logout,
  });
}
