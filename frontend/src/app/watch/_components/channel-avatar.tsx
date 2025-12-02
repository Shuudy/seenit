export function ChannelAvatar({ username }: { username: string }) {
  return (
    <div className="bg-secondary flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full">
      <span className="text-foreground text-sm font-semibold">{username[0].toUpperCase()}</span>
    </div>
  );
}
