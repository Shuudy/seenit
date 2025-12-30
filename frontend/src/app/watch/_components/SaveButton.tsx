'use client';

import { useState } from 'react';

export function SaveButton() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(prev => !prev);
  };

  return (
    <button
      onClick={handleSave}
      className="bg-secondary hover:bg-secondary-foreground/20 flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 transition-colors"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={saved ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
      <span className="hidden text-sm font-medium sm:inline">
        {saved ? 'Enregistré' : 'Enregistrer'}
      </span>
    </button>
  );
}
