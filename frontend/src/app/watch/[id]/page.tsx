'use client';

import { Header } from '@/components/header';
import { RecommendedVideoList } from '@/app/watch/_components/recommended-video-list';
import { Suspense } from 'react';
import { VideoDetails } from '@/app/watch/_components/video-details';
import { RecommendedVideoListFallback } from '@/app/watch/_components/fallbacks/recommended-video-list-fallback';
import { VideoInfoFallback } from '@/app/watch/_components/fallbacks/video-info-fallback';
import { VideoComments } from '@/app/watch/_components/video-comments';
import { VideoCommentsFallback } from '@/app/watch/_components/fallbacks/video-comments-fallback';

export default function WatchPage() {
  return (
    <div className="bg-background min-h-screen">
      <Header />

      <main className="mt-16 w-full px-2 py-6 md:px-4">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 md:px-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Suspense fallback={<VideoInfoFallback />}>
              <VideoDetails />
            </Suspense>

            <Suspense fallback={<VideoCommentsFallback />}>
              <VideoComments />
            </Suspense>
          </div>

          <div className="lg:col-span-1">
            <h3 className="text-foreground mb-4 text-sm font-bold">Recommandations</h3>
            <Suspense fallback={<RecommendedVideoListFallback />}>
              <RecommendedVideoList />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}
