'use client';

import { createContext, useContext } from 'react';
import type { User } from '@/types/user';

const AuthContext = createContext<User | undefined>(undefined);

export function AuthProvider({
  user,
  children,
}: {
  user: User | undefined;
  children: React.ReactNode;
}) {
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
