import { ProfileButton } from '@/components/header/profile-button';
import { NotificationButton } from '@/components/header/notification-button';

export function NavActions() {
  return (
    <div className="ml-auto flex items-center gap-4">
      <NotificationButton />
      <ProfileButton />
    </div>
  );
}
