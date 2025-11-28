'use client';

import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { VideoCard } from '@/components/video-card';
import { useState } from 'react';

import type { User } from '@/types/user';
import { ChannelHeader } from './_components/channel-header';
import { ChannelTabs } from './_components/channel-tabs';

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

const channelVideos = [
  {
    title: "L'avenir du développement web en 2025",
    views: '2,5M vues',
    uploadedAt: 'il y a 2 jours',
  },
  {
    title: 'Créer des applications incroyables avec React',
    views: '1,8M vues',
    uploadedAt: 'il y a 1 semaine',
  },
  {
    title: 'Maîtriser les bases de TypeScript',
    views: '945K vues',
    uploadedAt: 'il y a 3 jours',
  },
  {
    title: 'Next.js 15 : Les nouveautés',
    views: '542K vues',
    uploadedAt: 'il y a 5 jours',
  },
  {
    title: 'CSS Grid expliqué : Tutoriel complet',
    views: '1,2M vues',
    uploadedAt: 'il y a 1 semaine',
  },
  {
    title: 'Les meilleures pratiques du design de base de données',
    views: '832K vues',
    uploadedAt: 'il y a 4 jours',
  },
  {
    title: 'Optimisation des performances JavaScript',
    views: '723K vues',
    uploadedAt: 'il y a 2 semaines',
  },
  {
    title: 'Créer un produit SaaS',
    views: '456K vues',
    uploadedAt: 'il y a 1 semaine',
  },
];

const tabs = ['Accueil', 'Vidéos', 'Playlists', 'Communauté', 'À propos'];

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
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {channelVideos.map((video, index) => (
                  <VideoCard
                    key={index}
                    title={video.title}
                    views={video.views}
                    uploadedAt={video.uploadedAt}
                  />
                ))}
              </div>
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
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {channelVideos.map((video, index) => (
                  <VideoCard
                    key={index}
                    title={video.title}
                    views={video.views}
                    uploadedAt={video.uploadedAt}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'À propos' && (
            <div className="max-w-2xl">
              <div className="bg-secondary mb-6 rounded-lg p-6">
                <h3 className="mb-3 font-bold">Description de la chaîne</h3>
                <p className="text-foreground mb-4 text-sm">{creatorInfo.bio}</p>
                <p className="text-muted-foreground text-sm">
                  Rejoignez notre communauté de {creatorInfo.subscribers} abonnés et découvrez du
                  contenu de qualité sur la technologie et le développement web.
                </p>
              </div>
              <div className="bg-secondary rounded-lg p-6">
                <h3 className="mb-3 font-bold">Liens utiles</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#" className="text-accent hover:underline">
                      Site web
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-accent hover:underline">
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-accent hover:underline">
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-accent hover:underline">
                      GitHub
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
