import { ProfileButton } from '@/components/header/ProfileButton';
import { NotificationButton } from '@/components/header/NotificationButton';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

export function NavActions() {
  return (
    <div className="ml-auto flex items-center gap-4">
      <LanguageSwitcher />
      <NotificationButton />
      <ProfileButton />
    </div>
  );
}
