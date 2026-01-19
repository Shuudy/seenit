'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { CommentFormFields, useCommentForm } from '@/app/watch/_hooks/useCommentForm';
import { SubmitHandler } from 'react-hook-form';
import { InputError } from '@/components/InputError';

const onSubmit: SubmitHandler<CommentFormFields> = data => {
  console.log(data);
};

export function CommentForm() {
  const t = useTranslations('comment');

  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
    clearErrors,
  } = useCommentForm();

  const [isFocused, setIsFocused] = useState(false);
  const commentText = watch('comment', '');

  const handleCancel = () => {
    clearErrors();
    setIsFocused(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3 pb-6">
      <div className="bg-secondary flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full">
        <span className="text-foreground text-sm font-semibold">V</span>
      </div>

      <div className="flex-1">
        <input
          type="text"
          placeholder={t('addComment')}
          {...register('comment')}
          onFocus={() => setIsFocused(true)}
          onKeyDown={event => {
            if (event.key === 'Enter') {
              event.preventDefault();
              handleSubmit(onSubmit)();
            }
          }}
          className="text-foreground border-secondary focus:border-foreground placeholder-muted-foreground w-full flex-1 border-b bg-transparent px-2 py-2 text-sm transition-colors focus:outline-none"
        />
        {errors.comment && <InputError message={errors.comment.message} />}
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
              disabled={!commentText.trim()}
              className={`cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                commentText.trim()
                  ? 'bg-foreground text-background hover:bg-muted-foreground'
                  : 'bg-secondary text-muted-foreground hover:cursor-not-allowed'
              }`}
            >
              {t('comment')}
            </button>
          </div>
        )}
      </div>
    </form>
  );
}
