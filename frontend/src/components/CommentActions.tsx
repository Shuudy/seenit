import { LikeButton } from '@/components/LikeButton';

export function CommentActions({ likes }: { likes: number }) {
  return (
    <div className="flex gap-6 pt-2">
      <LikeButton initialLikes={likes} />
      <button className="text-muted-foreground hover:text-foreground cursor-pointer text-xs">
        Répondre
      </button>
    </div>
  );
}
