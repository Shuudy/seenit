export function VideoInfo({
  title,
  username,
  viewsFormatted,
  createdAtFormatted,
}: {
  title: string;
  username: string;
  viewsFormatted: string;
  createdAtFormatted: string;
}) {
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