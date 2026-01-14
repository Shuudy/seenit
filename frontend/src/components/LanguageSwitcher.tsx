import { cookies } from 'next/headers';
import { LanguageSwitcherClient } from './LanguageSwitcherClient';

export async function LanguageSwitcher() {
  const cookieStore = await cookies();
  const locale = cookieStore.get('locale')?.value === 'fr' ? 'fr' : 'en';

  return <LanguageSwitcherClient locale={locale} />;
}
