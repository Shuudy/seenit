'use client';

import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { ChannelAvatar } from '@/components/ChannelAvatar';

export function ProfileButton() {
  const { user } = useAuth();
  const router = useRouter();
  const handleClick = () => router.push('/login');

  return user ? (
    <button className="cursor-pointer">
      <ChannelAvatar username={user.username} avatarUrl={user.avatar_url} header />
    </button>
  ) : (
    <button
      onClick={handleClick}
      className="hover:bg-secondary cursor-pointer rounded-full p-2 transition-colors"
    >
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    </button>
  );
}
