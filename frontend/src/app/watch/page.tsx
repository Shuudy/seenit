"use client";

import { Header } from "@/components/header";
import Image from "next/image";

const videoDetails = {
  id: 1,
  title: "L'avenir du développement web en 2025",
  channel: "Tech Talks Daily",
  channelSubscribers: "1,2M abonnés",
  views: "2,543,892",
  likes: 45230,
  uploadedAt: "il y a 2 jours",
  description:
    "Découvrez les tendances majeures du développement web en 2025. Dans cette vidéo, nous explorons les nouvelles technologies, les frameworks émergents et les meilleures pratiques que tout développeur web doit connaître.\n\nSommet:\n• React et Next.js\n• TypeScript et les types\n• Performance web\n• Sécurité des applications\n\nAbonnez-vous pour plus de contenu sur le développement web!",
  thumbnail: "/video-thumbnail.jpg",
};

const recommendedVideos = [
  {
    title: "Créer des applications incroyables avec React",
    channel: "Code Masters",
    views: "1,8M vues",
    uploadedAt: "il y a 1 semaine",
  },
  {
    title: "Maîtriser les bases de TypeScript",
    channel: "Dev Education",
    views: "945K vues",
    uploadedAt: "il y a 3 jours",
  },
  {
    title: "Next.js 15 : Les nouveautés",
    channel: "Frontend Focus",
    views: "542K vues",
    uploadedAt: "il y a 5 jours",
  },
  {
    title: "CSS Grid expliqué : Tutoriel complet",
    channel: "Web Design Pro",
    views: "1,2M vues",
    uploadedAt: "il y a 1 semaine",
  },
  {
    title: "Les meilleures pratiques du design de base de données",
    channel: "Backend Academy",
    views: "832K vues",
    uploadedAt: "il y a 4 jours",
  },
  {
    title: "Optimisation des performances JavaScript",
    channel: "Dev Tips",
    views: "723K vues",
    uploadedAt: "il y a 2 semaines",
  },
];

export default function WatchPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mt-16 px-2 md:px-4 py-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4 md:px-6">
          <div className="lg:col-span-2">
            <div className="bg-black rounded-lg overflow-hidden aspect-video mb-3 w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={videoDetails.thumbnail}
                alt={videoDetails.title}
                className="w-full h-full object-cover"
              />
            </div>

            <h1 className="text-lg font-bold text-foreground mb-3">
              {videoDetails.title}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-secondary">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold text-foreground">
                    T
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground hover:text-muted-foreground cursor-pointer">
                    {videoDetails.channel}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {videoDetails.channelSubscribers}
                  </p>
                </div>
                <button className="px-4 py-2 bg-foreground text-background rounded-full font-medium text-sm hover:bg-muted-foreground transition-colors whitespace-nowrap cursor-pointer">
                  S&apos;abonner
                </button>
              </div>

              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-full hover:bg-muted transition-colors cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <path d="M7 10v12" />
                    <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
                  </svg>
                  <span className="text-sm font-medium hidden sm:inline">
                    {videoDetails.likes.toLocaleString()}
                  </span>
                </button>
              </div>
            </div>

            <div className="mt-4 p-4 bg-secondary rounded-lg">
              <p className="text-xs text-muted-foreground mb-2">
                {videoDetails.views} vues • {videoDetails.uploadedAt}
              </p>
              <p className="text-sm text-foreground whitespace-pre-line line-clamp-3 hover:line-clamp-none cursor-pointer">
                {videoDetails.description}
              </p>
              <button className="mt-3 text-xs font-medium text-foreground hover:text-muted-foreground cursor-pointer">
                Afficher plus
              </button>
            </div>

            <div className="mt-6">
              <h2 className="text-base font-bold text-foreground mb-4">
                {videoDetails.likes} commentaires
              </h2>

              <div className="flex gap-3 mb-6 pb-6 border-b border-secondary">
                <div className="w-10 h-10 bg-secondary rounded-full flex-shrink-0 flex items-center justify-center">
                  <span className="text-sm font-semibold text-foreground">
                    V
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Ajouter un commentaire..."
                  className="flex-1 bg-transparent text-foreground text-sm border-b border-secondary focus:outline-none focus:border-foreground transition-colors placeholder-muted-foreground px-2 py-2"
                />
              </div>

              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-10 h-10 bg-secondary rounded-full flex-shrink-0 flex items-center justify-center">
                      <span className="text-sm font-semibold text-foreground">
                        {String.fromCharCode(64 + i)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-xs text-foreground">
                          Utilisateur {i}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          il y a {i} jour{i > 1 ? "s" : ""}
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Excellent contenu ! Très informatif et bien présenté.
                      </p>
                      <div className="flex gap-4 mt-2">
                        <button className="text-xs text-muted-foreground hover:text-foreground cursor-pointer flex items-center gap-1">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11z" />
                          </svg>
                          J&apos;aime
                        </button>
                        <button className="text-xs text-muted-foreground hover:text-foreground cursor-pointer">
                          Répondre
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <h3 className="text-sm font-bold text-foreground mb-4">
              Recommandations
            </h3>
            <div className="space-y-3 flex flex-col">
              {recommendedVideos.map((video, index) => (
                <div key={index} className="flex gap-2 group cursor-pointer">
                  <div className="w-32 h-20 bg-secondary rounded overflow-hidden flex-shrink-0 relative">
                    <Image
                      src="/video-thumbnail.jpg"
                      alt={video.title}
                      fill
                      sizes="(max-width: 768px) 50vw, 128px"
                      className="w-full h-full object-cover group-hover:brightness-75 transition-all"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg
                        className="w-4 h-4 text-white fill-white"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium line-clamp-2 text-foreground group-hover:text-muted-foreground">
                      {video.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {video.channel}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {video.views} • {video.uploadedAt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
