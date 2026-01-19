import { useTranslations } from 'next-intl';

export function CommentInput() {
  const t = useTranslations('common');
  return (
    <div className="flex gap-3 pb-6">
      <div className="bg-secondary flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full">
        <span className="text-foreground text-sm font-semibold">V</span>
      </div>

      <input
        type="text"
        placeholder={t('addComment')}
        className="text-foreground border-secondary focus:border-foreground placeholder-muted-foreground flex-1 border-b bg-transparent px-2 py-2 text-sm transition-colors focus:outline-none"
      />
    </div>
  );
}
