'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';

import type { VideoData } from '@/types/video';

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
          <div className="border-border border-b px-6">
            <div className="flex gap-8">
              <button
                onClick={() => setActiveTab('profile')}
                className={`cursor-pointer border-b-2 py-4 text-sm font-medium transition-colors ${
                  activeTab === 'profile'
                    ? 'text-foreground border-b-foreground'
                    : 'text-muted-foreground hover:text-foreground border-b-transparent'
                }`}
              >
                Profil
              </button>
              <button
                onClick={() => setActiveTab('upload')}
                className={`cursor-pointer border-b-2 py-4 text-sm font-medium transition-colors ${
                  activeTab === 'upload'
                    ? 'text-foreground border-b-foreground'
                    : 'text-muted-foreground hover:text-foreground border-b-transparent'
                }`}
              >
                Uploader une vidéo
              </button>
            </div>
          </div>

          {activeTab === 'profile' && (
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-muted-foreground mb-3 text-sm font-medium">
                    Photo de bannière
                  </h2>
                  <div className="bg-secondary group relative h-32 overflow-hidden rounded-lg">
                    <img
                      src={bannerImage || '/placeholder.svg'}
                      alt="Bannière"
                      className="h-full w-full object-cover"
                    />
                    <label className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleBannerChange}
                        className="hidden"
                      />
                      <span className="text-sm font-medium text-white">Modifier</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h2 className="text-muted-foreground mb-3 text-sm font-medium">
                    Photo de profil
                  </h2>
                  <div className="flex items-end gap-4">
                    <div className="group relative">
                      <img
                        src={profileImage || '/placeholder.svg'}
                        alt="Profil"
                        className="border-secondary h-20 w-20 rounded-full border-2 object-cover"
                      />
                      <label className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleProfileImageChange}
                          className="hidden"
                        />
                        <span className="text-xs font-medium text-white">Modifier</span>
                      </label>
                    </div>
                    <p className="text-muted-foreground text-xs">JPG, GIF ou PNG. Taille max 2MB</p>
                  </div>
                </div>

                <form
                  onSubmit={handleProfileSubmit}
                  className="border-border space-y-5 border-t pt-6"
                >
                  <div>
                    <label
                      htmlFor="username"
                      className="text-foreground mb-2 block text-sm font-medium"
                    >
                      Nom d&apos;utilisateur
                    </label>
                    <input
                      id="username"
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleFormChange}
                      className="bg-secondary border-border text-foreground focus:ring-foreground focus:border-foreground w-full rounded-lg border px-4 py-2 text-sm focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="text-foreground mb-2 block text-sm font-medium"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      className="bg-secondary border-border text-foreground focus:ring-foreground focus:border-foreground w-full rounded-lg border px-4 py-2 text-sm focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="bio" className="text-foreground mb-2 block text-sm font-medium">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleFormChange}
                      rows={4}
                      maxLength={500}
                      className="bg-secondary border-border text-foreground focus:ring-foreground focus:border-foreground w-full resize-none rounded-lg border px-4 py-2 text-sm focus:outline-none"
                    />
                    <p className="text-muted-foreground mt-1 text-xs">{formData.bio.length}/500</p>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="bg-foreground hover:bg-foreground/90 text-background cursor-pointer rounded-lg px-6 py-2 text-sm font-medium transition-colors"
                    >
                      Enregistrer
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          username: 'Mon Profil',
                          email: 'user@example.com',
                          bio: 'Créateur de contenu passionné',
                        })
                      }
                      className="bg-secondary hover:bg-secondary/80 text-foreground cursor-pointer rounded-lg px-6 py-2 text-sm font-medium transition-colors"
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'upload' && (
            <div className="p-6">
              <form onSubmit={handleVideoSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="video-title"
                    className="text-foreground mb-2 block text-sm font-medium"
                  >
                    Titre de la vidéo
                  </label>
                  <input
                    id="video-title"
                    type="text"
                    name="title"
                    value={videoData.title}
                    onChange={handleVideoChange}
                    placeholder="Entrez le titre de votre vidéo"
                    maxLength={100}
                    className="bg-secondary border-border text-foreground focus:ring-foreground focus:border-foreground w-full rounded-lg border px-4 py-2 text-sm focus:outline-none"
                  />
                  <p className="text-muted-foreground mt-1 text-xs">{videoData.title.length}/100</p>
                </div>

                <div>
                  <label
                    htmlFor="video-description"
                    className="text-foreground mb-2 block text-sm font-medium"
                  >
                    Description
                  </label>
                  <textarea
                    id="video-description"
                    name="description"
                    value={videoData.description}
                    onChange={handleVideoChange}
                    placeholder="Décrivez votre vidéo..."
                    rows={5}
                    maxLength={5000}
                    className="bg-secondary border-border text-foreground focus:ring-foreground focus:border-foreground w-full resize-none rounded-lg border px-4 py-2 text-sm focus:outline-none"
                  />
                  <p className="text-muted-foreground mt-1 text-xs">
                    {videoData.description.length}/5000
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="video-file"
                    className="text-foreground mb-3 block text-sm font-medium"
                  >
                    Fichier vidéo
                  </label>
                  <div className="border-border hover:border-foreground hover:bg-secondary/50 group relative cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors">
                    <input
                      id="video-file"
                      type="file"
                      name="file"
                      accept="video/*"
                      onChange={handleVideoChange}
                      className="absolute inset-0 cursor-pointer opacity-0"
                    />
                    <div className="space-y-2">
                      <svg
                        className="text-muted-foreground group-hover:text-foreground mx-auto h-10 w-10 transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      <p className="text-foreground text-sm">
                        {videoData.file
                          ? videoData.file.name
                          : 'Cliquez ou glissez votre vidéo ici'}
                      </p>
                      <p className="text-muted-foreground text-xs">MP4, WebM ou Ogg. Max 500MB</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="bg-foreground hover:bg-foreground/90 text-background cursor-pointer rounded-lg px-8 py-2 text-sm font-medium transition-colors"
                  >
                    Uploader
                  </button>
                  <button
                    type="button"
                    onClick={() => setVideoData({ title: '', description: '', file: null })}
                    className="bg-secondary hover:bg-secondary/80 text-foreground cursor-pointer rounded-lg px-8 py-2 text-sm font-medium transition-colors"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
