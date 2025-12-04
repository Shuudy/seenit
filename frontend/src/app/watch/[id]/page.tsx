'use client';

import { Header } from '@/components/header';

import type { User } from '@/types/user';
import { CommentInput } from '@/app/watch/_components/comment-input';
import { CommentList } from '@/app/watch/_components/comment-list';
import { RecommendedVideoList } from '@/app/watch/_components/recommended-video-list';
import { Suspense } from 'react';
import { VideoInfoSkeleton } from '@/components/skeletons/video-info-skeleton';
import { VideoDetails } from '@/app/watch/_components/video-details';
import { RecommendedVideoListFallback } from '@/app/watch/_components/recommended-video-list-fallback';

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
            <Suspense fallback={<RecommendedVideoListFallback />}>
              <RecommendedVideoList />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}
