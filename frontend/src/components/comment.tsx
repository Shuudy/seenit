import { CommentProps } from "@/types/props";

export function Comment({
  username,
  avatarLetter,
  daysAgo,
  content,
}: CommentProps) {
  return (
    <div className="flex gap-3">
      <div className="w-10 h-10 bg-secondary rounded-full flex-shrink-0 flex items-center justify-center">
        <span className="text-sm font-semibold text-foreground">
          {avatarLetter}
        </span>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="font-medium text-xs text-foreground">{username}</p>
          <p className="text-xs text-muted-foreground">
            il y a {daysAgo} jour{daysAgo > 1 ? "s" : ""}
          </p>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{content}</p>
        <div className="flex gap-4 mt-2">
          <button className="text-xs text-muted-foreground hover:text-foreground cursor-pointer flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11z" />
            </svg>
            J&apos;aime
          </button>
          <button className="text-xs text-muted-foreground hover:text-foreground cursor-pointer">
            Répondre
          </button>
        </div>
      </div>
    </div>
  );
}
