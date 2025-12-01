import { VideoCard } from '@/components/video-card';

type Props = {
  videos: Array<{
    title: string;
    id: number;
    views: string;
    uploadedAt: string;
  }>;
};

export function ChannelVideoGrid({ videos }: Props) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {videos.map((video, index) => (
        <VideoCard
          key={index}
          id={video.id}
          title={video.title}
          views={video.views}
          uploadedAt={video.uploadedAt}
        />
      ))}
    </div>
  );
}
