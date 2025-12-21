'use client';

import { VideoPlayer } from '@/app/watch/_components/video-player';
import { VideoTitle } from '@/app/watch/_components/video-title';
import { VideoChannelInfo } from '@/app/watch/_components/video-channel-info';
import { LikeDislikeButtons } from '@/app/watch/_components/like-dislike-buttons';
import { VideoDescription } from '@/app/watch/_components/video-description';
import { useVideoDetailsSuspenseQuery } from '@/app/watch/_hooks/queries/useVideoDetailsSuspenseQuery';
import { useParams } from 'next/navigation';

export function VideoDetails() {
  const { id: videoId } = useParams<{ id: string }>();

  const { data: video } = useVideoDetailsSuspenseQuery(videoId);
  return (
    <>
      <VideoPlayer thumbnail={video.thumbnail} title={video.title} />
      <VideoTitle title={video.title} />

      <div className="border-secondary flex flex-col gap-4 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
        <VideoChannelInfo user={video.user} channelSubscribers={351} />

        <LikeDislikeButtons initialLikes={video.likes_count} />
      </div>

      <VideoDescription
        views={video.count_views}
        uploadedAt={video.created_at}
        description={video.description}
      />
    </>
  );
}
