'use client';

import { useState } from 'react';

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
      className={`cursor-pointer rounded-full px-5 py-2 text-sm font-medium transition-all ${
        subscribed
          ? 'bg-secondary text-foreground hover:bg-secondary/80'
          : 'bg-accent text-accent-foreground hover:bg-accent/90'
      }`}
    >
      {subscribed ? 'Abonné' : "S'abonner"}
    </button>
  );
}
