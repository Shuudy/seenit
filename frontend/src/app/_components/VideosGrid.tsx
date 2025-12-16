'use client';

import { VideoCard } from '@/components/VideoCard';
import { useVideosSuspenseQuery } from '@/app/_hooks/queries/useVideosSuspenseQuery';

export function VideosGrid() {
  const { data: videos } = useVideosSuspenseQuery();

  return videos.map(video => <VideoCard key={video.id} video={video} />);
}
