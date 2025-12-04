interface VideoStatsProps {
  views: number;
  uploadedAt: string;
}

export function VideoStats({ views, uploadedAt }: VideoStatsProps) {
  return (
    <p className="text-muted-foreground mb-2 text-xs">
      {views} vues • {uploadedAt}
    </p>
  );
}
