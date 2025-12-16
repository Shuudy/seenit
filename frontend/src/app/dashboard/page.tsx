'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';

import { DashboardTabs } from '@/app/dashboard/_components/DashboardTabs';
import { ProfileForm } from '@/app/dashboard/_components/ProfileForm';
import { VideoUploadForm } from '@/app/dashboard/_components/VideoUploadForm';
import { ProfileAvatarPicker } from '@/app/dashboard/_components/ProfileAvatarPicker';
import { ProfileBannerPicker } from '@/app/dashboard/_components/ProfileBannerPicker';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('profile');

  const profileInitialData = {
    username: 'Mon Profil',
    email: 'user@example.com',
    bio: 'Créateur de contenu passionné',
  };

  return (
    <div className="bg-background min-h-screen">
      <Header />
      <Sidebar />

      <main className="mt-16 md:ml-64">
        <div className="mx-auto max-w-4xl">
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
        </div>
      </main>
    </div>
  );
}
