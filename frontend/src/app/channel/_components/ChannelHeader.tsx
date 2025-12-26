'use client';

import type { User } from '@/types/user';
import Image from 'next/image';
import { useState } from 'react';

interface ChannelHeaderProps {
  channel: User;
}

export function ChannelHeader({ channel }: ChannelHeaderProps) {
  const [isSubscribed, setIsSubscribed] = useState(false);

  return (
    <>
      <div className="from-accent/20 to-accent/10 relative z-0 h-40 w-full overflow-hidden bg-gradient-to-r md:h-56">
        <Image
          src={channel.banner ?? '/channel-banner.jpg'}
          alt="Channel banner"
          fill
          className="h-full w-full object-cover"
          sizes="100vw"
          priority
        />
        <div className="to-background/95 absolute inset-0 bg-gradient-to-b from-transparent via-transparent" />
      </div>

      <div className="relative">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="-mt-12 flex flex-col gap-4 pb-4 md:-mt-16 md:flex-row md:gap-6">
            <div className="relative z-10 flex-shrink-0">
              <Image
                src={channel.avatarUrl ?? '/channel-avatar.jpg'}
                alt={channel.username}
                width="160"
                height="160"
                className="border-background h-28 w-28 rounded-full border-4 object-cover shadow-lg md:h-40 md:w-40"
                sizes="(max-width: 768px) 112px, 160px"
                priority
              />
            </div>

            <div className="relative z-10 flex flex-1 flex-col justify-end">
              <div className="mb-1">
                <h1 className="text-2xl font-bold md:text-3xl">{channel.username}</h1>
              </div>
              <p className="text-muted-foreground mb-2 text-sm">{channel.handle}</p>

              <div className="mb-3 flex gap-4 text-sm">
                <span className="text-muted-foreground">
                  <span className="text-foreground font-semibold">{channel.subscribers}</span>{' '}
                  abonnés
                </span>
                <span className="text-muted-foreground">
                  <span className="text-foreground font-semibold">{channel.videos}</span> vidéos
                </span>
              </div>

              <p className="text-muted-foreground mb-3 line-clamp-2 max-w-3xl text-sm">
                {channel.bio}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setIsSubscribed(!isSubscribed)}
                  className={`cursor-pointer rounded-full px-5 py-2 text-sm font-medium transition-all ${
                    isSubscribed
                      ? 'bg-secondary text-foreground hover:bg-secondary/80'
                      : 'bg-accent text-accent-foreground hover:bg-accent/90'
                  }`}
                >
                  {isSubscribed ? 'Abonné' : "S'abonner"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
