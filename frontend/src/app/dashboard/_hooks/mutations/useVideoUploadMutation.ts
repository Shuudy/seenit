import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { uploadVideo } from '@/lib/api/video';
import { Video } from '@/types/video';

export type VideoUploadPayload = {
  title: string;
  description?: string | null;
  file: File;
};

export function useVideoUploadMutation(): UseMutationResult<Video, Error, VideoUploadPayload> {
  return useMutation({
    mutationFn: (data: VideoUploadPayload) => uploadVideo(data),
  });
}
