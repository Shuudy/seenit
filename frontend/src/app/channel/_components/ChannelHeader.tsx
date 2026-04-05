'use client';

import Image from 'next/image';
import { useChannelHeaderSuspenseQuery } from '@/app/channel/_hooks/queries/useChannelHeaderSuspenseQuery';
import { useParams } from 'next/navigation';
import { getAvatarUrl } from '@/utils/get-avatar-url';
import { SubscribeButton } from '@/components/SubscribeButton';
import { useTranslations } from 'next-intl';

export function ChannelHeader() {
  const t = useTranslations('channel');
  const tCommon = useTranslations('common');
  const { id: channelId } = useParams<{ id: string }>();

  const { data: user } = useChannelHeaderSuspenseQuery(channelId);
  const videosCount = user.videos_count ?? 0;
  const subscribersCount = user.subscribers_count ?? 0;

  return (
    <>
      <div className="from-accent/20 to-accent/10 relative z-0 h-40 w-full overflow-hidden bg-gradient-to-r md:h-56">
        <Image
          src={user.banner_url ?? '/channel-banner.jpg'}
          alt={t('channelBanner')}
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
                src={getAvatarUrl(user.username, user.avatar_url)}
                alt={user.username}
                width="160"
                height="160"
                className="border-background h-28 w-28 rounded-full border-4 object-cover shadow-lg md:h-40 md:w-40"
                sizes="(max-width: 768px) 112px, 160px"
                priority
              />
            </div>

            <div className="relative z-10 flex flex-1 flex-col justify-end">
              <div className="mb-1">
                <h1 className="text-2xl font-bold md:text-3xl">{user.username}</h1>
              </div>
              <p className="text-muted-foreground mb-2 text-sm">@{user.username}</p>

              <div className="mb-3 flex gap-4 text-sm">
                <span className="text-muted-foreground">
                  <span className="text-foreground font-semibold">{subscribersCount}</span>{' '}
                  {tCommon('subscriber', { count: subscribersCount })}
                </span>
                <span className="text-muted-foreground">
                  <span className="text-foreground font-semibold">{videosCount}</span>{' '}
                  {t('video', { count: videosCount })}
                </span>
              </div>

              <p className="text-muted-foreground mb-3 line-clamp-2 max-w-3xl text-sm">
                {user.bio}
              </p>

              <div className="flex gap-3">
                <SubscribeButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
