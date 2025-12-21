'use client';

import { Comment as CommentComponent } from '@/components/comment';
import { useCommentSection } from '@/app/watch/_hooks/useCommentSection';
import { CommentInput } from '@/app/watch/_components/comment-input';
import { Comment as CommentType } from '@/types/comment';

interface CommentSectionProps {
  comments: CommentType[];
}

export function CommentSection({ comments }: CommentSectionProps) {
  const commentSection = useCommentSection();

  return (
    <div className="mt-6">
      <h2 className="text-foreground mb-4 text-base font-bold">
        {comments.length.toLocaleString()} commentaires
      </h2>

      <CommentInput {...commentSection} />

      <div className="space-y-7">
        {comments.map(comment => (
          <CommentComponent key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}
