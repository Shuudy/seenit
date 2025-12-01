type FormData = {
  username: string;
  email: string;
  bio: string;
};

type Props = {
  value: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onReset: () => void;
};

export function ProfileForm({ value, onChange, onSubmit, onReset }: Props) {
  return (
    <form onSubmit={onSubmit} className="border-border space-y-5 border-t pt-6">
      <div>
        <label htmlFor="username" className="text-foreground mb-2 block text-sm font-medium">
          Nom d&apos;utilisateur
        </label>
        <input
          id="username"
          type="text"
          name="username"
          value={value.username}
          onChange={onChange}
          className="bg-secondary border-border text-foreground focus:ring-foreground focus:border-foreground w-full rounded-lg border px-4 py-2 text-sm focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="email" className="text-foreground mb-2 block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={value.email}
          onChange={onChange}
          className="bg-secondary border-border text-foreground focus:ring-foreground focus:border-foreground w-full rounded-lg border px-4 py-2 text-sm focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="bio" className="text-foreground mb-2 block text-sm font-medium">
          Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          value={value.bio}
          onChange={onChange}
          rows={4}
          maxLength={500}
          className="bg-secondary border-border text-foreground focus:ring-foreground focus:border-foreground w-full resize-none rounded-lg border px-4 py-2 text-sm focus:outline-none"
        />
        <p className="text-muted-foreground mt-1 text-xs">{value.bio.length}/500</p>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          className="bg-foreground hover:bg-foreground/90 text-background cursor-pointer rounded-lg px-6 py-2 text-sm font-medium transition-colors"
        >
          Enregistrer
        </button>
        <button
          type="button"
          onClick={onReset}
          className="bg-secondary hover:bg-secondary/80 text-foreground cursor-pointer rounded-lg px-6 py-2 text-sm font-medium transition-colors"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}
