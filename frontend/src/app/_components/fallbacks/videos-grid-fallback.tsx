import { VideoCardSkeleton } from '@/components/skeletons/video-card-skeleton';

export function VideosGridFallback() {
  return Array.from({ length: 12 }).map((_, i) => <VideoCardSkeleton key={i} />);
}
