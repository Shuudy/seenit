'use client';

import { RegisterFormFields, useRegisterForm } from '@/app/register/_hooks/useRegisterForm';
import { InputError } from '@/components/InputError';
import { SubmitHandler } from 'react-hook-form';

const onSubmit: SubmitHandler<RegisterFormFields> = data => {
  console.log(data);
};

export function RegisterForm() {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useRegisterForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="email" className="text-foreground mb-2 block text-sm font-medium">
          Adresse email
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          placeholder="vous@exemple.com"
          className="bg-secondary border-border text-foreground placeholder-muted-foreground focus:ring-foreground focus:border-foreground w-full rounded-lg border px-4 py-2 focus:outline-none"
        />
        {errors.email && <InputError message={errors.email.message} />}
      </div>

      <div>
        <label htmlFor="password" className="text-foreground mb-2 block text-sm font-medium">
          Mot de passe
        </label>
        <input
          id="password"
          type="password"
          {...register('password')}
          placeholder="••••••••"
          className="bg-secondary border-border text-foreground placeholder-muted-foreground focus:ring-foreground focus:border-foreground w-full rounded-lg border px-4 py-2 focus:outline-none"
        />
        {errors.password && <InputError message={errors.password.message} />}
      </div>

      <div>
        <label htmlFor="confirm" className="text-foreground mb-2 block text-sm font-medium">
          Confirmer le mot de passe
        </label>
        <input
          id="confirm"
          type="password"
          {...register('confirm')}
          placeholder="••••••••"
          className="bg-secondary border-border text-foreground placeholder-muted-foreground focus:ring-foreground focus:border-foreground w-full rounded-lg border px-4 py-2 focus:outline-none"
          aria-invalid={!!errors.confirm}
        />
        {errors.confirm && <InputError message={errors.confirm.message} />}
      </div>

      <button
        type="submit"
        className="bg-foreground hover:bg-foreground/90 text-background mt-6 w-full cursor-pointer rounded-lg py-2 font-medium transition-colors"
      >
        Créer un compte
      </button>
    </form>
  );
}
