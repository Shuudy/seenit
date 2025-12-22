'use client';

import { useState } from 'react';

import { ChannelTabs } from '@/app/channel/_components/ChannelTabs';
import { ChannelAbout } from '@/app/channel/_components/ChannelAbout';
import { ChannelVideoGrid } from '@/app/channel/_components/ChannelVideoGrid';

import mockChannelVideos from '@/data/mockChannelVideos.json';

import { Video } from '@/types/video';
import { User } from '@/types/user';

const channelVideos = mockChannelVideos as Video[];

const tabs = ['Accueil', 'Vidéos', 'À propos'];

export function ChannelTabsClient({ creatorInfo }: { creatorInfo: User }) {
  const [activeTab, setActiveTab] = useState('Accueil');
  return (
    <>
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
    </>
  );
}
