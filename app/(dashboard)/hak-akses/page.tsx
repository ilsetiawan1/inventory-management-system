// app\(dashboard)\hak-akses\page.tsx

import { Suspense } from 'react';
import { actionGetUserList } from '@/lib/actions/users';
import { createClient } from '@/lib/supabase/server';
import { getUserById } from '@/lib/repositories/usersRepository';
import { UserTable } from '@/components/users/UserTable';

export const metadata = {
  title: 'Hak Akses | Inventory System',
};

export default async function HakAksesPage({
  searchParams,
}: {
  searchParams: { search?: string; page?: string };
}) {
  const page = Number(searchParams.page) || 1;
  const search = searchParams.search || '';
  const limit = 10;

  // Get current user to determine permissions
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  let canManageUsers = false;
  if (user) {
    try {
      const profile = await getUserById(user.id);
      // Logic role: Admin atau Super Admin
      canManageUsers = profile.role === 'Admin' || profile.role === 'Super Admin';
    } catch {
      // Ignored
    }
  }

  // Fetch users list
  const res = await actionGetUserList({ search, page, limit });
  const users = res.success ? (res.data.data as import('@/types').User[]) : [];
  const totalCount = res.success ? res.data.count : 0;

  return (
    <div className="p-6 max-w-[1200px] mx-auto w-full space-y-6">
      <div className="page-header">
        <h1 className="page-title">Hak Akses Pengguna</h1>
        <p className="page-subtitle">Kelola daftar pengguna dan hak akses sistem.</p>
      </div>

      <Suspense fallback={
        <div className="card w-full h-[400px] bg-(--color-background) border-(--color-border) animate-pulse" />
      }>
        <UserTable
          users={users}
          totalCount={totalCount}
          currentPage={page}
          limit={limit}
          canManageUsers={canManageUsers}
        />
      </Suspense>
    </div>
  );
}

