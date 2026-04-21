import Link from 'next/link';

import { VideoInfo } from '@/app/watch/_components/VideoInfo';
import { VideoThumbnail } from '@/app/watch/_components/VideoThumbnail';
import { Video } from '@/types/video';

export function RecommendedVideoItem({ video }: { video: Video }) {
  return (
    <Link href={`/watch/${video.id}`} className="group flex cursor-pointer gap-2">
      <VideoThumbnail
        thumbnail={video.thumbnail || '/video-thumbnail.jpg'}
        title={video.title}
        duration={video.duration}
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
