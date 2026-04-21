'use client';

import { useParams } from 'next/navigation';

import { useVideoCommentsSuspenseQuery } from '@/app/watch/_hooks/queries/useVideoCommentsSuspenseQuery';
import { Comment } from '@/components/Comment';

export function CommentList() {
  const { id: videoId } = useParams<{ id: string }>();
  const { data } = useVideoCommentsSuspenseQuery(videoId);

  const { comments } = data;
  return (
    <ul className="space-y-7">
      {comments.map(comment => (
        <li key={comment.id}>
          <Comment comment={comment} />
        </li>
      ))}
    </ul>
  );
}
