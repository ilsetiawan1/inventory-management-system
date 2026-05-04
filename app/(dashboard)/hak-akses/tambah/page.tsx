import { Suspense } from 'react';
import { UserForm } from '@/components/users/UserForm';
import { getLastUserCode } from '@/lib/repositories/usersRepository';
import { getAllFitur } from '@/lib/repositories/fiturRepository';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { getUserById } from '@/lib/repositories/usersRepository';

export const metadata = {
  title: 'Tambah Pengguna | Inventory System',
};

export default async function TambahPenggunaPage() {
  // Hanya admin / super admin yang boleh masuk
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) redirect('/login');

  try {
    const profile = await getUserById(user.id);
    if (profile.role !== 'Admin' && profile.role !== 'Super Admin') {
      redirect('/hak-akses'); // Redirect jika bukan admin
    }
  } catch {
    redirect('/hak-akses');
  }

  // Ambil last user code dan fitur list
  const [lastUserCode, fiturList] = await Promise.all([
    getLastUserCode(),
    getAllFitur(),
  ]);

  return (
    <div className="p-6 max-w-[1200px] mx-auto w-full bg-(--color-background) min-h-screen">
      <Suspense fallback={<div className="animate-pulse w-full h-[600px] bg-(--color-surface) rounded-xl" />}>
        <UserForm lastUserCode={lastUserCode} fiturList={fiturList} />
      </Suspense>
    </div>
  );
}

