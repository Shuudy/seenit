"use client";

export function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-64 bg-background border-r border-border fixed left-0 top-16 bottom-0 overflow-y-auto">
      <nav className="px-3 py-2 space-y-1">
        <a
          href="#"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-3m0 0l7-4 7 4M5 9v7a1 1 0 001 1h12a1 1 0 001-1V9m-9 4v4m0 0H9m3 0h3"
            />
          </svg>
          <span className="text-sm font-medium">Accueil</span>
        </a>
        <a
          href="#"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary transition-colors"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
          <span className="text-sm font-medium">Shorts</span>
        </a>
        <a
          href="#"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-sm font-medium">Abonnements</span>
        </a>
      </nav>

      <div className="mx-3 my-1 border-t border-border" />

      <nav className="px-3 py-2 space-y-1">
        <a
          href="#"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <span className="text-sm font-medium">Vous</span>
        </a>
        <a
          href="#"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-sm font-medium">Historique</span>
        </a>
      </nav>
    </aside>
  );
}
