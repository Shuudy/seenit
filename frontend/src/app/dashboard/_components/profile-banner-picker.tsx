import Image from 'next/image';

type Props = {
  src: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function ProfileBannerPicker({ src, onChange }: Props) {
  return (
    <div>
      <h2 className="text-muted-foreground mb-3 text-sm font-medium">Photo de bannière</h2>
      <div className="bg-secondary group relative h-32 overflow-hidden rounded-lg">
        <Image
          src={src || '/placeholder.svg'}
          alt="Bannière"
          fill
          className="h-full w-full object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
        />
        <label className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
          <input type="file" accept="image/*" onChange={onChange} className="hidden" />
          <span className="text-sm font-medium text-white">Modifier</span>
        </label>
      </div>
    </div>
  );
}
