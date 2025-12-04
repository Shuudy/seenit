import { ChannelAvatar } from '@/components/channel-avatar';
import { CommentProps } from '@/types/props';
import { formatRelativeTime } from '@/utils/format-relative-time';
import { CommentActions } from '@/components/comment-actions';

export function Comment({ comment }: CommentProps) {
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
        <CommentActions likes={comment.likes_count} />
      </div>
    </div>
  );
}
