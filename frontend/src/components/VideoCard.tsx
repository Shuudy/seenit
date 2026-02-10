import Image from 'next/image';
import Link from 'next/link';

import { useFormatViews } from '@/utils/format-views';
import { useFormatRelativeTime } from '@/utils/format-relative-time';
import { formatDuration } from '@/utils/format-duration';
import type { Video } from '@/types/video';

export function VideoCard({ video, showChannel = true }: { video: Video; showChannel?: boolean }) {
  const formatViews = useFormatViews();
  const formatRelativeTime = useFormatRelativeTime();
  const viewsFormatted = formatViews(video.count_views);
  const createdAtFormatted = formatRelativeTime(video.created_at);
  const durationFormatted = formatDuration(video.duration);
  const channelUsername = showChannel ? video.user.username : undefined;

  return (
    <Link href={`/watch/${video.id}`} className="group flex cursor-pointer flex-col gap-2">
      <div className="bg-secondary relative aspect-video overflow-hidden rounded-lg">
        <Image
          src={video.thumbnail || '/video-thumbnail.jpg'}
          alt={video.title}
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
            {video.title}
          </h3>
          <p className="text-muted-foreground mt-1 text-xs">{channelUsername}</p>
          <p className="text-muted-foreground text-xs" suppressHydrationWarning>
            {viewsFormatted} • {createdAtFormatted}
          </p>
        </div>
      </div>
    </Link>
  );
}
