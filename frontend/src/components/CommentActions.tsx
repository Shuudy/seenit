'use client';

import { LikeButton } from '@/components/LikeButton';
import { useTranslations } from 'next-intl';

export function CommentActions({ likes }: { likes: number }) {
  const t = useTranslations('common');
  return (
    <div className="flex gap-6 pt-2">
      <LikeButton initialLikes={likes} />
      <button className="text-muted-foreground hover:text-foreground cursor-pointer text-xs">
        {t('reply')}
      </button>
    </div>
  );
}
