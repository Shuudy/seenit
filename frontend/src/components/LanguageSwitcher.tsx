'use client';

import { useRouter } from 'next/navigation';

const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  // eslint-disable-next-line unicorn/no-document-cookie
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

export function LanguageSwitcher() {
  const router = useRouter();

  const changeLanguage = (locale: string) => {
    setCookie('locale', locale, 365);
    router.refresh();
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => changeLanguage('en')}
        className="rounded bg-gray-200 px-3 py-1 text-sm transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage('fr')}
        className="rounded bg-gray-200 px-3 py-1 text-sm transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
      >
        FR
      </button>
    </div>
  );
}
