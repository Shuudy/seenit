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
  const t = useTranslations('common');

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useCommentForm();

  const [isFocused, setIsFocused] = useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3 pb-6">
      <div className="bg-secondary flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full">
        <span className="text-foreground text-sm font-semibold">V</span>
      </div>

      <input
        type="text"
        placeholder={t('addComment')}
        {...register('comment')}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="text-foreground border-secondary focus:border-foreground placeholder-muted-foreground flex-1 border-b bg-transparent px-2 py-2 text-sm transition-colors focus:outline-none"
      />
      {errors.comment && <InputError message={errors.comment.message} />}
      {isFocused && <p>Focused</p>}
    </form>
  );
}
