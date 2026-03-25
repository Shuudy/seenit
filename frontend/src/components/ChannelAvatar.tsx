import Image from 'next/image';

import { getAvatarUrl } from '@/utils/get-avatar-url';

interface ChannelAvatarProps {
  username: string;
  avatarUrl?: string | null;
  large?: boolean;
  header?: boolean;
}

export function ChannelAvatar({
  username,
  avatarUrl,
  large = false,
  header = false,
}: ChannelAvatarProps) {
  /* eslint-disable unicorn/no-nested-ternary */
  const sizeClass = header ? 'h-8 w-8' : large ? 'h-10 w-10' : 'h-9 w-9';
  const sizePx = header ? 32 : large ? 40 : 36; // for the sizes prop
  /* eslint-enable unicorn/no-nested-ternary */

  return (
    <div
      className={`bg-secondary relative ${sizeClass} flex-shrink-0 overflow-hidden rounded-full`}
    >
      <Image
        src={getAvatarUrl(username, avatarUrl)}
        alt={username}
        fill
        className="object-cover"
        sizes={`${sizePx}px`}
      />
    </div>
  );
}
