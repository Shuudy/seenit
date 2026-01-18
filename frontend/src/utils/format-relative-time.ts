import { useLocale } from 'next-intl';

function formatRelativeTimeInternal(iso: string, locale: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  const abs = Math.abs(diff);

  const rtf = new Intl.RelativeTimeFormat(locale, {
    numeric: 'always',
    style: 'long',
  });

  const units = [
    { key: 'year' as const, val: 31_536_000_000, limit: 27_648_000_000 },
    { key: 'month' as const, val: 2_629_800_000, limit: 2_160_000_000 },
    { key: 'week' as const, val: 604_800_000, limit: 518_400_000 },
    { key: 'day' as const, val: 86_400_000, limit: 79_200_000 },
    { key: 'hour' as const, val: 3_600_000, limit: 3_000_000 },
    { key: 'minute' as const, val: 60_000, limit: 45_000 },
    { key: 'second' as const, val: 1000, limit: 0 },
  ];

  const unit = units.find(u => abs >= u.limit) || units.at(-1)!;
  const value = Math.round(diff / unit.val);

  return rtf.format(value, unit.key);
}

export function formatRelativeTime(iso: string): string {
  return formatRelativeTimeInternal(iso, 'fr');
}

export function useFormatRelativeTime() {
  const locale = useLocale();

  return (iso: string): string => {
    return formatRelativeTimeInternal(iso, locale);
  };
}
