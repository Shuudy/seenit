'use client';

import { AuthFooter } from '@/components/auth/AuthFooter';
import { AuthLogo } from '@/components/auth/AuthLogo';
import Link from 'next/link';
import { RegisterForm } from '@/app/register/_components/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md">
        <AuthLogo />

        <div className="bg-card border-border rounded-lg border p-8">
          <h2 className="text-foreground mb-6 text-lg font-semibold">Inscription</h2>

          <RegisterForm />

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
