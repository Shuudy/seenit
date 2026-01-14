type Tab = {
  id: string;
  label: string;
};

type ChannelTabsProps = {
  tabs: readonly Tab[];
  activeTab: string;
  setActiveTab: (tabId: string) => void;
};

export function ChannelTabs({ tabs, activeTab, setActiveTab }: ChannelTabsProps) {
  return (
    <div className="border-border border-b">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex gap-8 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`cursor-pointer border-b-2 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'border-b-foreground text-foreground'
                  : 'text-muted-foreground hover:text-foreground border-transparent'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
