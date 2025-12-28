export function getAvatarUrl(username: string, avatarUrl?: string | null): string {
  return (
    avatarUrl ??
    `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=random&color=fff`
  );
}
