import { useTranslations } from 'next-intl';

export function RecommendedVideoTitle() {
  const t = useTranslations('watch');
  return <h3 className="text-foreground mb-4 text-sm font-bold">{t('recommendations')}</h3>;
}
