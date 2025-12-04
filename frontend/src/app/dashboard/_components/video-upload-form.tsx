'use client';

import type { VideoData } from '@/types/video';
import { useState } from 'react';

export function VideoUploadForm() {
  const [videoData, setVideoData] = useState<VideoData>({
    title: '',
    description: '',
    file: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'file') {
      const input = e.target as HTMLInputElement;
      const file = input.files?.[0] ?? null;
      setVideoData(prev => ({ ...prev, file }));
    } else {
      setVideoData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Uploading video:', videoData);
  };

  function handleReset() {
    setVideoData({ title: '', description: '', file: null });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="video-title" className="text-foreground mb-2 block text-sm font-medium">
          Titre de la vidéo
        </label>
        <input
          id="video-title"
          type="text"
          name="title"
          value={videoData.title}
          onChange={handleChange}
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
          onChange={handleChange}
          placeholder="Décrivez votre vidéo..."
          rows={5}
          maxLength={5000}
          className="bg-secondary border-border text-foreground focus:ring-foreground focus:border-foreground w-full resize-none rounded-lg border px-4 py-2 text-sm focus:outline-none"
        />
        <p className="text-muted-foreground mt-1 text-xs">{videoData.description.length}/5000</p>
      </div>

      <div>
        <label htmlFor="video-file" className="text-foreground mb-3 block text-sm font-medium">
          Fichier vidéo
        </label>
        <div className="border-border hover:border-foreground hover:bg-secondary/50 group relative cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors">
          <input
            id="video-file"
            type="file"
            name="file"
            accept="video/*"
            onChange={handleChange}
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
              {videoData.file ? videoData.file.name : 'Cliquez ou glissez votre vidéo ici'}
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
          onClick={handleReset}
          className="bg-secondary hover:bg-secondary/80 text-foreground cursor-pointer rounded-lg px-8 py-2 text-sm font-medium transition-colors"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}
