import { VideoInfo } from '@/app/watch/_components/VideoInfo';
import { VideoThumbnail } from '@/app/watch/_components/VideoThumbnail';
import { Video } from '@/types/video';
import Link from 'next/link';

export function RecommendedVideoItem({ video }: { video: Video }) {
  const { id, title, thumbnail, duration, user, count_views, created_at } = video;

  return (
    <Link href={`/watch/${id}`} className="group flex cursor-pointer gap-2">
      <VideoThumbnail
        thumbnail={thumbnail || '/video-thumbnail.jpg'}
        title={title}
        duration={duration}
      />

      <VideoInfo
        title={title}
        username={user.username}
        views={count_views}
        createdAt={created_at}
      />
    </Link>
  );
}
