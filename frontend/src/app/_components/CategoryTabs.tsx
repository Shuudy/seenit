'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export function CategoryTabs() {
  const t = useTranslations('categories');
  const categories = [
    t('all'),
    t('gaming'),
    t('music'),
    t('live'),
    t('mixes'),
    t('trending'),
    t('recentlyUploaded'),
  ] as const;

  type Category = (typeof categories)[number];

  const [activeCategory, setActiveCategory] = useState<Category>(t('all'));

  return (
    <div className="scrollbar-hide mb-4 flex gap-3 overflow-x-auto pb-2">
      {categories.map(category => (
        <button
          key={category}
          onClick={() => setActiveCategory(category)}
          className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
            activeCategory === category
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-foreground hover:bg-secondary/90'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
