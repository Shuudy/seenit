import { useFormatter, useTranslations } from 'next-intl';

export function useFormatSubscribers() {
  const format = useFormatter();
  const t = useTranslations('common');

  return (count: number) => {
    const value = Number.isFinite(count) && count > 0 ? count : 0;

    const formattedNumber = format.number(value, { notation: 'compact', maximumFractionDigits: 1 });

    return t('subscriber_count', { count: value, formattedNumber });
  };
}
