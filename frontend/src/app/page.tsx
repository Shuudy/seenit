'use client';

import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';

import { Suspense, useState } from 'react';
import { VideosGrid } from '@/app/_components/videos-grid';
import { VideosGridFallback } from '@/app/_components/videos-grid-fallback';

export default function Home() {
  const categories = [
    'Tous',
    'Jeux',
    'Musique',
    'En direct',
    'Mélanges',
    'Tendances',
    'Récemment mis en ligne',
  ] as const;

  type Category = (typeof categories)[number];

  const [activeCategory, setActiveCategory] = useState<Category>('Tous');

  return (
    <div className="bg-background min-h-screen">
      <Header />
      <Sidebar />

      <main className="mt-16 px-4 py-6 md:ml-64 md:px-6">
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

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Suspense fallback={<VideosGridFallback />}>
            <VideosGrid />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
