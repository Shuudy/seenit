'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { VideoStats } from '@/app/watch/_components/VideoStats';

interface VideoDescriptionProps {
  views: number;
  uploadedAt: string;
  description: string;
}

export function VideoDescription({ views, uploadedAt, description }: VideoDescriptionProps) {
  const t = useTranslations('common');
  const [expanded, setExpanded] = useState(false);

  const handleParagraphClick = () => {
    if (expanded) return;

    const selection = globalThis.getSelection();
    if (selection?.isCollapsed === false) {
      return;
    }

    setExpanded(true);
  };

  return (
    <div className="bg-secondary mt-4 rounded-lg p-4">
      <VideoStats views={views} uploadedAt={uploadedAt} />

      <p
        id="video-description"
        className={`text-foreground text-sm whitespace-pre-line ${
          expanded ? '' : 'line-clamp-3 cursor-pointer'
        }`}
        onClick={handleParagraphClick}
      >
        {description}
      </p>

      <button
        className="text-foreground hover:text-muted-foreground mt-3 cursor-pointer text-xs font-medium"
        onClick={() => setExpanded(s => !s)}
        aria-controls="video-description"
        aria-expanded={expanded}
      >
        {expanded ? t('showLess') : t('showMore')}
      </button>
    </div>
  );
}
