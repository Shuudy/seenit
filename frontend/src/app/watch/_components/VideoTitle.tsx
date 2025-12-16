'use client';

interface VideoTitleProps {
  title: string;
}

export function VideoTitle({ title }: VideoTitleProps) {
  return <h1 className="text-foreground mb-3 text-lg font-bold">{title}</h1>;
}
