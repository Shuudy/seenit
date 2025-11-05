"use client";

import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { VideoCard } from "@/components/video-card";
import { useState } from "react";

const creatorInfo = {
  id: "1",
  name: "Tech Talks Daily",
  handle: "@techtalksdaily",
  description:
    "Explorez l'avenir de la technologie et du développement web avec nous. Nous couvrons les dernières tendances, tutoriels pratiques et interviews d'experts.",
  subscribers: "542K",
  subscribersRaw: 542000,
  videos: "128",
  image: "/channel-avatar.jpg",
  banner: "/channel-banner.jpg",
};

const channelVideos = [
  {
    title: "L'avenir du développement web en 2025",
    views: "2,5M vues",
    uploadedAt: "il y a 2 jours",
  },
  {
    title: "Créer des applications incroyables avec React",
    views: "1,8M vues",
    uploadedAt: "il y a 1 semaine",
  },
  {
    title: "Maîtriser les bases de TypeScript",
    views: "945K vues",
    uploadedAt: "il y a 3 jours",
  },
  {
    title: "Next.js 15 : Les nouveautés",
    views: "542K vues",
    uploadedAt: "il y a 5 jours",
  },
  {
    title: "CSS Grid expliqué : Tutoriel complet",
    views: "1,2M vues",
    uploadedAt: "il y a 1 semaine",
  },
  {
    title: "Les meilleures pratiques du design de base de données",
    views: "832K vues",
    uploadedAt: "il y a 4 jours",
  },
  {
    title: "Optimisation des performances JavaScript",
    views: "723K vues",
    uploadedAt: "il y a 2 semaines",
  },
  {
    title: "Créer un produit SaaS",
    views: "456K vues",
    uploadedAt: "il y a 1 semaine",
  },
];

const tabs = ["Accueil", "Vidéos", "Playlists", "Communauté", "À propos"];

export default function ChannelPage() {
  const [activeTab, setActiveTab] = useState("Accueil");
  const [isSubscribed, setIsSubscribed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />

      <main className="md:ml-64 mt-16">
        <div className="relative w-full h-40 md:h-56 bg-gradient-to-r from-accent/20 to-accent/10 overflow-hidden z-0">
          <img
            src={creatorInfo.banner}
            alt="Channel banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/95" />
        </div>

        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 -mt-12 md:-mt-16 pb-4">
              <div className="flex-shrink-0 relative z-10">
                <img
                  src={creatorInfo.image}
                  alt={creatorInfo.name}
                  className="w-28 md:w-40 h-28 md:h-40 rounded-full border-4 border-background object-cover shadow-lg"
                />
              </div>

              <div className="flex-1 flex flex-col justify-end relative z-10">
                <div className="mb-1">
                  <h1 className="text-2xl md:text-3xl font-bold">
                    {creatorInfo.name}
                  </h1>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {creatorInfo.handle}
                </p>

                <div className="flex gap-4 text-sm mb-3">
                  <span className="text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      {creatorInfo.subscribers}
                    </span>{" "}
                    abonnés
                  </span>
                  <span className="text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      {creatorInfo.videos}
                    </span>{" "}
                    vidéos
                  </span>
                </div>

                <p className="text-sm text-muted-foreground mb-3 max-w-3xl line-clamp-2">
                  {creatorInfo.description}
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => setIsSubscribed(!isSubscribed)}
                    className={`px-5 py-2 rounded-full font-medium text-sm transition-all cursor-pointer ${
                      isSubscribed
                        ? "bg-secondary text-foreground hover:bg-secondary/80"
                        : "bg-accent text-accent-foreground hover:bg-accent/90"
                    }`}
                  >
                    {isSubscribed ? "Abonné" : "S'abonner"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-border">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex gap-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                    activeTab === tab
                      ? "border-b-foreground text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          {activeTab === "Accueil" && (
            <div>
              <h2 className="text-xl font-bold mb-6">Dernières vidéos</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {channelVideos.map((video, index) => (
                  <VideoCard
                    key={index}
                    title={video.title}
                    channel={creatorInfo.name}
                    views={video.views}
                    uploadedAt={video.uploadedAt}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === "Vidéos" && (
            <div>
              <div className="flex gap-4 mb-6">
                <select className="px-4 py-2 bg-secondary text-foreground rounded-lg text-sm border border-border cursor-pointer hover:bg-secondary/80 transition-colors">
                  <option>Récemment mis à jour</option>
                  <option>Plus populaires</option>
                  <option>Plus anciens</option>
                </select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {channelVideos.map((video, index) => (
                  <VideoCard
                    key={index}
                    title={video.title}
                    channel={creatorInfo.name}
                    views={video.views}
                    uploadedAt={video.uploadedAt}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === "À propos" && (
            <div className="max-w-2xl">
              <div className="bg-secondary p-6 rounded-lg mb-6">
                <h3 className="font-bold mb-3">Description de la chaîne</h3>
                <p className="text-sm text-foreground mb-4">
                  {creatorInfo.description}
                </p>
                <p className="text-sm text-muted-foreground">
                  Rejoignez notre communauté de {creatorInfo.subscribers}{" "}
                  abonnés et découvrez du contenu de qualité sur la technologie
                  et le développement web.
                </p>
              </div>
              <div className="bg-secondary p-6 rounded-lg">
                <h3 className="font-bold mb-3">Liens utiles</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#" className="text-accent hover:underline">
                      Site web
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-accent hover:underline">
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-accent hover:underline">
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-accent hover:underline">
                      GitHub
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
