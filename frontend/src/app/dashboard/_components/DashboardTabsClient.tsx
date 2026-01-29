'use client';

import { useState } from 'react';

import { DashboardTabs } from '@/app/dashboard/_components/DashboardTabs';
import { ProfileForm } from '@/app/dashboard/_components/ProfileForm';
import { VideoUploadForm } from '@/app/dashboard/_components/VideoUploadForm';
import { ProfileImagesForm } from '@/app/dashboard/_components/ProfileImagesForm';
import { useTranslations } from 'next-intl';

export function DashboardTabsClient() {
  const t = useTranslations('dashboard');
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
            <ProfileImagesForm />

            <ProfileForm />
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
