import Link from 'next/link';
import { useTranslations } from 'next-intl';

export function ProfileDefaultUser() {
  const t = useTranslations('auth');

  return (
    <Link
      href="/login"
      className="hover:bg-secondary cursor-pointer rounded-full p-2 transition-colors"
      aria-label={t('signIn')}
    >
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    </Link>
  );
}
