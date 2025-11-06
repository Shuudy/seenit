"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";

import type { VideoData } from "@/types/video";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("profile");
  const [profileImage, setProfileImage] = useState("/abstract-profile.png");
  const [bannerImage, setBannerImage] = useState("/celebratory-banner.png");
  const [formData, setFormData] = useState({
    username: "Mon Profil",
    email: "user@example.com",
    bio: "Créateur de contenu passionné",
  });
  const [videoData, setVideoData] = useState<VideoData>({
    title: "",
    description: "",
    file: null,
  });

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setBannerImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVideoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "file") {
      const input = e.target as HTMLInputElement;
      const file = input.files?.[0] ?? null;
      setVideoData((prev) => ({ ...prev, file }));
    } else {
      setVideoData((prev) => ({ ...prev, [name]: value }));
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
    setVideoData({ title: "", description: "", file: null });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />

      <main className="md:ml-64 mt-16">
        <div className="max-w-4xl mx-auto">
          <div className="border-b border-border px-6">
            <div className="flex gap-8">
              <button
                onClick={() => setActiveTab("profile")}
                className={`py-4 text-sm font-medium transition-colors border-b-2 cursor-pointer ${
                  activeTab === "profile"
                    ? "text-foreground border-b-foreground"
                    : "text-muted-foreground border-b-transparent hover:text-foreground"
                }`}
              >
                Profil
              </button>
              <button
                onClick={() => setActiveTab("upload")}
                className={`py-4 text-sm font-medium transition-colors border-b-2 cursor-pointer ${
                  activeTab === "upload"
                    ? "text-foreground border-b-foreground"
                    : "text-muted-foreground border-b-transparent hover:text-foreground"
                }`}
              >
                Uploader une vidéo
              </button>
            </div>
          </div>

          {activeTab === "profile" && (
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-sm font-medium text-muted-foreground mb-3">
                    Photo de bannière
                  </h2>
                  <div className="relative h-32 bg-secondary rounded-lg overflow-hidden group">
                    <img
                      src={bannerImage || "/placeholder.svg"}
                      alt="Bannière"
                      className="w-full h-full object-cover"
                    />
                    <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleBannerChange}
                        className="hidden"
                      />
                      <span className="text-white text-sm font-medium">
                        Modifier
                      </span>
                    </label>
                  </div>
                </div>

                <div>
                  <h2 className="text-sm font-medium text-muted-foreground mb-3">
                    Photo de profil
                  </h2>
                  <div className="flex items-end gap-4">
                    <div className="relative group">
                      <img
                        src={profileImage || "/placeholder.svg"}
                        alt="Profil"
                        className="w-20 h-20 rounded-full border-2 border-secondary object-cover"
                      />
                      <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleProfileImageChange}
                          className="hidden"
                        />
                        <span className="text-white text-xs font-medium">
                          Modifier
                        </span>
                      </label>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      JPG, GIF ou PNG. Taille max 2MB
                    </p>
                  </div>
                </div>

                <form
                  onSubmit={handleProfileSubmit}
                  className="space-y-5 border-t border-border pt-6"
                >
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Nom d&apos;utilisateur
                    </label>
                    <input
                      id="username"
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleFormChange}
                      className="w-full bg-secondary border border-border rounded-lg px-4 py-2 text-foreground text-sm focus:outline-none focus:ring-foreground focus:border-foreground"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      className="w-full bg-secondary border border-border rounded-lg px-4 py-2 text-foreground text-sm focus:outline-none focus:ring-foreground focus:border-foreground"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="bio"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleFormChange}
                      rows={4}
                      maxLength={500}
                      className="w-full bg-secondary border border-border rounded-lg px-4 py-2 text-foreground text-sm focus:outline-none focus:ring-foreground focus:border-foreground resize-none"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {formData.bio.length}/500
                    </p>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="bg-foreground hover:bg-foreground/90 text-background font-medium py-2 px-6 rounded-lg transition-colors text-sm cursor-pointer"
                    >
                      Enregistrer
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          username: "Mon Profil",
                          email: "user@example.com",
                          bio: "Créateur de contenu passionné",
                        })
                      }
                      className="bg-secondary hover:bg-secondary/80 text-foreground font-medium py-2 px-6 rounded-lg transition-colors text-sm cursor-pointer"
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {activeTab === "upload" && (
            <div className="p-6">
              <form onSubmit={handleVideoSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="video-title"
                    className="block text-sm font-medium text-foreground mb-2"
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
                    className="w-full bg-secondary border border-border rounded-lg px-4 py-2 text-foreground text-sm focus:outline-none focus:ring-foreground focus:border-foreground"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {videoData.title.length}/100
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="video-description"
                    className="block text-sm font-medium text-foreground mb-2"
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
                    className="w-full bg-secondary border border-border rounded-lg px-4 py-2 text-foreground text-sm focus:outline-none focus:ring-foreground focus:border-foreground resize-none"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {videoData.description.length}/5000
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="video-file"
                    className="block text-sm font-medium text-foreground mb-3"
                  >
                    Fichier vidéo
                  </label>
                  <div className="relative border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-foreground hover:bg-secondary/50 transition-colors cursor-pointer group">
                    <input
                      id="video-file"
                      type="file"
                      name="file"
                      accept="video/*"
                      onChange={handleVideoChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <div className="space-y-2">
                      <svg
                        className="w-10 h-10 mx-auto text-muted-foreground group-hover:text-foreground transition-colors"
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
                      <p className="text-sm text-foreground">
                        {videoData.file
                          ? videoData.file.name
                          : "Cliquez ou glissez votre vidéo ici"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        MP4, WebM ou Ogg. Max 500MB
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="bg-foreground hover:bg-foreground/90 text-background font-medium py-2 px-8 rounded-lg transition-colors text-sm cursor-pointer"
                  >
                    Uploader
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setVideoData({ title: "", description: "", file: null })
                    }
                    className="bg-secondary hover:bg-secondary/80 text-foreground font-medium py-2 px-8 rounded-lg transition-colors text-sm cursor-pointer"
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
