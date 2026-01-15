import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';
import { Locale, LOCALES } from '../messages';

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get('locale')?.value;
  const locale: Locale =
    cookieValue && LOCALES.includes(cookieValue as Locale) ? (cookieValue as Locale) : 'en';
  return {
    locale,
    messages: (await import(`../messages`))[locale],
  };
});
