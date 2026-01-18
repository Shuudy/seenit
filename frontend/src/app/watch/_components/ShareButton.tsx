'use client';

import { useState, useEffect, useRef } from 'react';

interface ShareButtonProps {
  title: string;
}

export function ShareButton({ title }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const timeoutReference = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutReference.current) {
        clearTimeout(timeoutReference.current);
      }
    };
  }, []);

  const handleShare = async () => {
    // Get the current URL from the browser (client-side only)
    const url = globalThis.location.href;

    // Try to use Web Share API if available
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
        return;
      } catch (error) {
        // User cancelled or error occurred, fall through to copy
        if ((error as Error).name === 'AbortError') {
          return; // User cancelled, don't show copied message
        }
      }
    }

    // Fallback to copying to clipboard
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      timeoutReference.current = setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  return (
    <button
      className="bg-secondary hover:bg-secondary-foreground/20 flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 transition-colors"
      onClick={handleShare}
      aria-label="Partager la vidéo"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
      <span className="hidden text-sm font-medium sm:inline">
        {copied ? 'Lien copié !' : 'Partager'}
      </span>
    </button>
  );
}
