import { useFormatter, useTranslations } from 'next-intl';

export function useFormatViews() {
  const format = useFormatter();
  const t = useTranslations('common');

  return (count: number) => {
    const formattedNumber = format.number(count, { notation: 'compact', maximumFractionDigits: 1 });

    return t('view_count', { count, formattedNumber });
  };
}
