"use client";

import { AuthErrorMessage } from "@/components/auth/auth-error-message";
import { AuthFooter } from "@/components/auth/auth-footer";
import { AuthLogo } from "@/components/auth/auth-logo";
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
        <AuthLogo />

        <div className="bg-card rounded-lg p-8 border border-border">
          <h2 className="text-lg font-semibold text-foreground mb-6">
            Inscription
          </h2>

          <AuthErrorMessage message={error} />

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

        <AuthFooter />
      </div>
    </div>
  );
}
