'use client';

import { useTranslations } from 'next-intl';

export function ChannelAbout({ bio }: { bio?: string }) {
  const t = useTranslations('Channel');

  return (
    <div className="max-w-2xl">
      <div className="bg-secondary mb-6 rounded-lg p-6">
        <h3 className="mb-3 font-bold">{t('channelDescription')}</h3>
        {bio ? (
          <p className="text-foreground text-sm whitespace-pre-line">{bio}</p>
        ) : (
          <p className="text-muted-foreground text-sm">{t('noDescription')}</p>
        )}
      </div>
      <div className="bg-secondary rounded-lg p-6">
        <h3 className="mb-3 font-bold">{t('usefulLinks')}</h3>
        <ul className="space-y-2 text-sm">
          <li>
            <a href="#" className="text-foreground hover:underline">
              {t('website')}
            </a>
          </li>
          <li>
            <a href="#" className="text-foreground hover:underline">
              {t('twitter')}
            </a>
          </li>
          <li>
            <a href="#" className="text-foreground hover:underline">
              {t('linkedin')}
            </a>
          </li>
          <li>
            <a href="#" className="text-foreground hover:underline">
              {t('github')}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
