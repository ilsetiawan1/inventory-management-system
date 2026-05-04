// app/(dashboard)/layout.tsx

import { createClient } from '@/lib/supabase/server';
import { getUserById } from '@/lib/repositories/usersRepository';
import { redirect } from 'next/navigation';
import { SidebarProvider } from '@/context/SidebarContext';
import { Sidebar } from '@/components/layout/Sidebar';
import { Navbar } from '@/components/layout/Navbar';
import { AppMain } from '@/components/layout/AppMain';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  let profile = null;
  try {
    profile = await getUserById(user.id);
  } catch {
    // profile null jika belum ada di public.users
  }

  return (
    <SidebarProvider>
      <div className="app-layout">
        <Sidebar
          userRole={profile?.role ?? 'Admin'}
          userName={profile?.name ?? 'Admin'}
          userEmail={profile?.email ?? user.email ?? ''}
          avatarUrl={profile?.avatar_url ?? null}
        />
        <AppMain>
          <Navbar />
          <main className="app-content">{children}</main>
        </AppMain>
      </div>
    </SidebarProvider>
  );
}
