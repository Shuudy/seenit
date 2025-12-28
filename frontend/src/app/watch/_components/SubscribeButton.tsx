'use client';

import React, { useState } from 'react';

interface SubscribeButtonProps {
  initial?: boolean;
}

export function SubscribeButton({ initial = false }: SubscribeButtonProps) {
  const [subscribed, setSubscribed] = useState(initial);

  function handleClick() {
    setSubscribed(prev => !prev);
  }

  return (
    <button
      aria-pressed={subscribed}
      onClick={handleClick}
      title={subscribed ? 'Abonné' : "S'abonner"}
      className={
        'flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap ' +
        (subscribed
          ? 'bg-background text-foreground border-muted-foreground/40 border'
          : 'bg-foreground text-background')
      }
    >
      {subscribed ? 'Abonné' : "S'abonner"}
    </button>
  );
}
