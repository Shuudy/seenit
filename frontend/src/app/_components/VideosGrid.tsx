'use client';

import { VideoCard } from '@/components/VideoCard';
import { useVideosSuspenseQuery } from '@/app/_hooks/queries/useVideosSuspenseQuery';
import { useSearchParams } from 'next/navigation';
import { VideosGridSearchEmpty } from '@/app/_components/VideosGridSearchEmpty';

export function VideosGrid() {
  const { data: videos } = useVideosSuspenseQuery();
  const searchParameters = useSearchParams();
  const searchQuery = searchParameters.get('q')?.toLowerCase() ?? '';

  const filteredVideos = searchQuery
    ? videos.filter(video => video.title.toLowerCase().includes(searchQuery))
    : videos;

  if (searchQuery && filteredVideos.length === 0) {
    return <VideosGridSearchEmpty query={searchParameters.get('q')} />;
  }

  return filteredVideos.map(video => <VideoCard key={video.id} video={video} />);
}
