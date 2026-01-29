import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { useLogoutMutation } from '@/hooks/mutations/useLogoutMutation';

export function useLogout() {
  const { setUser } = useAuth();
  const router = useRouter();
  const { mutate: postLogout, isPending } = useLogoutMutation();

  const logout = () => {
    postLogout(undefined, {
      onSuccess: () => {
        setUser(undefined);
        router.push('/');
      },
      onError: error => {
        console.error('Logout failed:', error);
      },
    });
  };

  return { logout, isPending };
}
