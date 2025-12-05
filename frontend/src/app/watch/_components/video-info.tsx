import { formatRelativeTime } from '@/utils/format-relative-time';
import { formatViews } from '@/utils/format-views';

export function VideoInfo({
  title,
  username,
  views,
  createdAt,
}: {
  title: string;
  username: string;
  views: number;
  createdAt: string;
}) {
  const viewsFormatted = formatViews(views);
  const createdAtFormatted = formatRelativeTime(createdAt);

  return (
    <div className="min-w-0 flex-1">
      <p className="text-foreground group-hover:text-muted-foreground line-clamp-2 text-xs font-medium">
        {title}
      </p>
      <p className="text-muted-foreground mt-1 text-xs">{username}</p>
      <p className="text-muted-foreground text-xs">
        {viewsFormatted} • {createdAtFormatted}
      </p>
    </div>
  );
}
