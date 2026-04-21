import { Suspense } from 'react';

import { RecommendedVideoListFallback } from '@/app/watch/_components/fallbacks/RecommendedVideoListFallback';
import { VideoCommentsFallback } from '@/app/watch/_components/fallbacks/VideoCommentsFallback';
import { VideoInfoFallback } from '@/app/watch/_components/fallbacks/VideoInfoFallback';
import { RecommendedVideoList } from '@/app/watch/_components/RecommendedVideoList';
import { RecommendedVideoTitle } from '@/app/watch/_components/RecommendedVideoTitle';
import { VideoComments } from '@/app/watch/_components/VideoComments';
import { VideoDetails } from '@/app/watch/_components/VideoDetails';
import { Header } from '@/components/Header';

export default async function WatchPage() {
  return (
    <div className="bg-background min-h-screen">
      <Header />

      <main className="mt-16 w-full px-2 py-6 md:px-4">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 md:px-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Suspense fallback={<VideoInfoFallback />}>
              <VideoDetails />
            </Suspense>

            <div className="mt-6">
              <Suspense fallback={<VideoCommentsFallback />}>
                <VideoComments />
              </Suspense>
            </div>
          </div>

          <div className="lg:col-span-1">
            <RecommendedVideoTitle />
            <Suspense fallback={<RecommendedVideoListFallback />}>
              <RecommendedVideoList />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}
