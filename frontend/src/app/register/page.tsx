"use client";

import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    setError("Inscription indisponible dans ce template.");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-12">
          <div className="flex justify-center mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="Seenit" className="h-16 w-auto" />
          </div>
        </div>

        <div className="bg-card rounded-lg p-8 border border-border">
          <h2 className="text-lg font-semibold text-foreground mb-6">
            Inscription
          </h2>

          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-700/10 border border-red-700 px-4 py-2 text-red-700">
              <svg
                className="w-5 h-5 flex-shrink-0 text-red-700"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" stroke="currentColor" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4m0 4h.01"
                />
              </svg>
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Adresse email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@exemple.com"
                className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-foreground focus:border-foreground"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-foreground focus:border-foreground"
                required
              />
            </div>

            <div>
              <label
                htmlFor="confirm"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Confirmer le mot de passe
              </label>
              <input
                id="confirm"
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-foreground focus:border-foreground"
                required
                aria-invalid={!!error && password !== confirm}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-foreground hover:bg-foreground/90 text-background font-medium py-2 rounded-lg transition-colors mt-6 cursor-pointer"
            >
              Créer un compte
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-border" />
            <span className="px-3 text-sm text-muted-foreground">ou</span>
            <div className="flex-1 border-t border-border" />
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Vous avez déjà un compte?{" "}
            <Link
              href="/login"
              className="text-foreground hover:underline font-medium"
            >
              Se connecter
            </Link>
          </p>
        </div>

        <div className="text-center mt-6 text-xs text-muted-foreground space-x-4">
          <a href="#" className="hover:text-foreground transition-colors">
            Aide
          </a>
          <span>•</span>
          <a href="#" className="hover:text-foreground transition-colors">
            Confidentialité
          </a>
          <span>•</span>
          <a href="#" className="hover:text-foreground transition-colors">
            Conditions
          </a>
        </div>
      </div>
    </div>
  );
}
