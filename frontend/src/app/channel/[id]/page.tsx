import { Suspense } from 'react';

import { ChannelHeader } from '@/app/channel/_components/ChannelHeader';
import { ChannelTabsClient } from '@/app/channel/_components/ChannelTabsClient';
import { ChannelHeaderFallback } from '@/app/channel/_components/fallbacks/ChannelHeaderFallback';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';

export default async function ChannelPage() {
  return (
    <div className="bg-background min-h-screen">
      <Header />
      <Sidebar />

      <main className="mt-16 md:ml-64">
        <Suspense fallback={<ChannelHeaderFallback />}>
          <ChannelHeader />
        </Suspense>

        <ChannelTabsClient />
      </main>
    </div>
  );
}
