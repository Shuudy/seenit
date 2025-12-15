'use client';

import { CommentInput } from '@/app/watch/_components/comment-input';
import { CommentList } from '@/app/watch/_components/comment-list';
import { useVideoCommentsSuspenseQuery } from '@/app/watch/_hooks/queries/useVideoCommentsSuspenseQuery';
import { useParams } from 'next/navigation';

export function VideoComments() {
  const { id: videoId } = useParams<{ id: string }>();
  const { data } = useVideoCommentsSuspenseQuery(videoId);

  const { meta, comments } = data;

  return (
    <>
      <h2 className="text-foreground mb-4 text-base font-bold">
        {meta.comments_count} {meta.comments_count === 1 ? 'commentaire' : 'commentaires'}
      </h2>

      <CommentInput />

      <CommentList comments={comments} />
    </>
  );
}
