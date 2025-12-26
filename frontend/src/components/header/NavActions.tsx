import { ProfileButton } from '@/components/header/ProfileButton';
import { NotificationButton } from '@/components/header/NotificationButton';

export function NavActions() {
  return (
    <div className="ml-auto flex items-center gap-4">
      <NotificationButton />
      <ProfileButton />
    </div>
  );
}
