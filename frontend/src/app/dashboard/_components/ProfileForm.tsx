'use client';

import { useTranslations } from 'next-intl';
import { ProfileFormFields, useProfileForm } from '@/app/dashboard/_hooks/useProfileForm';
import { SubmitHandler } from 'react-hook-form';
import { InputError } from '@/components/InputError';
import { useAuth } from '@/providers/AuthProvider';

const onSubmit: SubmitHandler<ProfileFormFields> = data => {
  console.log('Profile data submitted:', data);
};

export function ProfileForm() {
  const t = useTranslations('dashboard');

  const { user } = useAuth();

  const initialData = {
    username: user?.username,
    email: user?.email,
    bio: user?.bio,
  };

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    watch,
  } = useProfileForm(initialData);

  const watchedBio = watch('bio') ?? '';

  const handleReset = () => reset(initialData);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="border-border space-y-5 border-t pt-6">
      <div>
        <label htmlFor="username" className="text-foreground mb-2 block text-sm font-medium">
          {t('username')}
        </label>
        <input
          id="username"
          type="text"
          {...register('username')}
          placeholder={t('usernamePlaceholder')}
          className="bg-secondary border-border text-foreground focus:ring-foreground focus:border-foreground w-full rounded-lg border px-4 py-2 text-sm focus:outline-none"
        />
        {errors.username && <InputError message={errors.username.message} />}
      </div>

      <div>
        <label htmlFor="email" className="text-foreground mb-2 block text-sm font-medium">
          {t('email')}
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          placeholder={t('emailPlaceholder')}
          className="bg-secondary border-border text-foreground focus:ring-foreground focus:border-foreground w-full rounded-lg border px-4 py-2 text-sm focus:outline-none"
        />
        {errors.email && <InputError message={errors.email.message} />}
      </div>

      <div>
        <label htmlFor="bio" className="text-foreground mb-2 block text-sm font-medium">
          {t('bio')}
        </label>
        <textarea
          id="bio"
          {...register('bio')}
          rows={4}
          maxLength={500}
          placeholder={t('bioPlaceholder')}
          className="bg-secondary border-border text-foreground focus:ring-foreground focus:border-foreground w-full resize-none rounded-lg border px-4 py-2 text-sm focus:outline-none"
        />
        <p className="text-muted-foreground mt-1 text-xs">{watchedBio.length}/500</p>
        {errors.bio && <InputError message={errors.bio.message} />}
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          className="bg-foreground hover:bg-foreground/90 text-background cursor-pointer rounded-lg px-6 py-2 text-sm font-medium transition-colors"
        >
          {t('save')}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="bg-secondary hover:bg-secondary/80 text-foreground cursor-pointer rounded-lg px-6 py-2 text-sm font-medium transition-colors"
        >
          {t('cancel')}
        </button>
      </div>
    </form>
  );
}
