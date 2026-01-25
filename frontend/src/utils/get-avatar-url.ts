export function getAvatarUrl(username: string, avatarUrl?: string | null): string {
  if (!avatarUrl || avatarUrl.trim() === '') {
    return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(username)}&chars=1`;
  }
  return avatarUrl;
}
