'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function ErrorPage({ reset }: { reset: () => void }) {
  const t = useTranslations('error');

  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-xl text-center">
        <div className="mb-6 flex justify-center">
          <svg
            aria-hidden="true"
            className="h-16 w-16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            style={{ color: 'var(--color-destructive)' }}
          >
            <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
            <path
              d="M12 8v4m0 4h.01"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="bg-card border-border rounded-lg border p-8">
          <h1 className="text-foreground mb-2 text-2xl font-semibold">{t('title')}</h1>

          <p className="text-muted-foreground mb-6 text-sm">{t('description')}</p>

          <div className="border-border bg-secondary text-muted-foreground mb-6 rounded-md border p-3 text-sm">
            <p>{t('support')}</p>
          </div>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <button
              onClick={() => reset()}
              className="bg-foreground hover:bg-foreground/90 text-background cursor-pointer rounded-lg px-6 py-2 text-sm transition-colors"
            >
              {t('retry')}
            </button>

            <Link
              href="/"
              className="bg-secondary border-border text-foreground hover:bg-secondary/70 flex items-center justify-center rounded-lg border px-6 py-2 text-sm transition-colors"
            >
              {t('backHome')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
