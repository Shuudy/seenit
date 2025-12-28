import Image from 'next/image';
import { getAvatarUrl } from '@/utils/get-avatar-url';

export function ChannelAvatar({ username, avatarUrl }: { username: string; avatarUrl?: string }) {
  return (
    <div className="bg-secondary relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
      <Image
        src={getAvatarUrl(username, avatarUrl)}
        alt={username}
        fill
        className="object-cover"
        sizes="40px"
      />
    </div>
  );
}
