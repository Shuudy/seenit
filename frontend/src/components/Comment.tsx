import { ChannelAvatar } from '@/components/ChannelAvatar';
import Link from 'next/link';
import { CommentProps } from '@/types/props';
import { useFormatRelativeTime } from '@/utils/format-relative-time';
import { CommentActions } from '@/components/CommentActions';

export function Comment({ comment }: CommentProps) {
  const { user, created_at, content, likes_count } = comment;
  const { username, avatar_url, id } = user;

  const formatRelativeTime = useFormatRelativeTime();
  const createdAtFormatted = formatRelativeTime(created_at);

  return (
    <div className="flex gap-4">
      <ChannelAvatar username={username} avatarUrl={avatar_url} />
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <Link
            href={`/channel/${id}`}
            className="text-foreground hover:text-muted-foreground text-sm font-medium"
          >
            {username}
          </Link>
          <p className="text-muted-foreground text-xs">{createdAtFormatted}</p>
        </div>
        <p className="text-foreground/90 text-sm">{content}</p>
        <CommentActions likes={likes_count} />
      </div>
    </div>
  );
}
