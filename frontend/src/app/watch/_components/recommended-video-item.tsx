'use client';

import Image from 'next/image';

interface RecommendedVideoItemProps {
  title: string;
  channel: string;
  views: string;
  uploadedAt: string;
  thumbnail?: string;
}

export function RecommendedVideoItem({
  title,
  channel,
  views,
  uploadedAt,
  thumbnail = '/video-thumbnail.jpg',
}: RecommendedVideoItemProps) {
  return (
    <div className="group flex cursor-pointer gap-2">
      <div className="bg-secondary relative h-20 w-32 flex-shrink-0 overflow-hidden rounded">
        <Image
          src={thumbnail}
          alt={title}
          fill
          sizes="(max-width: 768px) 50vw, 128px"
          className="h-full w-full object-cover transition-all group-hover:brightness-75"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
          <svg className="h-4 w-4 fill-white text-white" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-foreground group-hover:text-muted-foreground line-clamp-2 text-xs font-medium">
          {title}
        </p>
        <p className="text-muted-foreground mt-1 text-xs">{channel}</p>
        <p className="text-muted-foreground text-xs">
          {views} • {uploadedAt}
        </p>
      </div>
    </div>
  );
}
