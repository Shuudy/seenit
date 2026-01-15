'use client';

import { useTranslations } from 'next-intl';

export function AuthFooter() {
  const t = useTranslations('auth');

  return (
    <div className="text-muted-foreground mt-6 space-x-4 text-center text-xs">
      <a href="#" className="hover:text-foreground transition-colors">
        {t('help')}
      </a>
      <span>•</span>
      <a href="#" className="hover:text-foreground transition-colors">
        {t('privacy')}
      </a>
      <span>•</span>
      <a href="#" className="hover:text-foreground transition-colors">
        {t('terms')}
      </a>
    </div>
  );
}
