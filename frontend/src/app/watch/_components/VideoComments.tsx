'use client';

import { CommentInput } from '@/app/watch/_components/CommentInput';
import { CommentList } from '@/app/watch/_components/CommentList';
import { useVideoCommentsSuspenseQuery } from '@/app/watch/_hooks/queries/useVideoCommentsSuspenseQuery';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

export function VideoComments() {
  const t = useTranslations('common');
  const { id: videoId } = useParams<{ id: string }>();
  const { data } = useVideoCommentsSuspenseQuery(videoId);

  const { meta, comments } = data;

  return (
    <>
      <h2 className="text-foreground mb-4 text-base font-bold">
        {meta.comments_count} {meta.comments_count === 1 ? t('comment') : t('comments')}
      </h2>

      <CommentInput />

      <CommentList comments={comments} />
    </>
  );
}
