import { getTranslations } from 'next-intl/server';

const formatter = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 1 });

export async function formatSubscribers(count: number): Promise<string> {
  const t = await getTranslations('common');

  if (!Number.isFinite(count) || count <= 0) return `0 ${t('subscriber', { count: 0 })}`;
  if (count === 1) return `1 ${t('subscriber', { count: 1 })}`;

  if (count >= 1e9)
    return `${formatter.format(count / 1e9)}${t('billion')} ${t('subscriber', { count })}`;
  if (count >= 1e6)
    return `${formatter.format(count / 1e6)}${t('million')} ${t('subscriber', { count })}`;
  if (count >= 1e3)
    return `${formatter.format(count / 1e3)}${t('thousand')} ${t('subscriber', { count })}`;
  return `${formatter.format(count)} ${t('subscriber', { count })}`;
}

import { useTranslations } from 'next-intl';

export function useFormatSubscribers() {
  const t = useTranslations('common');

  return (count: number): string => {
    if (!Number.isFinite(count) || count <= 0) return `0 ${t('subscriber', { count: 0 })}`;
    if (count === 1) return `1 ${t('subscriber', { count: 1 })}`;

    if (count >= 1e9)
      return `${formatter.format(count / 1e9)}${t('billion')} ${t('subscriber', { count })}`;
    if (count >= 1e6)
      return `${formatter.format(count / 1e6)}${t('million')} ${t('subscriber', { count })}`;
    if (count >= 1e3)
      return `${formatter.format(count / 1e3)}${t('thousand')} ${t('subscriber', { count })}`;
    return `${formatter.format(count)} ${t('subscriber', { count })}`;
  };
}
