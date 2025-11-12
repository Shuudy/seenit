'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import Image from 'next/image';
import Link from 'next/link';
import { Comment } from '@/components/comment';

import type { User } from '@/types/user';

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
  const [expanded, setExpanded] = useState(false);

  const [likes, setLikes] = useState(videoDetails.likes);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const toggleLike = () => {
    if (liked) {
      setLiked(false);
      setLikes(n => n - 1);
      return;
    }
    setLiked(true);
    setLikes(n => n + 1);
    if (disliked) setDisliked(false);
  };

  const toggleDislike = () => {
    if (disliked) {
      setDisliked(false);
      return;
    }
    if (liked) {
      setLiked(false);
      setLikes(n => n - 1);
    }
    setDisliked(true);
  };

  return (
    <div className="bg-background min-h-screen">
      <Header />

      <main className="mt-16 w-full px-2 py-6 md:px-4">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 md:px-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-3 aspect-video w-full overflow-hidden rounded-lg bg-black">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={videoDetails.thumbnail}
                alt={videoDetails.title}
                className="h-full w-full object-cover"
              />
            </div>

            <h1 className="text-foreground mb-3 text-lg font-bold">{videoDetails.title}</h1>

            <div className="border-secondary flex flex-col gap-4 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-secondary flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full">
                  <span className="text-foreground text-sm font-semibold">T</span>
                </div>
                <div className="flex-1">
                  <Link
                    href="/channel/1"
                    className="text-foreground hover:text-muted-foreground m-0 block cursor-pointer text-sm font-medium no-underline"
                  >
                    {videoDetails.user.username}
                  </Link>
                  <p className="text-muted-foreground text-xs">{videoDetails.channelSubscribers}</p>
                </div>
                <button className="bg-foreground text-background hover:bg-muted-foreground cursor-pointer rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors">
                  S&apos;abonner
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  className="bg-secondary hover:bg-secondary-foreground/20 flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 transition-colors"
                  onClick={toggleLike}
                  aria-pressed={liked}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={liked ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M7 10v12" />
                    <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
                  </svg>

                  <span className="hidden text-sm font-medium sm:inline">
                    {likes.toLocaleString()}
                  </span>
                </button>
                <button
                  className="bg-secondary hover:bg-secondary-foreground/20 flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 transition-colors"
                  onClick={toggleDislike}
                  aria-pressed={disliked}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={disliked ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M17 14V2" />
                    <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="bg-secondary mt-4 rounded-lg p-4">
              <p className="text-muted-foreground mb-2 text-xs">
                {videoDetails.views} vues • {videoDetails.uploadedAt}
              </p>
              <p
                className={`text-foreground cursor-pointer text-sm whitespace-pre-line ${
                  expanded ? '' : 'line-clamp-3'
                }`}
                onClick={() => !expanded && setExpanded(true)}
                aria-expanded={expanded}
              >
                {videoDetails.description}
              </p>
              <button
                className="text-foreground hover:text-muted-foreground mt-3 cursor-pointer text-xs font-medium"
                onClick={() => setExpanded(s => !s)}
                aria-controls="video-description"
              >
                {expanded ? 'Afficher moins' : 'Afficher plus'}
              </button>
            </div>

            <div className="mt-6">
              <h2 className="text-foreground mb-4 text-base font-bold">
                {videoDetails.comments.toLocaleString()} commentaires
              </h2>

              <div className="flex gap-3 pb-6">
                <div className="bg-secondary flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full">
                  <span className="text-foreground text-sm font-semibold">V</span>
                </div>
                <input
                  type="text"
                  placeholder="Ajouter un commentaire..."
                  className="text-foreground border-secondary focus:border-foreground placeholder-muted-foreground flex-1 border-b bg-transparent px-2 py-2 text-sm transition-colors focus:outline-none"
                />
              </div>

              <div className="space-y-7">
                {[1, 2, 3].map(i => (
                  <Comment
                    key={i}
                    username={`Utilisateur ${i}`}
                    avatarLetter={String.fromCharCode(64 + i)}
                    content="Excellent contenu ! Très informatif et bien présenté."
                    daysAgo={i}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <h3 className="text-foreground mb-4 text-sm font-bold">Recommandations</h3>
            <div className="flex flex-col space-y-3">
              {recommendedVideos.map((video, index) => (
                <div key={index} className="group flex cursor-pointer gap-2">
                  <div className="bg-secondary relative h-20 w-32 flex-shrink-0 overflow-hidden rounded">
                    <Image
                      src="/video-thumbnail.jpg"
                      alt={video.title}
                      fill
                      sizes="(max-width: 768px) 50vw, 128px"
                      className="h-full w-full object-cover transition-all group-hover:brightness-75"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                      <svg className="h-4 w-4 fill-white text-white" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-foreground group-hover:text-muted-foreground line-clamp-2 text-xs font-medium">
                      {video.title}
                    </p>
                    <p className="text-muted-foreground mt-1 text-xs">{video.channel}</p>
                    <p className="text-muted-foreground text-xs">
                      {video.views} • {video.uploadedAt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
