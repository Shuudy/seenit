export function ChannelAbout({ bio }: { bio?: string }) {
  return (
    <div className="max-w-2xl">
      <div className="bg-secondary mb-6 rounded-lg p-6">
        <h3 className="mb-3 font-bold">Description de la chaîne</h3>
        {bio ? (
          <p className="text-foreground text-sm whitespace-pre-line">{bio}</p>
        ) : (
          <p className="text-muted-foreground text-sm">Aucune description.</p>
        )}
      </div>
      <div className="bg-secondary rounded-lg p-6">
        <h3 className="mb-3 font-bold">Liens utiles</h3>
        <ul className="space-y-2 text-sm">
          <li>
            <a href="#" className="text-accent hover:underline">
              Site web
            </a>
          </li>
          <li>
            <a href="#" className="text-accent hover:underline">
              Twitter
            </a>
          </li>
          <li>
            <a href="#" className="text-accent hover:underline">
              LinkedIn
            </a>
          </li>
          <li>
            <a href="#" className="text-accent hover:underline">
              GitHub
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
