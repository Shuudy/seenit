import { ChannelAvatar } from '@/components/ChannelAvatar';
import Link from 'next/link';
import { useFormatRelativeTime } from '@/utils/format-relative-time';
import { CommentActions } from '@/components/CommentActions';
import { Comment as CommentType } from '@/types/comment';

export function Comment({ comment }: { comment: CommentType }) {
  const formatRelativeTime = useFormatRelativeTime();
  const createdAtFormatted = formatRelativeTime(comment.created_at);

  return (
    <div className="flex gap-4">
      <ChannelAvatar username={comment.user.username} avatarUrl={comment.user.avatar_url} />
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <Link
            href={`/channel/${comment.user.id}`}
            className="text-foreground hover:text-muted-foreground text-sm font-medium"
          >
            {comment.user.username}
          </Link>
          <p className="text-muted-foreground text-xs" suppressHydrationWarning>
            {createdAtFormatted}
          </p>
        </div>
        <p className="text-foreground/90 text-sm">{comment.content}</p>
        <CommentActions likes={comment.likes_count} />
      </div>
    </div>
  );
}
