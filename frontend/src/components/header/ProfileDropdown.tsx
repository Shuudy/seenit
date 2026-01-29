import { useTranslations } from 'next-intl';
import Link from 'next/link';

export function ProfileDropdown() {
  const t = useTranslations('header');

  return (
    <div className="bg-card border-border absolute top-full right-0 z-50 mt-2 w-48 overflow-hidden rounded-lg border shadow-lg">
      <Link
        href="/dashboard"
        className="hover:bg-secondary flex items-center gap-3 px-4 py-2.5 text-sm transition-colors"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </svg>
        <span>{t('dashboard')}</span>
      </Link>
      <div className="border-border border-t"></div>
      <button
        onClick={() => {
          console.log('Logout');
        }}
        className="hover:bg-secondary flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
        <span>{t('logout')}</span>
      </button>
    </div>
  );
}
