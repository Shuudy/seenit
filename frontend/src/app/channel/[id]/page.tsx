'use client';

import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { VideoCard } from '@/components/video-card';
import { useState } from 'react';

import type { User } from '@/types/user';

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
        <div className="from-accent/20 to-accent/10 relative z-0 h-40 w-full overflow-hidden bg-gradient-to-r md:h-56">
          <img
            src={creatorInfo.banner}
            alt="Channel banner"
            className="h-full w-full object-cover"
          />
          <div className="to-background/95 absolute inset-0 bg-gradient-to-b from-transparent via-transparent" />
        </div>

        <div className="relative">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="-mt-12 flex flex-col gap-4 pb-4 md:-mt-16 md:flex-row md:gap-6">
              <div className="relative z-10 flex-shrink-0">
                <img
                  src={creatorInfo.avatarUrl}
                  alt={creatorInfo.username}
                  className="border-background h-28 w-28 rounded-full border-4 object-cover shadow-lg md:h-40 md:w-40"
                />
              </div>

              <div className="relative z-10 flex flex-1 flex-col justify-end">
                <div className="mb-1">
                  <h1 className="text-2xl font-bold md:text-3xl">{creatorInfo.username}</h1>
                </div>
                <p className="text-muted-foreground mb-2 text-sm">{creatorInfo.handle}</p>

                <div className="mb-3 flex gap-4 text-sm">
                  <span className="text-muted-foreground">
                    <span className="text-foreground font-semibold">{creatorInfo.subscribers}</span>{' '}
                    abonnés
                  </span>
                  <span className="text-muted-foreground">
                    <span className="text-foreground font-semibold">{creatorInfo.videos}</span>{' '}
                    vidéos
                  </span>
                </div>

                <p className="text-muted-foreground mb-3 line-clamp-2 max-w-3xl text-sm">
                  {creatorInfo.bio}
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

        <div className="border-border border-b">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="flex gap-8 overflow-x-auto">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`cursor-pointer border-b-2 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                    activeTab === tab
                      ? 'border-b-foreground text-foreground'
                      : 'text-muted-foreground hover:text-foreground border-transparent'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
          {activeTab === 'Accueil' && (
            <div>
              <h2 className="mb-6 text-xl font-bold">Dernières vidéos</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {channelVideos.map((video, index) => (
                  <VideoCard
                    key={index}
                    title={video.title}
                    channel={creatorInfo.username}
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
                    channel={creatorInfo.username}
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
