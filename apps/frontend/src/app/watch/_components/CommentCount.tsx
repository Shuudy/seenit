'use client';

import { useVideoCommentsSuspenseQuery } from '@/app/watch/_hooks/queries/useVideoCommentsSuspenseQuery';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

export function CommentCount() {
  const t = useTranslations('common');
  const { id: videoId } = useParams<{ id: string }>();
  const { data } = useVideoCommentsSuspenseQuery(videoId);
  return (
    <h2 className="text-foreground mb-4 text-base font-bold">
      {data.meta.comments_count} {t('comment', { count: data.meta.comments_count })}
    </h2>
  );
}
