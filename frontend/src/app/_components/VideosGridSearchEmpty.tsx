'use client';

import { useTranslations } from 'next-intl';

type Props = {
  query?: string | null;
};

export function VideosGridSearchEmpty({ query }: Props) {
  const t = useTranslations('homePage');
  const display = query ? (query.length > 100 ? `${query.slice(0, 100)}…` : query) : '';

  return (
    <div className="col-span-full flex min-h-96 items-center justify-center">
      <div className="text-center">
        <div className="mb-4 flex justify-center">
          <svg
            className="text-muted-foreground h-16 w-16 opacity-50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <h2 className="text-foreground mb-2 text-lg font-medium">
          {t('noResultsFor')} &quot;{display}&quot;
        </h2>
        <p className="text-muted-foreground mb-6 text-sm">{t('tryAnotherSearch')}</p>
      </div>
    </div>
  );
}
