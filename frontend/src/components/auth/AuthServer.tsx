import { fetchMeIfAuthenticated } from '@/lib/auth';
import { AuthProvider } from '@/providers/AuthProvider';
import { ReactNode } from 'react';

export default async function AuthServer({ children }: { children: ReactNode }) {
  const me = await fetchMeIfAuthenticated();
  return <AuthProvider user={me}>{children}</AuthProvider>;
}
