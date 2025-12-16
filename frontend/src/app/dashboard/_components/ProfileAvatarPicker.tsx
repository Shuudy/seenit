'use client';

import Image from 'next/image';
import { useState } from 'react';

export function ProfileAvatarPicker({ initialAvatarUrl }: { initialAvatarUrl: string }) {
  const [preview, setPreview] = useState(initialAvatarUrl);
  function handleAvatarChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);
  }

  return (
    <div>
      <h2 className="text-muted-foreground mb-3 text-sm font-medium">Photo de profil</h2>
      <div className="flex items-end gap-4">
        <div className="group relative">
          <Image
            src={preview}
            alt="Profil"
            width="80"
            height="80"
            className="border-secondary h-20 w-20 rounded-full border-2 object-cover"
          />
          <label className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
            <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
            <span className="text-xs font-medium text-white">Modifier</span>
          </label>
        </div>
        <p className="text-muted-foreground text-xs">JPG, GIF ou PNG. Taille max 2MB</p>
      </div>
    </div>
  );
}
