import { CommentProps } from "@/types/props";
import { useState } from "react";

export function Comment({
  username,
  avatarLetter,
  daysAgo,
  content,
}: CommentProps) {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLikes(liked ? likes - 1 : likes + 1);
    setLiked(!liked);
  };

  return (
    <div className="flex gap-4">
      <div className="w-10 h-10 bg-secondary rounded-full flex-shrink-0 flex items-center justify-center">
        <span className="text-sm font-semibold text-foreground">
          {avatarLetter}
        </span>
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <p className="font-medium text-sm text-foreground">{username}</p>
          <p className="text-xs text-muted-foreground">
            il y a {daysAgo} jour{daysAgo > 1 ? "s" : ""}
          </p>
        </div>
        <p className="text-sm text-foreground/90">{content}</p>
        <div className="flex gap-6 pt-2">
          <button
            onClick={toggleLike}
            aria-pressed={liked}
            className="text-xs text-muted-foreground hover:text-foreground cursor-pointer flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={liked ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <path d="M7 10v12" />
              <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
            </svg>
            {likes}
          </button>
          <button className="text-xs text-muted-foreground hover:text-foreground cursor-pointer">
            Répondre
          </button>
        </div>
      </div>
    </div>
  );
}
