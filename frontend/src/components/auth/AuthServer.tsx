import { ReactNode } from 'react';

import { fetchMeIfAuthenticated } from '@/lib/auth';
import { AuthProvider } from '@/providers/AuthProvider';

export default async function AuthServer({ children }: { children: ReactNode }) {
  const me = await fetchMeIfAuthenticated();
  return <AuthProvider initialUser={me}>{children}</AuthProvider>;
}
