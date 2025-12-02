import { VideoCard } from '@/components/video-card';
import { useVideosSuspenseQuery } from '../_hooks/queries/useVideosSuspenseQuery';

export function VideosGrid() {
  const { data: videos } = useVideosSuspenseQuery();

  return videos.map(video => <VideoCard key={video.id} video={video} />);
}
