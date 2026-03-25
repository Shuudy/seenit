'use client';

import { useParams } from 'next/navigation';

import { LikeDislikeButtons } from '@/app/watch/_components/LikeDislikeButtons';
import { ShareButton } from '@/app/watch/_components/ShareButton';
import { VideoChannelInfo } from '@/app/watch/_components/VideoChannelInfo';
import { VideoDescription } from '@/app/watch/_components/VideoDescription';
import { VideoPlayer } from '@/app/watch/_components/VideoPlayer';
import { VideoTitle } from '@/app/watch/_components/VideoTitle';
import { useVideoDetailsSuspenseQuery } from '@/app/watch/_hooks/queries/useVideoDetailsSuspenseQuery';

export function VideoDetails() {
  const { id: videoId } = useParams<{ id: string }>();

  const { data: video } = useVideoDetailsSuspenseQuery(videoId);
  return (
    <>
      <VideoPlayer thumbnail={video.thumbnail} url={video.url} />
      <VideoTitle title={video.title} />

      <div className="border-secondary flex flex-col gap-4 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
        <VideoChannelInfo user={video.user} channelSubscribers={351} />

        <div className="flex gap-2">
          <LikeDislikeButtons initialLikes={video.likes_count} />
          <ShareButton title={video.title} />
        </div>
      </div>

      <VideoDescription
        views={video.count_views}
        uploadedAt={video.created_at}
        description={video.description}
      />
    </>
  );
}
