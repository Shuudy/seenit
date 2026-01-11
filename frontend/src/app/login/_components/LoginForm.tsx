'use client';

import { SubmitHandler } from 'react-hook-form';
import { LoginFormFields, useLoginForm } from '@/app/login/_hooks/useLoginForm';
import { useLoginMutation } from '@/app/login/_hooks/mutations/useLoginMutation';
import { InputError } from '@/components/InputError';
import { useRouter } from 'next/navigation';

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useLoginForm();

  const { mutate: postLogin, isPending, error } = useLoginMutation();

  const router = useRouter();

  const onSubmit: SubmitHandler<LoginFormFields> = data => {
    postLogin(data, {
      onSuccess() {
        router.push('/');
      },
    });
  };

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

      <button
        type="submit"
        className="bg-foreground hover:bg-foreground/90 text-background disabled:hover:bg-foreground mt-6 w-full cursor-pointer rounded-lg py-2 font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isPending}
      >
        {isPending ? 'Connexion…' : 'Se connecter'}
      </button>

      {error && <InputError message="Adresse email ou mot de passe incorrect" />}
    </form>
  );
}
