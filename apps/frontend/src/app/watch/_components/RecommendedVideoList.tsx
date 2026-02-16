'use client';

import { useParams } from 'next/navigation';
import { RecommendedVideoItem } from '@/app/watch/_components/RecommendedVideoItem';
import { useRecommendedVideoListSuspenseQuery } from '@/app/watch/_hooks/queries/useRecommendedVideoListSuspenseQuery';

export function RecommendedVideoList() {
  const { id: videoId } = useParams<{ id: string }>();

  const { data: videos } = useRecommendedVideoListSuspenseQuery(videoId);

  return (
    <div className="flex flex-col space-y-3">
      {videos.map(video => (
        <RecommendedVideoItem key={video.id} video={video} />
      ))}
    </div>
  );
}
