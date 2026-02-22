import { useTranslations } from 'next-intl';

export type DashboardTab = 'profile' | 'upload';

interface DashboardTabsProps {
  active: DashboardTab;
  onChange: (tab: DashboardTab) => void;
}

export function DashboardTabs({ active, onChange }: DashboardTabsProps) {
  const t = useTranslations('dashboard');

  const tabs: { id: DashboardTab; label: string }[] = [
    { id: 'profile', label: t('profile') },
    { id: 'upload', label: t('uploadVideo') },
  ];

  return (
    <div className="border-border border-b px-6">
      <div className="flex gap-8">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`cursor-pointer border-b-2 py-4 text-sm font-medium transition-colors ${
              active === tab.id
                ? 'text-foreground border-b-foreground'
                : 'text-muted-foreground hover:text-foreground border-b-transparent'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
