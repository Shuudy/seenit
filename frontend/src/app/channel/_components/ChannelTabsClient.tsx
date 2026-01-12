'use client';

import { Suspense, useState } from 'react';

import { ChannelTabs } from '@/app/channel/_components/ChannelTabs';
import { ChannelAbout } from '@/app/channel/_components/ChannelAbout';
import { ChannelVideoGrid } from '@/app/channel/_components/ChannelVideoGrid';

import { User } from '@/types/user';
import { ChannelVideoGridFallback } from '@/app/channel/_components/fallbacks/ChannelVideoGridFallback';
import { useTranslations } from 'next-intl';

export function ChannelTabsClient({ creatorInfo }: { creatorInfo: User }) {
  const t = useTranslations('Channel');
  const tabs = [t('home'), t('videosTab'), t('about')] as const;
  const [activeTab, setActiveTab] = useState(t('home'));
  return (
    <>
      <ChannelTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        {activeTab === t('home') && (
          <div>
            <h2 className="mb-6 text-xl font-bold">{t('latestVideos')}</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <Suspense fallback={<ChannelVideoGridFallback />}>
                <ChannelVideoGrid />
              </Suspense>
            </div>
          </div>
        )}

        {activeTab === t('videosTab') && (
          <div>
            <div className="mb-6 flex gap-4">
              <select className="bg-secondary text-foreground border-border hover:bg-secondary/80 cursor-pointer rounded-lg border px-4 py-2 text-sm transition-colors">
                <option>{t('recentlyUpdated')}</option>
                <option>{t('popular')}</option>
                <option>{t('oldest')}</option>
              </select>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <Suspense fallback={<ChannelVideoGridFallback />}>
                <ChannelVideoGrid />
              </Suspense>
            </div>
          </div>
        )}

        {activeTab === t('about') && <ChannelAbout bio={creatorInfo.bio} />}
      </div>
    </>
  );
}
