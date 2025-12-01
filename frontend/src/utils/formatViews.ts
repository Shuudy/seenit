export function formatViews(value: number | string): string {
  const num = typeof value === 'string' ? parseInt(value.replace(/,/g, '')) : value;

  if (num >= 1_000_000)
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '').replace('.', ',') + 'M';
  if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, '').replace('.', ',') + 'K';
  return num.toString();
}
