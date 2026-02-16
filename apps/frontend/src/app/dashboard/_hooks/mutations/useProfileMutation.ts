import { updateProfile } from '@/lib/api/auth';
import { User } from '@/types/auth';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { ProfileFormFields } from '@/app/dashboard/_hooks/useProfileForm';

export function useProfileMutation(): UseMutationResult<User, Error, ProfileFormFields> {
  return useMutation({
    mutationFn: (data: ProfileFormFields) => updateProfile(data),
  });
}
