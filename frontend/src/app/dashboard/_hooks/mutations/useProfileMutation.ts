import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { ProfileFormFields } from '@/app/dashboard/_hooks/useProfileForm';
import { updateProfile } from '@/lib/api/auth';
import { User } from '@/types/auth';

export function useProfileMutation(): UseMutationResult<User, Error, ProfileFormFields> {
  return useMutation({
    mutationFn: (data: ProfileFormFields) => updateProfile(data),
  });
}
