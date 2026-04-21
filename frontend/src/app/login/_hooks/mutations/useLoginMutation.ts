import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { login } from '@/lib/api/auth';
import { LoginCredentials, User } from '@/types/auth';

export function useLoginMutation(): UseMutationResult<User, Error, LoginCredentials> {
  return useMutation({
    mutationFn: login,
  });
}
