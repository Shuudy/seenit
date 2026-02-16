import { VideoCardSkeleton } from '@/components/skeletons/VideoCardSkeleton';

export function ChannelVideoGridFallback() {
  return Array.from({ length: 8 }).map((_, index) => <VideoCardSkeleton key={index} />);
}
