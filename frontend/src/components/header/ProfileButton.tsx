'use client';

import { useAuth } from '@/providers/AuthProvider';
import { ChannelAvatar } from '@/components/ChannelAvatar';
import { useState } from 'react';
import { ProfileDropdown } from '@/components/header/ProfileDropdown';
import { ProfileDefaultUser } from '@/components/header/ProfileDefaultUser';

export function ProfileButton() {
  const { user } = useAuth();

  const [open, setOpen] = useState(false);

  // If no user, show generic profile icon that links to login
  if (!user) {
    return <ProfileDefaultUser />;
  }

  // If user is logged in, show avatar with dropdown menu
  return (
    <div
      className="relative inline-flex items-center"
      onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <button
        className="cursor-pointer"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        onKeyDown={event => event.key === 'Escape' && setOpen(false)}
      >
        <ChannelAvatar username={user.username} avatarUrl={user.avatar_url} header />
      </button>

      {open && <ProfileDropdown />}
    </div>
  );
}
