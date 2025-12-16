import { VideoCardSkeleton } from '@/components/skeletons/VideoCardSkeleton';

export function VideosGridFallback() {
  return Array.from({ length: 12 }).map((_, i) => <VideoCardSkeleton key={i} />);
}
