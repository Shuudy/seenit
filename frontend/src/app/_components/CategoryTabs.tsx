'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

const categories = [
  'all',
  'gaming',
  'music',
  'live',
  'mixes',
  'trending',
  'recentlyUploaded',
] as const;

type CategoryId = (typeof categories)[number];

export function CategoryTabs() {
  const t = useTranslations('categories');
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');

  return (
    <div className="scrollbar-hide mb-4 flex gap-3 overflow-x-auto pb-2">
      {categories.map(id => (
        <button
          key={id}
          onClick={() => setActiveCategory(id)}
          className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
            activeCategory === id
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-foreground hover:bg-secondary/90'
          }`}
        >
          {t(id)}
        </button>
      ))}
    </div>
  );
}
