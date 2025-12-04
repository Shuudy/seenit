import { ChannelAvatar } from '@/app/watch/_components/channel-avatar';
import { CommentProps } from '@/types/props';
import { formatRelativeTime } from '@/utils/format-relative-time';
import { useState } from 'react';

export function Comment({ comment }: CommentProps) {
  const [likes, setLikes] = useState(comment.likes_count);
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLikes(liked ? likes - 1 : likes + 1);
    setLiked(!liked);
  };

  const createdAtFormatted = formatRelativeTime(comment.created_at);

  return (
    <div className="flex gap-4">
      <ChannelAvatar username={comment.user.username} />
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <p className="text-foreground text-sm font-medium">{comment.user.username}</p>
          <p className="text-muted-foreground text-xs">{createdAtFormatted}</p>
        </div>
        <p className="text-foreground/90 text-sm">{comment.content}</p>
        <div className="flex gap-6 pt-2">
          <button
            onClick={toggleLike}
            aria-pressed={liked}
            className="text-muted-foreground hover:text-foreground flex cursor-pointer items-center gap-2 text-xs"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={liked ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M7 10v12" />
              <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
            </svg>
            {likes}
          </button>
          <button className="text-muted-foreground hover:text-foreground cursor-pointer text-xs">
            Répondre
          </button>
        </div>
      </div>
    </div>
  );
}
