'use client';

import { useState } from 'react';

import { DashboardTabs } from '@/app/dashboard/_components/DashboardTabs';
import { ProfileForm } from '@/app/dashboard/_components/ProfileForm';
import { VideoUploadForm } from '@/app/dashboard/_components/VideoUploadForm';
import { ProfileAvatarPicker } from '@/app/dashboard/_components/ProfileAvatarPicker';
import { ProfileBannerPicker } from '@/app/dashboard/_components/ProfileBannerPicker';

export function DashboardTabsClient() {
  const [activeTab, setActiveTab] = useState('profile');

  const profileInitialData = {
    username: 'Mon Profil',
    email: 'user@example.com',
    bio: 'Créateur de contenu passionné',
  };

  return (
    <>
      <DashboardTabs active={activeTab as 'profile' | 'upload'} onChange={setActiveTab} />

      {activeTab === 'profile' && (
        <div className="p-6">
          <div className="space-y-6">
            <ProfileBannerPicker initialBannerUrl="/celebratory-banner.png" />

            <ProfileAvatarPicker username={profileInitialData.username} />

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
