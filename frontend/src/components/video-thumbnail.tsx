import Image from 'next/image';

export function VideoThumbnail({ thumbnail, title }: { thumbnail: string | null; title: string }) {
  return (
    <div className="bg-secondary relative h-20 w-32 flex-shrink-0 overflow-hidden rounded">
      <Image
        src={thumbnail || '/video-thumbnail.jpg'}
        alt={title}
        fill
        sizes="(max-width: 768px) 50vw, 128px"
        className="h-full w-full object-cover transition-all group-hover:brightness-75"
      />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
        <svg className="h-4 w-4 fill-white text-white" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>
  );
}
