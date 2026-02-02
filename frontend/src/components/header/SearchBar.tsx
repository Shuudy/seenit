'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

export function SearchBar() {
  const t = useTranslations('common');
  const searchParameters = useSearchParams();
  const initialQuery = searchParameters.get('q') ?? '';
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      router.push(`/?q=${encodeURIComponent(trimmedQuery)}`);
    } else {
      router.push('/');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="hidden max-w-md flex-1 sm:flex">
      <div className="bg-secondary flex w-full items-center gap-2 rounded-full px-4 py-2">
        <svg
          className="text-muted-foreground h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
          placeholder={t('search')}
          aria-label={t('search')}
          className="text-foreground placeholder-muted-foreground flex-1 bg-transparent text-sm outline-none"
        />
      </div>
    </form>
  );
}
