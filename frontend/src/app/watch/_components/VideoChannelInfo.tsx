'use client';

import Link from 'next/link';
import type { User } from '@/types/user';
import { ChannelAvatar } from '@/components/ChannelAvatar';
import { formatSubscribers } from '@/utils/format-subscribers';

interface VideoChannelInfoProps {
  user: User;
  channelSubscribers: number;
}

export function VideoChannelInfo({ user, channelSubscribers }: VideoChannelInfoProps) {
  const channelSubscribersFormatted = formatSubscribers(channelSubscribers);
  return (
    <div className="flex items-center gap-3">
      <ChannelAvatar username={user.username} avatarUrl={user.avatar_url} large />
      <div className="flex-1">
        <Link
          href={`/channel/${user.id}`}
          className="text-foreground hover:text-muted-foreground m-0 block cursor-pointer text-sm font-medium no-underline"
        >
          {user.username}
        </Link>
        <p className="text-muted-foreground text-xs">{channelSubscribersFormatted}</p>
      </div>
      <button className="bg-foreground text-background hover:bg-muted-foreground cursor-pointer rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors">
        S&apos;abonner
      </button>
    </div>
  );
}
