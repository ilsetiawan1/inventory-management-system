'use server';
// lib/actions/users/index.ts
// Server Actions untuk fitur Hak Akses (manajemen user)

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { createUser, editUser, removeUser, getUserList, getUserDetail } from '@/lib/services/usersService';
import { withErrorHandler, errorResponse } from '@/lib/utils/response';
import type { UpdateUserPayload, UserRole } from '@/types';

export async function actionGetUserList(params?: { search?: string; page?: number; limit?: number }) {
  return withErrorHandler(() => getUserList(params), 'Berhasil memuat data pengguna');
}

export async function actionGetUserDetail(id: string) {
  return withErrorHandler(() => getUserDetail(id), 'Berhasil memuat detail pengguna');
}

/**
 * Buat user baru:
 * 1. Buat akun Auth di Supabase (email + password)
 * 2. Insert profil ke tabel public.users
 */
export async function actionCreateUser(formData: FormData) {
  return withErrorHandler(async () => {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const role = formData.get('role') as UserRole;

    if (!name || !email || !password || !role) {
      throw new Error('Semua field wajib diisi');
    }

    if (password.length < 6) {
      throw new Error('Password minimal 6 karakter');
    }

    // Buat akun Auth menggunakan Admin API
    const supabase = await createClient();
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // langsung verified tanpa email konfirmasi
    });

    if (authError) throw new Error(authError.message);
    if (!authData.user) throw new Error('Gagal membuat akun auth');

    // Insert profil user ke tabel public.users
    const result = await createUser({
      id: authData.user.id,
      name,
      email,
      role,
    });

    revalidatePath('/hak-akses');
    return result;
  }, 'Pengguna berhasil ditambahkan');
}

export async function actionUpdateUser(id: string, payload: UpdateUserPayload) {
  return withErrorHandler(async () => {
    const result = await editUser(id, payload);
    revalidatePath('/hak-akses');
    return result;
  }, 'Pengguna berhasil diperbarui');
}

/**
 * Hapus user:
 * 1. Hapus dari tabel public.users
 * 2. Hapus akun Auth (Admin API)
 */
export async function actionDeleteUser(id: string) {
  return withErrorHandler(async () => {
    // Hapus profil dari public.users dulu
    await removeUser(id);

    // Hapus akun dari Supabase Auth
    const supabase = await createClient();
    const { error: authError } = await supabase.auth.admin.deleteUser(id);
    if (authError) throw new Error(authError.message);

    revalidatePath('/hak-akses');
    return { id };
  }, 'Pengguna berhasil dihapus');
}

/**
 * Update status aktif/nonaktif user
 */
export async function actionToggleUserStatus(id: string, currentStatus: 'Active' | 'Inactive') {
  const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
  return withErrorHandler(async () => {
    const result = await editUser(id, { status: newStatus });
    revalidatePath('/hak-akses');
    return result;
  }, `Status pengguna berhasil diubah menjadi ${newStatus}`);
}
