'use client';

import { useState } from 'react';

import { DashboardTab, DashboardTabs } from '@/app/dashboard/_components/DashboardTabs';
import { ProfileForm } from '@/app/dashboard/_components/ProfileForm';
import { VideoUploadForm } from '@/app/dashboard/_components/VideoUploadForm';
import { ProfileImagesForm } from '@/app/dashboard/_components/ProfileImagesForm';

export function DashboardTabsClient() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('profile');

  return (
    <>
      <DashboardTabs active={activeTab} onChange={setActiveTab} />

      <div className="p-6">
        {activeTab === 'profile' ? (
          <div className="space-y-6">
            <ProfileImagesForm />

            <ProfileForm />
          </div>
        ) : (
          <VideoUploadForm />
        )}
      </div>
    </>
  );
}
