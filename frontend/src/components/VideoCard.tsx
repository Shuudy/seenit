import Image from 'next/image';
import Link from 'next/link';

import { useFormatViews } from '@/utils/format-views';
import { useFormatRelativeTime } from '@/utils/format-relative-time';
import { formatDuration } from '@/utils/format-duration';
import type { Video } from '@/types/video';

interface VideoCardProps {
  video: Video;
  showChannel?: boolean;
}

export function VideoCard({ video, showChannel = true }: VideoCardProps) {
  const formatViews = useFormatViews();
  const formatRelativeTime = useFormatRelativeTime();
  const { id, title, thumbnail, count_views, created_at, duration, user } = video;

  const viewsFormatted = formatViews(count_views);
  const createdAtFormatted = formatRelativeTime(created_at);
  const channelUsername = showChannel ? user.username : undefined;
  const durationFormatted = formatDuration(duration);

  return (
    <Link href={`/watch/${id}`} className="group flex cursor-pointer flex-col gap-2">
      <div className="bg-secondary relative aspect-video overflow-hidden rounded-lg">
        <Image
          src={thumbnail || '/video-thumbnail.jpg'}
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
        <div className="absolute right-1.5 bottom-1.5 rounded bg-black/60 px-1.5 py-0.5 text-xs font-medium text-white">
          {durationFormatted}
        </div>
      </div>

      <div className="flex gap-3 px-0">
        <div className="min-w-0 flex-1">
          <h3 className="group-hover:text-foreground text-foreground line-clamp-2 text-sm font-medium">
            {title}
          </h3>
          <p className="text-muted-foreground mt-1 text-xs">{channelUsername}</p>
          <p className="text-muted-foreground text-xs">
            {viewsFormatted} • {createdAtFormatted}
          </p>
        </div>
      </div>
    </Link>
  );
}
