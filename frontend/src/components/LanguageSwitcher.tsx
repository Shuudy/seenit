import { getLocale } from 'next-intl/server';

import { LanguageSwitcherClient } from '@/components/LanguageSwitcherClient';
import { Locale } from '@/messages';

export async function LanguageSwitcher() {
  // Get the locale from the request
  const locale = await getLocale();

  return <LanguageSwitcherClient locale={locale as Locale} />;
}
