import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { register } from '@/lib/api/auth';
import { RegisterCredentials, User } from '@/types/auth';

export function useRegisterMutation(): UseMutationResult<User, Error, RegisterCredentials> {
  return useMutation({
    mutationFn: register,
  });
}
