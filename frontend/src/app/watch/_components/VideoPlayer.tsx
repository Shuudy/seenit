'use client';

interface VideoPlayerProps {
  thumbnail?: string;
  title: string;
}

export function VideoPlayer({ thumbnail, title }: VideoPlayerProps) {
  return (
    <div className="mb-3 aspect-video w-full overflow-hidden rounded-lg bg-black">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={thumbnail} alt={title} className="h-full w-full object-cover" />
    </div>
  );
}
