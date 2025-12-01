'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';

import type { VideoData } from '@/types/video';
import { DashboardTabs } from './_components/dashboard-tabs';
import { ProfileForm } from './_components/profile-form';
import { VideoUploadForm } from './_components/video-upload-form';
import { ProfileAvatarPicker } from './_components/profile-avatar-picker';
import { ProfileBannerPicker } from './_components/profile-banner-picker';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileImage, setProfileImage] = useState('/abstract-profile.png');
  const [bannerImage, setBannerImage] = useState('/celebratory-banner.png');
  const [formData, setFormData] = useState({
    username: 'Mon Profil',
    email: 'user@example.com',
    bio: 'Créateur de contenu passionné',
  });
  const [videoData, setVideoData] = useState<VideoData>({
    title: '',
    description: '',
    file: null,
  });

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = event => {
        setProfileImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = event => {
        setBannerImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'file') {
      const input = e.target as HTMLInputElement;
      const file = input.files?.[0] ?? null;
      setVideoData(prev => ({ ...prev, file }));
    } else {
      setVideoData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleVideoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoData.title || !videoData.file) {
      return;
    }
    setVideoData({ title: '', description: '', file: null });
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
                <ProfileBannerPicker src={bannerImage} onChange={handleBannerChange} />

                <ProfileAvatarPicker src={profileImage} onChange={handleProfileImageChange} />

                <ProfileForm
                  value={formData}
                  onChange={handleFormChange}
                  onSubmit={handleProfileSubmit}
                  onReset={() =>
                    setFormData({
                      username: 'Mon Profil',
                      email: 'user@example.com',
                      bio: 'Créateur de contenu passionné',
                    })
                  }
                />
              </div>
            </div>
          )}

          {activeTab === 'upload' && (
            <div className="p-6">
              <VideoUploadForm
                value={videoData}
                onChange={handleVideoChange}
                onSubmit={handleVideoSubmit}
                onReset={() => setVideoData({ title: '', description: '', file: null })}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
