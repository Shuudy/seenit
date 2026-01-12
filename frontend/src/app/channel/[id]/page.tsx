import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';

import type { User } from '@/types/user';
import { ChannelHeader } from '@/app/channel/_components/ChannelHeader';
import { ChannelTabsClient } from '@/app/channel/_components/ChannelTabsClient';
import { Suspense } from 'react';
import { ChannelHeaderFallback } from '@/app/channel/_components/fallbacks/ChannelHeaderFallback';
import { getTranslations } from 'next-intl/server';

export default async function ChannelPage() {
  const t = await getTranslations('Channel');

  const creatorInfo: User = {
    id: 1,
    username: 'Tech Talks Daily',
    handle: '@techtalksdaily',
    bio: t('sampleBio'),
    subscribers: '542K',
    subscribersRaw: 542_000,
    videos_count: 128,
    banner_url: '/channel-banner.jpg',
  };
  return (
    <div className="bg-background min-h-screen">
      <Header />
      <Sidebar />

      <main className="mt-16 md:ml-64">
        <Suspense fallback={<ChannelHeaderFallback />}>
          <ChannelHeader />
        </Suspense>

        <ChannelTabsClient creatorInfo={creatorInfo} />
      </main>
    </div>
  );
}
