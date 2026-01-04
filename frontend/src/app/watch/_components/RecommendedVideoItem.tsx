import { VideoInfo } from '@/app/watch/_components/VideoInfo';
import { VideoThumbnail } from '@/app/watch/_components/VideoThumbnail';
import { Video } from '@/types/video';
import { formatDuration } from '@/utils/format-duration';
import Link from 'next/link';

export function RecommendedVideoItem({ video }: { video: Video }) {
  const durationFormatted = formatDuration(video.duration);

  return (
    <Link href={`/watch/${video.id}`} className="group flex cursor-pointer gap-2">
      <VideoThumbnail
        thumbnail={video.thumbnail || '/video-thumbnail.jpg'}
        title={video.title}
        duration={durationFormatted}
      />

      <VideoInfo
        title={video.title}
        username={video.user.username}
        views={video.count_views}
        createdAt={video.created_at}
      />
    </Link>
  );
}
