'use client';

import { useTranslations } from 'next-intl';

interface ShareButtonProps {
  title: string;
}

export function ShareButton({ title }: ShareButtonProps) {
  const t = useTranslations('watch');

  const handleShare = async () => {
    if (!navigator.share) return;

    await navigator.share({
      title,
      url: globalThis.location.href,
    });
  };

  return (
    <button
      onClick={handleShare}
      className="bg-secondary hover:bg-secondary-foreground/20 flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 transition-colors"
    >
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
        <polyline points="16 6 12 2 8 6"></polyline>
        <line x1="12" y1="2" x2="12" y2="15"></line>
      </svg>
      <span className="hidden text-sm font-medium sm:inline">{t('share')}</span>
    </button>
  );
}
