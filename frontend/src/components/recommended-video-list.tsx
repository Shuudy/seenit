'use client';

import { RecommendedVideoItem } from './recommended-video-item';

interface RecommendedVideoListProps {
  videos: Array<{
    title: string;
    channel: string;
    views: string;
    uploadedAt: string;
    thumbnail?: string;
  }>;
}

export function RecommendedVideoList({ videos }: RecommendedVideoListProps) {
  return (
    <div className="flex flex-col space-y-3">
      {videos.map((v, i) => (
        <RecommendedVideoItem key={i} {...v} />
      ))}
    </div>
  );
}
