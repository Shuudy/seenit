import { useFormatRelativeTime } from '@/utils/format-relative-time';
import { useFormatViews } from '@/utils/format-views';

interface VideoInfoProps {
  title: string;
  username: string;
  views: number;
  createdAt: string;
}

export function VideoInfo({ title, username, views, createdAt }: VideoInfoProps) {
  const formatViews = useFormatViews();
  const formatRelativeTime = useFormatRelativeTime();

  return (
    <div className="min-w-0 flex-1">
      <p className="text-foreground group-hover:text-muted-foreground line-clamp-2 text-xs font-medium">
        {title}
      </p>
      <p className="text-muted-foreground mt-1 text-xs">{username}</p>
      <p className="text-muted-foreground text-xs" suppressHydrationWarning>
        {formatViews(views)} • {formatRelativeTime(createdAt)}
      </p>
    </div>
  );
}
