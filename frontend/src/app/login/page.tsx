import { AuthFooter } from '@/components/auth/AuthFooter';
import { AuthLogo } from '@/components/auth/AuthLogo';
import Link from 'next/link';
import { LoginForm } from '@/app/login/_components/LoginForm';
import { getTranslations } from 'next-intl/server';

export default async function LoginPage() {
  const t = await getTranslations('auth');

  return (
    <main className="bg-background flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md">
        <AuthLogo />

        <div className="bg-card border-border rounded-lg border p-8">
          <h2 className="text-foreground mb-6 text-lg font-semibold">{t('login')}</h2>

          <LoginForm />

          <div className="my-6 flex items-center">
            <div className="border-border flex-1 border-t" />
            <span className="text-muted-foreground px-3 text-sm">{t('or')}</span>
            <div className="border-border flex-1 border-t" />
          </div>

          <p className="text-muted-foreground text-center text-sm">
            {t('noAccount')}{' '}
            <Link href="/register" className="text-foreground font-medium hover:underline">
              {t('signUp')}
            </Link>
          </p>
        </div>

        <AuthFooter />
      </div>
    </main>
  );
}
