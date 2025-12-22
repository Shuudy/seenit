'use client';

import { useState } from 'react';

import { DashboardTabs } from '@/app/dashboard/_components/dashboard-tabs';
import { ProfileForm } from '@/app/dashboard/_components/profile-form';
import { VideoUploadForm } from '@/app/dashboard/_components/video-upload-form';
import { ProfileAvatarPicker } from '@/app/dashboard/_components/profile-avatar-picker';
import { ProfileBannerPicker } from '@/app/dashboard/_components/profile-banner-picker';

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

            <ProfileAvatarPicker initialAvatarUrl="/abstract-profile.png" />

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
