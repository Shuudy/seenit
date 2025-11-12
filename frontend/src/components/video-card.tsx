'use client';

import Image from 'next/image';
import Link from 'next/link';

import type { VideoCardProps } from '@/types/props';

export function VideoCard({
  thumbnail = '/video-thumbnail.jpg',
  title,
  channel,
  views,
  uploadedAt,
}: VideoCardProps) {
  return (
    <Link href="/watch/1" className="group flex cursor-pointer flex-col gap-2">
      <div className="bg-secondary relative aspect-video overflow-hidden rounded-lg">
        <Image
          src={thumbnail}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="h-full w-full object-cover transition-all group-hover:brightness-75"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-full bg-black/60 p-3 transition-all hover:bg-black/80">
            <svg className="h-6 w-6 fill-white text-white" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex gap-3 px-0">
        <div className="min-w-0 flex-1">
          <h3 className="group-hover:text-foreground text-foreground line-clamp-2 text-sm font-medium">
            {title}
          </h3>
          <p className="text-muted-foreground mt-1 text-xs">{channel}</p>
          <p className="text-muted-foreground text-xs">
            {views} • {uploadedAt}
          </p>
        </div>
      </div>
    </Link>
  );
}
