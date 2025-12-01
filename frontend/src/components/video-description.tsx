'use client';

import { useState } from 'react';
import { VideoStats } from './video-stats';

interface VideoDescriptionProps {
  views: string;
  uploadedAt: string;
  description: string;
}

export function VideoDescription({ views, uploadedAt, description }: VideoDescriptionProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-secondary mt-4 rounded-lg p-4">
      <VideoStats views={views} uploadedAt={uploadedAt} />

      <p
        className={`text-foreground cursor-pointer text-sm whitespace-pre-line ${
          expanded ? '' : 'line-clamp-3'
        }`}
        onClick={() => !expanded && setExpanded(true)}
        aria-expanded={expanded}
      >
        {description}
      </p>

      <button
        className="text-foreground hover:text-muted-foreground mt-3 cursor-pointer text-xs font-medium"
        onClick={() => setExpanded(s => !s)}
        aria-controls="video-description"
      >
        {expanded ? 'Afficher moins' : 'Afficher plus'}
      </button>
    </div>
  );
}
