export function formatDuration(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const paddedSecs = secs.toString().padStart(2, '0');
  const paddedMins = hours > 0 ? minutes.toString().padStart(2, '0') : minutes.toString();

  if (hours > 0) {
    return `${hours}:${paddedMins}:${paddedSecs}`;
  }

  return `${paddedMins}:${paddedSecs}`;
}
