import { DashboardTabsClient } from '@/app/dashboard/_components/DashboardTabsClient';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';

export default function Dashboard() {
  return (
    <div className="bg-background min-h-screen">
      <Header />
      <Sidebar />

      <main className="mt-16 md:ml-64">
        <div className="mx-auto max-w-4xl">
          <DashboardTabsClient />
        </div>
      </main>
    </div>
  );
}
