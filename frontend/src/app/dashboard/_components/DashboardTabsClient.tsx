'use client';

import { useState } from 'react';

import { DashboardTabs } from '@/app/dashboard/_components/DashboardTabs';
import { ProfileForm } from '@/app/dashboard/_components/ProfileForm';
import { VideoUploadForm } from '@/app/dashboard/_components/VideoUploadForm';
import { ProfileAvatarPicker } from '@/app/dashboard/_components/ProfileAvatarPicker';
import { ProfileBannerPicker } from '@/app/dashboard/_components/ProfileBannerPicker';
import { useTranslations } from 'next-intl';

export function DashboardTabsClient() {
  const t = useTranslations('Dashboard');
  const [activeTab, setActiveTab] = useState('profile');

  const profileInitialData = {
    username: t('sampleUsername'),
    email: 'user@example.com',
    bio: t('sampleBioDashboard'),
  };

  return (
    <>
      <DashboardTabs active={activeTab as 'profile' | 'upload'} onChange={setActiveTab} />

      {activeTab === 'profile' && (
        <div className="p-6">
          <div className="space-y-6">
            <ProfileBannerPicker initialBannerUrl="/celebratory-banner.png" />

            <ProfileAvatarPicker username={profileInitialData.username} />

            <ProfileForm initialData={profileInitialData} />
          </div>
        </div>
      )}

      {activeTab === 'upload' && (
        <div className="p-6">
          <VideoUploadForm />
        </div>
      )}
    </>
  );
}
