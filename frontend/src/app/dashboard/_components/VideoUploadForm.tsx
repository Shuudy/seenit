'use client';

import { useTranslations } from 'next-intl';
import {
  useVideoUploadForm,
  VideoUploadFormFields,
} from '@/app/dashboard/_hooks/useVideoUploadForm';
import { SubmitHandler } from 'react-hook-form';
import { useVideoUploadMutation } from '@/app/dashboard/_hooks/mutations/useVideoUploadMutation';
import { InputError } from '@/components/InputError';
import { useToast } from '@/components/toast/ToastProvider';
import { useState } from 'react';

export function VideoUploadForm() {
  const t = useTranslations('dashboard');

  const { mutate: uploadVideo, isPending } = useVideoUploadMutation();

  const { addToast } = useToast();

  const [serverError, setServerError] = useState<string | undefined>();

  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
    reset,
  } = useVideoUploadForm();

  const watchedTitle = watch('title') ?? '';
  const watchedDescription = watch('description') ?? '';
  const watchedFileList = watch('file');
  const watchedFileName =
    watchedFileList && watchedFileList.length > 0 ? watchedFileList[0]?.name : undefined;

  function handleReset() {
    reset({
      title: '',
      description: '',
    });
  }

  const onSubmit: SubmitHandler<VideoUploadFormFields> = data => {
    const file = data.file?.[0];
    if (!file) return;

    uploadVideo(
      { title: data.title, description: data.description ?? undefined, file },
      {
        onSuccess: () => {
          reset();
          addToast(t('videoUploadSuccess'), 'success');
        },
        onError: () => {
          setServerError(t('videoUploadError'));
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {serverError && (
        <div className="rounded-lg border border-red-500 bg-red-500/10 px-4 py-3 text-red-500">
          {serverError}
        </div>
      )}

      <div>
        <label htmlFor="video-title" className="text-foreground mb-2 block text-sm font-medium">
          {t('videoTitle')}
        </label>
        <input
          id="video-title"
          type="text"
          {...register('title')}
          placeholder={t('videoTitlePlaceholder')}
          maxLength={100}
          className="bg-secondary border-border text-foreground focus:ring-foreground focus:border-foreground w-full rounded-lg border px-4 py-2 text-sm focus:outline-none"
        />
        <p className="text-muted-foreground mt-1 text-xs">{watchedTitle.length}/100</p>
        {errors.title && <InputError message={errors.title.message} />}
      </div>

      <div>
        <label
          htmlFor="video-description"
          className="text-foreground mb-2 block text-sm font-medium"
        >
          {t('description')}
        </label>
        <textarea
          id="video-description"
          {...register('description')}
          placeholder={t('videoDescriptionPlaceholder')}
          rows={5}
          maxLength={500}
          className="bg-secondary border-border text-foreground focus:ring-foreground focus:border-foreground w-full resize-none rounded-lg border px-4 py-2 text-sm focus:outline-none"
        />
        <p className="text-muted-foreground mt-1 text-xs">{watchedDescription.length}/500</p>
        {errors.description && <InputError message={errors.description.message} />}
      </div>

      <div>
        <label htmlFor="video-file" className="text-foreground mb-3 block text-sm font-medium">
          {t('videoFile')}
        </label>
        <div className="border-border hover:border-foreground hover:bg-secondary/50 group relative cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors">
          <input
            id="video-file"
            type="file"
            accept="video/*"
            {...register('file')}
            className="absolute inset-0 cursor-pointer opacity-0"
          />
          <div className="space-y-2">
            <svg
              className="text-muted-foreground group-hover:text-foreground mx-auto h-10 w-10 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <p className="text-foreground text-sm">
              {watchedFileName ?? t('videoFilePlaceholder')}
            </p>
            <p className="text-muted-foreground text-xs">{t('videoFileFormats')}</p>
          </div>
        </div>
        {errors.file && <InputError message={errors.file.message} />}
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={isPending}
          className="bg-foreground hover:bg-foreground/90 text-background cursor-pointer rounded-lg px-8 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60"
        >
          {t('upload')}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="bg-secondary hover:bg-secondary/80 text-foreground cursor-pointer rounded-lg px-8 py-2 text-sm font-medium transition-colors"
        >
          {t('cancel')}
        </button>
      </div>
    </form>
  );
}
