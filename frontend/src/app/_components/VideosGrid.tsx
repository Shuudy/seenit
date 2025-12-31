'use client';

import { VideoCard } from '@/components/VideoCard';
import { useVideosSuspenseQuery } from '@/app/_hooks/queries/useVideosSuspenseQuery';
import { useSearchParams } from 'next/navigation';

export function VideosGrid() {
  const { data: videos } = useVideosSuspenseQuery();
  const searchParameters = useSearchParams();
  const searchQuery = searchParameters.get('q')?.toLowerCase() ?? '';

  const filteredVideos = searchQuery
    ? videos.filter(video => video.title.toLowerCase().includes(searchQuery))
    : videos;

  if (searchQuery && filteredVideos.length === 0) {
    return (
      <div className="col-span-full py-12 text-center">
        <p className="text-muted-foreground text-lg">
          Aucune vidéo trouvée pour &quot;{searchParameters.get('q')}&quot;
        </p>
      </div>
    );
  }

  return filteredVideos.map(video => <VideoCard key={video.id} video={video} />);
}
