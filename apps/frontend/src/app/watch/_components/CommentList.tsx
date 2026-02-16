'use client';

import { Comment } from '@/components/Comment';
import { useVideoCommentsSuspenseQuery } from '@/app/watch/_hooks/queries/useVideoCommentsSuspenseQuery';
import { useParams } from 'next/navigation';

export function CommentList() {
  const { id: videoId } = useParams<{ id: string }>();
  const { data } = useVideoCommentsSuspenseQuery(videoId);

  const { comments } = data;
  return (
    <div className="space-y-7">
      {comments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
