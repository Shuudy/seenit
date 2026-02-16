import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';

import { Suspense } from 'react';
import { VideosGrid } from '@/app/_components/VideosGrid';
import { VideosGridFallback } from '@/app/_components/fallbacks/VideosGridFallback';
import { CategoryTabs } from '@/app/_components/CategoryTabs';

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      <Header />
      <Sidebar />

      <main className="mt-16 px-4 py-6 md:ml-64 md:px-6">
        <CategoryTabs />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Suspense fallback={<VideosGridFallback />}>
            <VideosGrid />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
