'use client';

import { useTranslations } from 'next-intl';

type Props = {
  active: 'profile' | 'upload';
  onChange: (tab: 'profile' | 'upload') => void;
};

export function DashboardTabs({ active, onChange }: Props) {
  const t = useTranslations('Dashboard');
  return (
    <div className="border-border border-b px-6">
      <div className="flex gap-8">
        <button
          onClick={() => onChange('profile')}
          className={`cursor-pointer border-b-2 py-4 text-sm font-medium transition-colors ${
            active === 'profile'
              ? 'text-foreground border-b-foreground'
              : 'text-muted-foreground hover:text-foreground border-b-transparent'
          }`}
        >
          {t('profile')}
        </button>
        <button
          onClick={() => onChange('upload')}
          className={`cursor-pointer border-b-2 py-4 text-sm font-medium transition-colors ${
            active === 'upload'
              ? 'text-foreground border-b-foreground'
              : 'text-muted-foreground hover:text-foreground border-b-transparent'
          }`}
        >
          {t('uploadVideo')}
        </button>
      </div>
    </div>
  );
}
