'use client';

import { RegisterFormFields, useRegisterForm } from '@/app/register/_hooks/useRegisterForm';
import { InputError } from '@/components/InputError';
import { SubmitHandler } from 'react-hook-form';
import { useTranslations } from 'next-intl';

const onSubmit: SubmitHandler<RegisterFormFields> = data => {
  console.log(data);
};

export function RegisterForm() {
  const t = useTranslations('auth');

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useRegisterForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
        className="bg-foreground hover:bg-foreground/90 text-background mt-6 w-full cursor-pointer rounded-lg py-2 font-medium transition-colors"
      >
        {t('registerButton')}
      </button>
    </form>
  );
}
