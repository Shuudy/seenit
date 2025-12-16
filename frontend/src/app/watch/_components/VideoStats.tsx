import { formatRelativeTime } from '@/utils/format-relative-time';
import { formatViews } from '@/utils/format-views';

interface VideoStatsProps {
  views: number;
  uploadedAt: string;
}

export function VideoStats({ views, uploadedAt }: VideoStatsProps) {
  const viewsFormatted = formatViews(views);
  const createdAtFormatted = formatRelativeTime(uploadedAt);
  return (
    <p className="text-muted-foreground mb-2 text-xs">
      {viewsFormatted} • {createdAtFormatted}
    </p>
  );
}
