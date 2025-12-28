'use client';

import { VideoPlayer } from '@/app/watch/_components/VideoPlayer';
import { VideoTitle } from '@/app/watch/_components/VideoTitle';
import { VideoChannelInfo } from '@/app/watch/_components/VideoChannelInfo';
import { LikeDislikeButtons } from '@/app/watch/_components/LikeDislikeButtons';
import { ShareButton } from '@/app/watch/_components/ShareButton';
import { VideoDescription } from '@/app/watch/_components/VideoDescription';
import { useVideoDetailsSuspenseQuery } from '@/app/watch/_hooks/queries/useVideoDetailsSuspenseQuery';
import { useParams } from 'next/navigation';

export function VideoDetails() {
  const { id: videoId } = useParams<{ id: string }>();

  const { data: video } = useVideoDetailsSuspenseQuery(videoId);

  const { thumbnail, url, title, user, likes_count, count_views, created_at, description } = video;

  return (
    <>
      <VideoPlayer thumbnail={thumbnail} url={url} />
      <VideoTitle title={title} />

      <div className="border-secondary flex flex-col gap-4 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
        <VideoChannelInfo user={user} channelSubscribers={351} />

        <div className="flex gap-2">
          <LikeDislikeButtons initialLikes={likes_count} />
          <ShareButton title={title} />
        </div>
      </div>

      <VideoDescription views={count_views} uploadedAt={created_at} description={description} />
    </>
  );
}
