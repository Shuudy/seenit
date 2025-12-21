import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';

import type { User } from '@/types/user';
import { ChannelHeader } from '@/app/channel/_components/channel-header';
import { ChannelTabsClient } from '@/app/channel/_components/channel-tabs-client';

const creatorInfo: User = {
  id: 1,
  username: 'Tech Talks Daily',
  handle: '@techtalksdaily',
  bio: "Explorez l'avenir de la technologie et du développement web avec nous. Nous couvrons les dernières tendances, tutoriels pratiques et interviews d'experts.",
  subscribers: '542K',
  subscribersRaw: 542000,
  videos: '128',
  avatarUrl: '/channel-avatar.jpg',
  banner: '/channel-banner.jpg',
};

export default function ChannelPage() {
  return (
    <div className="bg-background min-h-screen">
      <Header />
      <Sidebar />

      <main className="mt-16 md:ml-64">
        <ChannelHeader channel={creatorInfo} />

        <ChannelTabsClient creatorInfo={creatorInfo} />
      </main>
    </div>
  );
}
