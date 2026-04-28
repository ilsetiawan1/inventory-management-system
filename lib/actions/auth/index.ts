'use server';
// lib/actions/auth/index.ts
// Server Actions untuk autentikasi — login & logout

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getUserById } from '@/lib/repositories/usersRepository';
import { withErrorHandler } from '@/lib/utils/response';

/**
 * Login dengan email & password.
 * Setelah sukses, ambil profil user dari tabel public.users
 * untuk mendapatkan nama, role, dan data lainnya.
 */
export async function actionLogin(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { success: false, message: 'Email dan password wajib diisi' };
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    // Terjemahkan pesan error Supabase ke Bahasa Indonesia
    const errorMap: Record<string, string> = {
      'Invalid login credentials': 'Email atau password salah',
      'Email not confirmed': 'Email belum dikonfirmasi',
      'Too many requests': 'Terlalu banyak percobaan login, coba lagi nanti',
    };
    return {
      success: false,
      message: errorMap[error.message] ?? 'Terjadi kesalahan saat login',
    };
  }

  if (!data.user) {
    return { success: false, message: 'Gagal mendapatkan data user' };
  }

  // Ambil profil dari public.users
  try {
    const profile = await getUserById(data.user.id);
    if (profile.status === 'Inactive') {
      // Logout dulu sebelum return error
      await supabase.auth.signOut();
      return {
        success: false,
        message: 'Akun Anda telah dinonaktifkan. Hubungi administrator.',
      };
    }
    return { success: true, message: 'Login berhasil', data: profile };
  } catch {
    return { success: true, message: 'Login berhasil', data: null };
  }
}

/**
 * Logout — hapus session dan redirect ke halaman login
 */
export async function actionLogout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/login');
}

/**
 * Ambil data user yang sedang login (session + profil)
 */
export async function actionGetCurrentUser() {
  return withErrorHandler(async () => {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw new Error('Tidak ada sesi aktif');

    const profile = await getUserById(user.id);
    return profile;
  }, 'Berhasil memuat data pengguna');
}
