'use client';

import { useState } from 'react';
import { CommentForm } from '@/app/watch/_components/CommentForm';
import { CommentList } from '@/app/watch/_components/CommentList';
import { useVideoCommentsSuspenseQuery } from '@/app/watch/_hooks/queries/useVideoCommentsSuspenseQuery';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Comment } from '@/types/comment';

export function VideoComments() {
  const t = useTranslations('common');
  const { id: videoId } = useParams<{ id: string }>();
  const { data } = useVideoCommentsSuspenseQuery(videoId);

  const { meta: _meta, comments } = data;
  const [localComments, setLocalComments] = useState<Comment[]>(comments);

  const addComment = (content: string) => {
    const newComment: Comment = {
      id: Date.now(),
      content,
      user: {
        id: 0,
        username: 'Vous',
        avatar_url: '',
      },
      likes_count: 0,
      is_liked_by_current_user: false,
      created_at: new Date().toISOString(),
    };
    setLocalComments(prev => [newComment, ...prev]);
  };

  return (
    <>
      <h2 className="text-foreground mb-4 text-base font-bold">
        {/* TODO: change localComments.length with meta.comments_count */}
        {localComments.length} {t('comment', { count: localComments.length })}
      </h2>

      <CommentForm onAddComment={addComment} />

      {/* TODO: change localComments with comments */}
      <CommentList comments={localComments} />
    </>
  );
}
