import { getRequestConfig } from 'next-intl/server';
import { cookies, headers } from 'next/headers';
import { Locale, LOCALES } from '@/messages';

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get('locale')?.value;

  let locale: Locale = 'en';

  if (cookieLocale && LOCALES.includes(cookieLocale as Locale)) {
    locale = cookieLocale as Locale;
  } else {
    const headerStore = await headers();
    const headerLocale = headerStore.get('accept-language')?.split(',')[0]?.split('-')[0] as
      | Locale
      | undefined;

    if (headerLocale && LOCALES.includes(headerLocale)) {
      locale = headerLocale;
    }
  }

  return {
    locale,
    // eslint-disable-next-line unicorn/no-await-expression-member
    messages: (await import(`../messages`))[locale],
  };
});
