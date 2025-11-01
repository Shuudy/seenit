"use client";

import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { VideoCard } from "@/components/video-card";

import mockVideos from "@/data/mockVideos.json";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />

      <main className="md:ml-64 mt-16 px-4 md:px-6 py-6">
        <div className="flex gap-3 mb-4 overflow-x-auto pb-2 scrollbar-hide">
          {[
            "Tous",
            "Jeux",
            "Musique",
            "En direct",
            "Mélanges",
            "Tendances",
            "Récemment mis en ligne",
          ].map((category) => (
            <button
              key={category}
              className="px-4 py-2 bg-secondary text-foreground rounded-full text-sm font-medium whitespace-nowrap hover:bg-secondary/90 transition-colors cursor-pointer"
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockVideos.map((video, index) => (
            <VideoCard key={index} {...video} />
          ))}
        </div>
      </main>
    </div>
  );
}
