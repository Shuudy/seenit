'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export function ProfileBannerPicker({ initialBannerUrl }: { initialBannerUrl: string }) {
  const t = useTranslations('dashboard');
  const [preview, setPreview] = useState(initialBannerUrl);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.addEventListener('load', event => {
        setPreview(event.target?.result as string);
      });
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h2 className="text-muted-foreground mb-3 text-sm font-medium">Photo de bannière</h2>
      <div className="bg-secondary group relative h-32 overflow-hidden rounded-lg">
        <Image
          src={preview}
          alt={t('banner')}
          fill
          className="h-full w-full object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
        />
        <label className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
          <input type="file" accept="image/*" onChange={handleChange} className="hidden" />
          <span className="text-sm font-medium text-white">{t('edit')}</span>
        </label>
      </div>
    </div>
  );
}
