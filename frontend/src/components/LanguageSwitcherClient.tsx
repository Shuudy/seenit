'use client';

import { Locale } from '@/messages';
import { useRouter } from 'next/navigation';

import Cookies from 'js-cookie';

export function LanguageSwitcherClient({ locale }: { locale: Locale }) {
  const router = useRouter();

  const toggleLanguage = () => {
    const nextLocale = locale === 'en' ? 'fr' : 'en';
    Cookies.set('locale', nextLocale, { path: '/', expires: 365 });
    router.refresh();
  };

  return (
    <button
      onClick={toggleLanguage}
      className="bg-secondary text-foreground hover:bg-secondary/90 cursor-pointer rounded-full px-3 py-1.5 text-sm font-medium transition-colors"
    >
      {locale.toUpperCase()}
    </button>
  );
}
