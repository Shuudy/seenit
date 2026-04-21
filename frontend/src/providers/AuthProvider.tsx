'use client';

import { createContext, useContext, useState } from 'react';

import type { User } from '@/types/user';

type AuthContextType = {
  user: User | undefined;
  setUser: (user: User | undefined) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  initialUser,
  children,
}: {
  initialUser: User | undefined;
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | undefined>(initialUser ?? undefined);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
