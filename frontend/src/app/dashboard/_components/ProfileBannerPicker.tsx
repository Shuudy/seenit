import Image from 'next/image';
import { useState } from 'react';

export function ProfileBannerPicker({ initialBannerUrl }: { initialBannerUrl: string }) {
  const [preview, setPreview] = useState(initialBannerUrl);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = event => {
        setPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h2 className="text-muted-foreground mb-3 text-sm font-medium">Photo de bannière</h2>
      <div className="bg-secondary group relative h-32 overflow-hidden rounded-lg">
        <Image
          src={preview}
          alt="Bannière"
          fill
          className="h-full w-full object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
        />
        <label className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
          <input type="file" accept="image/*" onChange={handleChange} className="hidden" />
          <span className="text-sm font-medium text-white">Modifier</span>
        </label>
      </div>
    </div>
  );
}
