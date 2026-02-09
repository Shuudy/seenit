'use client';

import { VideoCard } from '@/components/VideoCard';
import { useVideosSuspenseQuery } from '@/app/_hooks/queries/useVideosSuspenseQuery';
import { VideosGridSearchEmpty } from '@/app/_components/VideosGridSearchEmpty';
import { useQueryState } from 'nuqs';

export function VideosGrid() {
  const { data: videos } = useVideosSuspenseQuery();

  const [q] = useQueryState('q', { defaultValue: '' });
  const searchQuery = q.toLowerCase();

  const filteredVideos = searchQuery
    ? videos.filter(video => video.title.toLowerCase().includes(searchQuery))
    : videos;

  if (searchQuery && filteredVideos.length === 0) {
    return <VideosGridSearchEmpty query={q} />;
  }

  return filteredVideos.map(video => <VideoCard key={video.id} video={video} />);
}
