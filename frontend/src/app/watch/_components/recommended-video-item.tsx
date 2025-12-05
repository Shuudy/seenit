'use client';

import { VideoInfo } from '@/app/watch/_components/video-info';
import { VideoThumbnail } from '@/app/watch/_components/video-thumbnail';
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

      <VideoInfo
        title={video.title}
        username={video.user.username}
        viewsFormatted={viewsFormatted}
        createdAtFormatted={createdAtFormatted}
      />
    </Link>
  );
}
