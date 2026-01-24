'use client';

import { useRouter } from 'next/navigation';

export function LanguageSwitcherClient({ locale }: { locale: 'en' | 'fr' }) {
  const router = useRouter();

  const toggleLanguage = () => {
    const nextLocale = locale === 'en' ? 'fr' : 'en';
    // eslint-disable-next-line unicorn/no-document-cookie
    document.cookie = `locale=${nextLocale};path=/;max-age=31536000`;
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
