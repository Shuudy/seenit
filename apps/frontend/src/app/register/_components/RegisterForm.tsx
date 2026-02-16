'use client';

import { RegisterFormFields, useRegisterForm } from '@/app/register/_hooks/useRegisterForm';
import { InputError } from '@/components/InputError';
import { SubmitHandler } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { useRegisterMutation } from '@/app/register/_hooks/mutations/useRegisterMutation';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';

export function RegisterForm() {
  const t = useTranslations('auth');
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const { setUser } = useAuth();

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useRegisterForm();

  const { mutate: postUser, isPending } = useRegisterMutation();

  const onSubmit: SubmitHandler<RegisterFormFields> = data => {
    setErrorMessage(undefined);

    const payload = {
      username: data.username,
      email: data.email,
      password: data.password,
      password_confirmation: data.confirm,
    };

    postUser(payload, {
      onSuccess: user => {
        setErrorMessage(undefined);
        setUser({
          ...user,
          avatar_url: user.avatar_url ?? undefined,
          bio: user.bio ?? undefined,
          banner_url: user.banner_url ?? undefined,
          email: user.email ?? undefined,
        });
        router.push('/');
      },
      onError: error => {
        if (error.message === 'Network response was not ok') {
          setErrorMessage(t('invalidCredentials'));
        } else {
          setErrorMessage(t('registerError'));
        }
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {errorMessage && (
        <div className="rounded-lg border border-red-500 bg-red-500/10 px-4 py-3 text-red-500">
          {errorMessage}
        </div>
      )}
      <div>
        <label htmlFor="username" className="text-foreground mb-2 block text-sm font-medium">
          {t('username')}
        </label>
        <input
          id="username"
          type="text"
          {...register('username')}
          placeholder={t('username')}
          className="bg-secondary border-border text-foreground placeholder-muted-foreground focus:ring-foreground focus:border-foreground w-full rounded-lg border px-4 py-2 focus:outline-none"
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
          className="bg-secondary border-border text-foreground placeholder-muted-foreground focus:ring-foreground focus:border-foreground w-full rounded-lg border px-4 py-2 focus:outline-none"
        />
        {errors.email && <InputError message={errors.email.message} />}
      </div>

      <div>
        <label htmlFor="password" className="text-foreground mb-2 block text-sm font-medium">
          {t('password')}
        </label>
        <input
          id="password"
          type="password"
          {...register('password')}
          placeholder={t('passwordPlaceholder')}
          className="bg-secondary border-border text-foreground placeholder-muted-foreground focus:ring-foreground focus:border-foreground w-full rounded-lg border px-4 py-2 focus:outline-none"
        />
        {errors.password && <InputError message={errors.password.message} />}
      </div>

      <div>
        <label htmlFor="confirm" className="text-foreground mb-2 block text-sm font-medium">
          {t('confirmPassword')}
        </label>
        <input
          id="confirm"
          type="password"
          {...register('confirm')}
          placeholder={t('passwordPlaceholder')}
          className="bg-secondary border-border text-foreground placeholder-muted-foreground focus:ring-foreground focus:border-foreground w-full rounded-lg border px-4 py-2 focus:outline-none"
          aria-invalid={!!errors.confirm}
        />
        {errors.confirm && <InputError message={errors.confirm.message} />}
      </div>

      <button
        type="submit"
        className="bg-foreground hover:bg-foreground/90 text-background mt-6 w-full cursor-pointer rounded-lg py-2 font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50"
        disabled={isPending}
      >
        {isPending ? t('registering') : t('registerButton')}
      </button>
    </form>
  );
}
