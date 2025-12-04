'use client';

import { Header } from '@/components/header';

import type { User } from '@/types/user';
import { CommentInput } from '@/app/watch/_components/comment-input';
import { CommentList } from '@/app/watch/_components/comment-list';
import { RecommendedVideoList } from '@/app/watch/_components/recommended-video-list';
import { Suspense } from 'react';
import { VideoInfoSkeleton } from '@/components/skeletons/video-info-skeleton';
import { VideoDetails } from '@/app/watch/_components/video-details';

const videoDetails = {
  id: 1,
  title: "L'avenir du développement web en 2025",
  user: {
    id: 1,
    username: 'Tech Talks Daily',
    email: 'techtalks@example.com',
    avatarUrl: '/avatar-tech-talks.png',
  } as User,
  channelSubscribers: '1,2M abonnés',
  views: '2,543,892',
  likes: 45230,
  comments: 1234,
  uploadedAt: 'il y a 2 jours',
  description:
    'Découvrez les tendances majeures du développement web en 2025. Dans cette vidéo, nous explorons les nouvelles technologies, les frameworks émergents et les meilleures pratiques que tout développeur web doit connaître.\n\nSommet:\n• React et Next.js\n• TypeScript et les types\n• Performance web\n• Sécurité des applications\n\nAbonnez-vous pour plus de contenu sur le développement web!',
  thumbnail: '/video-thumbnail.jpg',
};

const recommendedVideos = [
  {
    title: 'Créer des applications incroyables avec React',
    channel: 'Code Masters',
    views: '1,8M vues',
    uploadedAt: 'il y a 1 semaine',
  },
  {
    title: 'Maîtriser les bases de TypeScript',
    channel: 'Dev Education',
    views: '945K vues',
    uploadedAt: 'il y a 3 jours',
  },
  {
    title: 'Next.js 15 : Les nouveautés',
    channel: 'Frontend Focus',
    views: '542K vues',
    uploadedAt: 'il y a 5 jours',
  },
  {
    title: 'CSS Grid expliqué : Tutoriel complet',
    channel: 'Web Design Pro',
    views: '1,2M vues',
    uploadedAt: 'il y a 1 semaine',
  },
  {
    title: 'Les meilleures pratiques du design de base de données',
    channel: 'Backend Academy',
    views: '832K vues',
    uploadedAt: 'il y a 4 jours',
  },
  {
    title: 'Optimisation des performances JavaScript',
    channel: 'Dev Tips',
    views: '723K vues',
    uploadedAt: 'il y a 2 semaines',
  },
];

export default function WatchPage() {
  return (
    <div className="bg-background min-h-screen">
      <Header />

      <main className="mt-16 w-full px-2 py-6 md:px-4">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 md:px-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Suspense fallback={<VideoInfoSkeleton />}>
              <VideoDetails />
            </Suspense>

            <div className="mt-6">
              <h2 className="text-foreground mb-4 text-base font-bold">
                {videoDetails.comments.toLocaleString()} commentaires
              </h2>

              <CommentInput />

              <CommentList />
            </div>
          </div>

          <div className="lg:col-span-1">
            <h3 className="text-foreground mb-4 text-sm font-bold">Recommandations</h3>
            <RecommendedVideoList videos={recommendedVideos} />
          </div>
        </div>
      </main>
    </div>
  );
}
