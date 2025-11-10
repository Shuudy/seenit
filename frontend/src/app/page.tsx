"use client";

import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { VideoCard } from "@/components/video-card";

import mockVideos from "@/data/mockVideos.json";
import { useState } from "react";

export default function Home() {
  const categories = [
    "Tous",
    "Jeux",
    "Musique",
    "En direct",
    "Mélanges",
    "Tendances",
    "Récemment mis en ligne",
  ] as const;

  type Category = (typeof categories)[number];

  const [activeCategory, setActiveCategory] = useState<Category>("Tous");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />

      <main className="md:ml-64 mt-16 px-4 md:px-6 py-6">
        <div className="flex gap-3 mb-4 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors cursor-pointer
              ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground hover:bg-secondary/90"
              }`}
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
