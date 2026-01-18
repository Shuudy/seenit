'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface SubscribeButtonProps {
  initial?: boolean;
}

export function SubscribeButton({ initial = false }: SubscribeButtonProps) {
  const t = useTranslations('common');
  const [isSubscribed, setIsSubscribed] = useState(initial);

  return (
    <button
      onClick={() => setIsSubscribed(!isSubscribed)}
      className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
        isSubscribed
          ? 'bg-secondary text-foreground hover:bg-secondary/80'
          : 'bg-foreground text-background hover:bg-muted-foreground'
      }`}
    >
      {isSubscribed ? t('subscribed') : t('subscribe')}
    </button>
  );
}
