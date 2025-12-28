export function getAvatarUrl(username: string, avatarUrl?: string | null): string {
  return (
    avatarUrl ??
    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(username)}&chars=1`
  );
}
