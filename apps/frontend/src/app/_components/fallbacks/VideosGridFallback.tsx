import { VideoCardSkeleton } from '@/components/skeletons/VideoCardSkeleton';

export function VideosGridFallback() {
  return Array.from({ length: 12 }).map((_, index) => <VideoCardSkeleton key={index} />);
}
