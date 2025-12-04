'use client';

import { VideoThumbnail } from '@/components/video-thumbnail';
import { Video } from '@/types/video';
import { formatRelativeTime } from '@/utils/format-relative-time';
import { formatViews } from '@/utils/format-views';
import Link from 'next/link';

export function RecommendedVideoItem({ video }: { video: Video }) {
  const viewsFormatted = formatViews(video.count_views);
  const createdAtFormatted = formatRelativeTime(video.created_at);
  return (
    <Link href={`/watch/${video.id}`} className="group flex cursor-pointer gap-2">
      <VideoThumbnail thumbnail={video.thumbnail || '/video-thumbnail.jpg'} title={video.title} />

      <div className="min-w-0 flex-1">
        <p className="text-foreground group-hover:text-muted-foreground line-clamp-2 text-xs font-medium">
          {video.title}
        </p>
        <p className="text-muted-foreground mt-1 text-xs">{video.user.username}</p>
        <p className="text-muted-foreground text-xs">
          {viewsFormatted} • {createdAtFormatted}
        </p>
      </div>
    </Link>
  );
}
