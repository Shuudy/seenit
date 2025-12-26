import { Comment } from '@/components/Comment';
import { CommentListProps } from '@/types/props';

export function CommentList({ comments }: CommentListProps) {
  return (
    <div className="space-y-7">
      {comments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
