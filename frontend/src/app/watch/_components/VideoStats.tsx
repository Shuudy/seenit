import { useFormatRelativeTime } from '@/utils/format-relative-time';
import { useFormatViews } from '@/utils/format-views';

export function VideoStats({ views, uploadedAt }: { views: number; uploadedAt: string }) {
  const formatViews = useFormatViews();
  const formatRelativeTime = useFormatRelativeTime();
  return (
    <p className="text-muted-foreground mb-2 text-xs" suppressHydrationWarning>
      {formatViews(views)} • {formatRelativeTime(uploadedAt)}
    </p>
  );
}
