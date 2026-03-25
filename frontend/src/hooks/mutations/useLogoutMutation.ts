import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { logout } from '@/lib/api/auth';

export function useLogoutMutation(): UseMutationResult<void, Error, void> {
  return useMutation({
    mutationFn: logout,
  });
}
