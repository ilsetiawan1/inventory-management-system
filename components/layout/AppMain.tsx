'use client';
// components/layout/AppMain.tsx
// Sync class app-main.sb-open dengan state sidebar.
// CSS di Sidebar.tsx yang handle margin-left transition.

import { useSidebar } from '@/context/SidebarContext';

export function AppMain({ children }: { children: React.ReactNode }) {
  const { open } = useSidebar();
  return <div className={`app-main${open ? ' sb-open' : ''}`}>{children}</div>;
}
