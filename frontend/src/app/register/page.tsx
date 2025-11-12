'use client';

import { AuthErrorMessage } from '@/components/auth/auth-error-message';
import { AuthFooter } from '@/components/auth/auth-footer';
import { AuthLogo } from '@/components/auth/auth-logo';
import Link from 'next/link';
import { useState } from 'react';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
    setError('Inscription indisponible dans ce template.');
  };

  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md">
        <AuthLogo />

        <div className="bg-card border-border rounded-lg border p-8">
          <h2 className="text-foreground mb-6 text-lg font-semibold">Inscription</h2>

          <AuthErrorMessage message={error} />

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="text-foreground mb-2 block text-sm font-medium">
                Adresse email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="vous@exemple.com"
                className="bg-secondary border-border text-foreground placeholder-muted-foreground focus:ring-foreground focus:border-foreground w-full rounded-lg border px-4 py-2 focus:outline-none"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="text-foreground mb-2 block text-sm font-medium">
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-secondary border-border text-foreground placeholder-muted-foreground focus:ring-foreground focus:border-foreground w-full rounded-lg border px-4 py-2 focus:outline-none"
                required
              />
            </div>

            <div>
              <label htmlFor="confirm" className="text-foreground mb-2 block text-sm font-medium">
                Confirmer le mot de passe
              </label>
              <input
                id="confirm"
                type="password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                placeholder="••••••••"
                className="bg-secondary border-border text-foreground placeholder-muted-foreground focus:ring-foreground focus:border-foreground w-full rounded-lg border px-4 py-2 focus:outline-none"
                required
                aria-invalid={!!error && password !== confirm}
              />
            </div>

            <button
              type="submit"
              className="bg-foreground hover:bg-foreground/90 text-background mt-6 w-full cursor-pointer rounded-lg py-2 font-medium transition-colors"
            >
              Créer un compte
            </button>
          </form>

          <div className="my-6 flex items-center">
            <div className="border-border flex-1 border-t" />
            <span className="text-muted-foreground px-3 text-sm">ou</span>
            <div className="border-border flex-1 border-t" />
          </div>

          <p className="text-muted-foreground text-center text-sm">
            Vous avez déjà un compte?{' '}
            <Link href="/login" className="text-foreground font-medium hover:underline">
              Se connecter
            </Link>
          </p>
        </div>

        <AuthFooter />
      </div>
    </div>
  );
}
