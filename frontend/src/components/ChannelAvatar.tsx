import Image from 'next/image';
import { getAvatarUrl } from '@/utils/get-avatar-url';

export function ChannelAvatar({
  username,
  avatarUrl,
  large = false,
}: {
  username: string;
  avatarUrl?: string;
  large?: boolean;
}) {
  return (
    <div
      className={`bg-secondary relative ${large ? 'h-10 w-10' : 'h-9 w-9'} flex-shrink-0 overflow-hidden rounded-full`}
    >
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
