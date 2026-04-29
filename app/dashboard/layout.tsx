// app/dashboard/layout.tsx
// Layout untuk semua halaman authenticated — sidebar + navbar

import { createClient } from '@/lib/supabase/server';
import { getUserById } from '@/lib/repositories/usersRepository';
import { redirect } from 'next/navigation';
import { Sidebar } from '@/components/shared/Sidebar';
import { Navbar } from '@/components/shared/Navbar';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Ambil session user di server
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  // Ambil profil dari public.users
  let profile = null;
  try {
    profile = await getUserById(user.id);
  } catch {
    // Jika tidak ditemukan di public.users, biarkan profile = null
    // Jangan redirect ke /login karena akan menyebabkan infinite loop dengan proxy.ts
  }

  return (
    <div className="app-layout">
      <Sidebar userRole={profile?.role ?? 'Admin'} />
      <div className="app-main">
        <Navbar user={profile} />
        <main className="app-content">{children}</main>
      </div>
    </div>
  );
}
