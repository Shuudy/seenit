import Image from 'next/image';

type Props = {
  src: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function ProfileAvatarPicker({ src, onChange }: Props) {
  return (
    <div>
      <h2 className="text-muted-foreground mb-3 text-sm font-medium">Photo de profil</h2>
      <div className="flex items-end gap-4">
        <div className="group relative">
          <Image
            src={src || '/placeholder.svg'}
            alt="Profil"
            width="80"
            height="80"
            className="border-secondary h-20 w-20 rounded-full border-2 object-cover"
          />
          <label className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
            <input type="file" accept="image/*" onChange={onChange} className="hidden" />
            <span className="text-xs font-medium text-white">Modifier</span>
          </label>
        </div>
        <p className="text-muted-foreground text-xs">JPG, GIF ou PNG. Taille max 2MB</p>
      </div>
    </div>
  );
}
