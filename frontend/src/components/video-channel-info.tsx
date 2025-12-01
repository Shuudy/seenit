'use client';

import Link from 'next/link';
import type { User } from '@/types/user';

interface VideoChannelInfoProps {
  user: User;
  channelSubscribers: string;
}

export function VideoChannelInfo({ user, channelSubscribers }: VideoChannelInfoProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="bg-secondary flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full">
        <span className="text-foreground text-sm font-semibold">
          {user.username[0].toUpperCase()}
        </span>
      </div>
      <div className="flex-1">
        <Link
          href={`/channel/${user.id}`}
          className="text-foreground hover:text-muted-foreground m-0 block cursor-pointer text-sm font-medium no-underline"
        >
          {user.username}
        </Link>
        <p className="text-muted-foreground text-xs">{channelSubscribers}</p>
      </div>
      <button className="bg-foreground text-background hover:bg-muted-foreground cursor-pointer rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors">
        S&apos;abonner
      </button>
    </div>
  );
}
