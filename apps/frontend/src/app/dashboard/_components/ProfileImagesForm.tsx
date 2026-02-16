'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {
  ProfileImagesFormFields,
  useProfileImagesForm,
} from '@/app/dashboard/_hooks/useProfileImagesForm';
import { SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { handleImageChange } from '@/app/dashboard/_utils/handleImageChange';
import { InputError } from '@/components/InputError';
import { useAuth } from '@/providers/AuthProvider';
import { getAvatarUrl } from '@/utils/get-avatar-url';
import { useProfileImagesMutation } from '@/app/dashboard/_hooks/mutations/useProfileImagesMutation';

export function ProfileImagesForm() {
  const t = useTranslations('dashboard');

  const { user, setUser } = useAuth();

  const { mutate: updateProfileImages, isPending } = useProfileImagesMutation();

  const initialImages = {
    bannerSrc: user?.banner_url ?? '/celebratory-banner.png',
    avatarSrc: getAvatarUrl(user?.username ?? 'user', user?.avatar_url),
  };

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useProfileImagesForm();

  const [bannerPreview, setBannerPreview] = useState<string | undefined>(initialImages.bannerSrc);
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(initialImages.avatarSrc);

  const onSubmit: SubmitHandler<ProfileImagesFormFields> = data => {
    const avatar = data.avatar?.[0];
    const banner = data.banner?.[0];

    updateProfileImages(
      { avatar, banner },
      {
        onSuccess: updatedUser => {
          setUser(updatedUser);
          reset();
          setBannerPreview(updatedUser.banner_url ?? '/celebratory-banner.png');
          setAvatarPreview(getAvatarUrl(updatedUser.username, updatedUser.avatar_url));
        },
        onError: error => {
          console.error('Failed to update profile images:', error);
        },
      }
    );
  };

  const handleCancel = () => [
    reset(),
    setBannerPreview(initialImages.bannerSrc),
    setAvatarPreview(initialImages.avatarSrc),
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-muted-foreground mb-3 text-sm font-medium">{t('bannerPhoto')}</h2>
      <div>
        <div className="bg-secondary group relative h-32 overflow-hidden rounded-lg">
          <Image
            src={bannerPreview || '/celebratory-banner.png'}
            alt={t('banner')}
            fill
            className="h-full w-full object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
          />
          <label className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
            <input
              type="file"
              accept="image/*"
              {...register('banner', {
                onChange: event => handleImageChange(event.target.files, setBannerPreview),
              })}
              className="hidden"
            />
            <span className="text-sm font-medium text-white">{t('edit')}</span>
          </label>
        </div>
        {errors.banner && <InputError message={errors.banner.message} />}
      </div>

      <div>
        <h2 className="text-muted-foreground mb-3 text-sm font-medium">{t('profilePicture')}</h2>
        <div className="flex items-end gap-4">
          <div className="group relative">
            <Image
              src={avatarPreview || '/default-avatar.png'}
              alt={t('profilePicture')}
              width="80"
              height="80"
              className="border-secondary h-20 w-20 rounded-full border-2 object-cover"
            />
            <label className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
              <input
                type="file"
                accept="image/*"
                {...register('avatar', {
                  onChange: event => handleImageChange(event.target.files, setAvatarPreview),
                })}
                className="hidden"
              />
              <span className="text-xs font-medium text-white">{t('edit')}</span>
            </label>
          </div>
          <p className="text-muted-foreground text-xs">{t('validImageFormats')}</p>
        </div>
        {errors.avatar && <InputError message={errors.avatar.message} />}
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={isPending}
          className="bg-foreground hover:bg-foreground/90 text-background cursor-pointer rounded-lg px-6 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? t('saving') : t('save')}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          disabled={isPending}
          className="bg-secondary hover:bg-secondary/80 text-foreground cursor-pointer rounded-lg px-6 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50"
        >
          {t('cancel')}
        </button>
      </div>
    </form>
  );
}
