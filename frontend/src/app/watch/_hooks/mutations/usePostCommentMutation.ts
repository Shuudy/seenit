import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';

import { postVideoComment } from '@/lib/api/video';
import { Comment, PostVideoCommentPayload } from '@/types/comment';

export function usePostCommentMutation(): UseMutationResult<
  Comment,
  Error,
  PostVideoCommentPayload
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postVideoComment,
    onSuccess: (_comment, variables) => {
      queryClient.invalidateQueries({ queryKey: ['video-comments', variables.videoId] });
    },
  });
}
