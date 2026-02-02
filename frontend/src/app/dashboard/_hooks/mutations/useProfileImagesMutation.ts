import { updateProfileImages } from '@/lib/api/auth';
import { User } from '@/types/auth';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

export type ProfileImagesPayload = {
  avatar?: File;
  banner?: File;
};

export function useProfileImagesMutation(): UseMutationResult<User, Error, ProfileImagesPayload> {
  return useMutation({
    mutationFn: (data: ProfileImagesPayload) => updateProfileImages(data),
  });
}
