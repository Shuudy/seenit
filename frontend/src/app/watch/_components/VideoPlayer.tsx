interface VideoPlayerProps {
  thumbnail?: string;
  url: string;
}

export function VideoPlayer({ thumbnail, url }: VideoPlayerProps) {
  return (
    <div className="mb-3 aspect-video w-full overflow-hidden rounded-lg bg-black">
      <video
        src={url}
        poster={thumbnail}
        controls
        autoPlay={false}
        className="h-full w-full bg-black object-contain"
        controlsList="nodownload"
        playsInline
      ></video>
    </div>
  );
}
