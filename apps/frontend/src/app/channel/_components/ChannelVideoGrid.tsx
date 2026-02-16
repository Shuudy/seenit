'use client';

import { VideoCard } from '@/components/VideoCard';
import { useChannelVideoGridSuspenseQuery } from '@/app/channel/_hooks/queries/useChannelVideoGridSuspenseQuery';
import { useParams } from 'next/navigation';

export function ChannelVideoGrid() {
  const { id: channelId } = useParams<{ id: string }>();

  const { data: videos } = useChannelVideoGridSuspenseQuery(channelId);

  return videos.map(video => <VideoCard key={video.id} video={video} showChannel={false} />);
}
