'use client';

import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { useState } from 'react';

import type { User } from '@/types/user';
import { ChannelHeader } from '@/app/channel/_components/channel-header';
import { ChannelTabs } from '@/app/channel/_components/channel-tabs';
import { ChannelAbout } from '@/app/channel/_components/channel-about';
import { ChannelVideoGrid } from '@/app/channel/_components/channel-video-grid';
import mockChannelVideos from '@/data/mockChannelVideos.json';
import { Video } from '@/types/video';

const channelVideos = mockChannelVideos as Video[];

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

const tabs = ['Accueil', 'Vidéos', 'À propos'];

export default function ChannelPage() {
  const [activeTab, setActiveTab] = useState('Accueil');
  const [isSubscribed, setIsSubscribed] = useState(false);

  return (
    <div className="bg-background min-h-screen">
      <Header />
      <Sidebar />

      <main className="mt-16 md:ml-64">
        <ChannelHeader
          channel={creatorInfo}
          isSubscribed={isSubscribed}
          onToggleSubscribe={() => setIsSubscribed(s => !s)}
        />

        <ChannelTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
          {activeTab === 'Accueil' && (
            <div>
              <h2 className="mb-6 text-xl font-bold">Dernières vidéos</h2>
              <ChannelVideoGrid videos={channelVideos} />
            </div>
          )}

          {activeTab === 'Vidéos' && (
            <div>
              <div className="mb-6 flex gap-4">
                <select className="bg-secondary text-foreground border-border hover:bg-secondary/80 cursor-pointer rounded-lg border px-4 py-2 text-sm transition-colors">
                  <option>Récemment mis à jour</option>
                  <option>Plus populaires</option>
                  <option>Plus anciens</option>
                </select>
              </div>
              <ChannelVideoGrid videos={channelVideos} />
            </div>
          )}

          {activeTab === 'À propos' && <ChannelAbout bio={creatorInfo.bio} />}
        </div>
      </main>
    </div>
  );
}
