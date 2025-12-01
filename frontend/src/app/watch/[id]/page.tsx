'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import Image from 'next/image';
import Link from 'next/link';
import { Comment } from '@/components/comment';
import mockVideos from '@/data/mockVideos.json';
import { useParams } from 'next/navigation';
import { VideoData } from '@/types/video';
import { formatViews } from '@/utils/formatViews';

export default function WatchPage() {
  const params = useParams();
  const videoId = Number(params.id);
  const video = (mockVideos as VideoData[]).find(v => v.id === videoId);
  const [likes, setLikes] = useState(video?.likes ?? 0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [expanded, setExpanded] = useState(false);

  if (!video) return <p className="mt-20 text-center">Vidéo introuvable.</p>;
  const recommendedVideos = (mockVideos as VideoData[]).filter(v => v.id !== videoId);

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
                src="/video-thumbnail-1.jpg"
                alt={video.title}
                className="h-full w-full object-cover"
              />
            </div>

            <h1 className="text-foreground mb-3 text-lg font-bold">{video.title}</h1>

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
                    {video.user.username}
                  </Link>
                  <p className="text-muted-foreground text-xs">{video.channelSubscribers}</p>
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
                {video.views} vues • {video.uploadedAt}
              </p>
              <p
                className={`text-foreground cursor-pointer text-sm whitespace-pre-line ${
                  expanded ? '' : 'line-clamp-3'
                }`}
                onClick={() => !expanded && setExpanded(true)}
                aria-expanded={expanded}
              >
                {video.description}
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
                {video.comments.toLocaleString()} commentaires
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
                {video.videoComments.map((comment, index) => (
                  <Comment
                    key={index}
                    username={comment.username}
                    avatarLetter={comment.avatarLetter}
                    content={comment.content}
                    daysAgo={comment.daysAgo}
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
                      src="/video-thumbnail-1.jpg"
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
                    <p className="text-muted-foreground mt-1 text-xs">{video.user.username}</p>
                    <p className="text-muted-foreground text-xs">
                      {formatViews(video.views)} • {video.uploadedAt}
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
