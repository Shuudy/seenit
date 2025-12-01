'use client';

import { useState } from 'react';

export function LikeDislikeButtons({ initialLikes }: { initialLikes: number }) {
  const [likes, setLikes] = useState(initialLikes);
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

        <span className="hidden text-sm font-medium sm:inline">{likes.toLocaleString()}</span>
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
  );
}
