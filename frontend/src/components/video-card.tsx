"use client";

import Image from "next/image";

interface VideoCardProps {
  thumbnail?: string;
  title: string;
  channel: string;
  views: string;
  uploadedAt: string;
}

export function VideoCard({
  thumbnail = "/video-thumbnail.jpg",
  title,
  channel,
  views,
  uploadedAt,
}: VideoCardProps) {
  return (
    <a href="#" className="flex flex-col gap-2 group cursor-pointer">
      <div className="relative bg-secondary rounded-lg overflow-hidden aspect-video">
        <Image
          src={thumbnail}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="w-full h-full object-cover group-hover:brightness-75 transition-all"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black/60 rounded-full p-3 hover:bg-black/80 transition-all">
            <svg className="w-6 h-6 text-white fill-white" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex gap-3 px-0">
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm line-clamp-2 group-hover:text-foreground text-foreground">
            {title}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">{channel}</p>
          <p className="text-xs text-muted-foreground">
            {views} • {uploadedAt}
          </p>
        </div>
      </div>
    </a>
  );
}
