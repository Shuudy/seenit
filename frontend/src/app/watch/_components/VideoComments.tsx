import { CommentCount } from '@/app/watch/_components/CommentCount';
import { CommentForm } from '@/app/watch/_components/CommentForm';
import { CommentList } from '@/app/watch/_components/CommentList';

export function VideoComments() {
  return (
    <>
      <CommentCount />

      <CommentForm />

      <CommentList />
    </>
  );
}
