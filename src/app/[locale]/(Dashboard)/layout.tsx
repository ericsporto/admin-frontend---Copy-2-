'use client';
import { Header } from '@/components/Dashboard/Header';
import Sidebar from '@/components/Dashboard/Mobile/Sidebar';
import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { parseCookies } from 'nookies';
import { useLocale } from 'next-intl';
interface DashLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { '@NEXTION_TOKEN': theToken } = parseCookies();
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  if (!theToken && !pathname.includes('/auth')) {
    router.push(`/${locale}/auth/login`);
  }

  return pathname === `/${locale}` && !theToken ? null : (
    <div className="w-full min-h-screen bg-green-300 flex">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="w-full">
        <Header setSidebarOpen={setSidebarOpen} />
        <main className="p-4 max-w-[1440px] m-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
