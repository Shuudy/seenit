'use client';

import { CommentInput } from '@/app/watch/_components/comment-input';
import { CommentList } from '@/app/watch/_components/comment-list';
import { useVideoCommentsSuspenseQuery } from '@/app/watch/_hooks/queries/useVideoCommentsSuspenseQuery';
import { useCommentSection } from '@/app/watch/_hooks/useCommentSection';
import { useParams } from 'next/navigation';
import { useState, useCallback, useEffect } from 'react';
import { Comment } from '@/types/comment';

export function VideoComments() {
  const { id: videoId } = useParams<{ id: string }>();
  const { data } = useVideoCommentsSuspenseQuery(videoId);
  const { meta, comments: initialComments } = data;
  const [localComments, setLocalComments] = useState<Comment[]>(initialComments);

  useEffect(() => {
    setLocalComments(initialComments);
  }, [initialComments]);

  const handleAddCommentLocal = useCallback((text: string) => {
    const newComment: Comment = {
      id: Math.floor(Date.now() + Math.random() * 1000),
      content: text,
      user: {
        id: -1,
        username: 'Vous',
        avatarUrl: '',
      },
      likes_count: 0,
      is_liked_by_current_user: false,
      created_at: new Date().toISOString(),
    };
    setLocalComments(prev => [newComment, ...prev]);
  }, []);

  const commentSection = useCommentSection(handleAddCommentLocal);

  return (
    <div className="mt-6">
      <h2 className="text-foreground mb-4 text-base font-bold">
        {meta.comments_count} {meta.comments_count === 1 ? 'commentaire' : 'commentaires'}
      </h2>

      <CommentInput {...commentSection} />

      <CommentList comments={localComments} />
    </div>
  );
}
