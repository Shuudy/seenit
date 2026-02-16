import { CommentForm } from '@/app/watch/_components/CommentForm';
import { CommentList } from '@/app/watch/_components/CommentList';
import { CommentCount } from '@/app/watch/_components/CommentCount';

export function VideoComments() {
  return (
    <>
      <CommentCount />

      <CommentForm />

      <CommentList />
    </>
  );
}
