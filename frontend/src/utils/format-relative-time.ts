export function formatRelativeTime(iso: string): string {
  const date = new Date(iso);
  const now = new Date();

  const diffMs = date.getTime() - now.getTime();
  const rtf = new Intl.RelativeTimeFormat('fr', { numeric: 'auto' });

  const units = [
    { ms: 1000, key: 'second' as const },
    { ms: 60_000, key: 'minute' as const },
    { ms: 3_600_000, key: 'hour' as const },
    { ms: 86_400_000, key: 'day' as const },
    { ms: 2_592_000_000, key: 'month' as const },
    { ms: 31_536_000_000, key: 'year' as const },
  ];

  const abs = Math.abs(diffMs);
  let unit = units[0];
  for (const u of units) {
    if (abs >= u.ms) unit = u;
  }

  const value = Math.round(diffMs / unit.ms);

  const text = rtf.format(value, unit.key);
  if (text === 'maintenant' || text.startsWith('dans')) return text;
  return `il y a ${text.replace('il y a ', '')}`;
}
