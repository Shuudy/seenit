'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { CommentFormFields, useCommentForm } from '@/app/watch/_hooks/useCommentForm';
import { SubmitHandler } from 'react-hook-form';
import { InputError } from '@/components/InputError';
import { useAuth } from '@/providers/AuthProvider';
import { ChannelAvatar } from '@/components/ChannelAvatar';
import { UserDefaultAvatar } from '@/components/UserDefaultAvatar';
import { usePostCommentMutation } from '@/app/watch/_hooks/mutations/usePostCommentMutation';
import { useParams } from 'next/navigation';

export function CommentForm() {
  const t = useTranslations('comment');
  const { id: videoId } = useParams<{ id: string }>();

  const { user } = useAuth();
  const isAuthenticated = !!user;

  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
    clearErrors,
    reset,
  } = useCommentForm();

  const { mutate: postComment, isPending } = usePostCommentMutation();

  const onSubmit: SubmitHandler<CommentFormFields> = data => {
    if (!isAuthenticated || !videoId) return;

    postComment(
      { videoId, content: data.comment },
      {
        onSuccess: () => {
          reset();
          setIsFocused(false);
        },
      }
    );
  };

  const [isFocused, setIsFocused] = useState(false);
  const commentText = watch('comment', '');

  const { comment: commentError } = errors;

  const handleCancel = () => {
    clearErrors();
    reset();
    setIsFocused(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3 pb-6">
      {isAuthenticated ? (
        <ChannelAvatar username={user.username} avatarUrl={user.avatar_url} large />
      ) : (
        <UserDefaultAvatar />
      )}

      <div className="flex-1">
        <input
          type="text"
          placeholder={t('addComment')}
          {...register('comment')}
          disabled={!isAuthenticated || isPending}
          onFocus={() => setIsFocused(true)}
          onKeyDown={event => {
            if (event.key === 'Enter') {
              event.preventDefault();
              handleSubmit(onSubmit)();
            }
          }}
          autoComplete="off"
          className="text-foreground border-secondary focus:border-foreground placeholder-muted-foreground w-full flex-1 border-b bg-transparent px-2 py-2 text-sm transition-colors focus:outline-none"
        />
        {commentError && <InputError message={commentError.message} />}
        {isFocused && (
          <div className="mt-3 flex justify-end gap-2">
            <button
              onClick={handleCancel}
              className="text-foreground hover:bg-secondary cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              disabled={isPending || !commentText.trim()}
              className={`cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                !isPending && commentText.trim()
                  ? 'bg-foreground text-background hover:bg-muted-foreground'
                  : 'bg-secondary text-muted-foreground hover:cursor-not-allowed'
              }`}
            >
              {isPending ? t('commenting') : t('comment')}
            </button>
          </div>
        )}
      </div>
    </form>
  );
}
