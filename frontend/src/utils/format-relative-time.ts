import { useFormatter, useNow } from 'next-intl';

export function useFormatRelativeTime() {
  const format = useFormatter();
  const now = useNow();

  return (iso: string) => {
    return format.relativeTime(new Date(iso), now);
  };
}
