// lib/services/usersService.ts
// Business Logic Layer — manajemen user (Hak Akses)

import { getAllUsers, getUserById, getLastUserCode, insertUser, updateUser, deleteUser, countUsers } from '@/lib/repositories/usersRepository';
import { generateUserCode } from '@/lib/utils/generateCode';
import type { CreateUserPayload, UpdateUserPayload } from '@/types';

export async function getUserList(params?: { search?: string; page?: number; limit?: number }) {
  return getAllUsers(params);
}

export async function getUserDetail(id: string) {
  return getUserById(id);
}

/**
 * Membuat user profile di tabel public.users.
 * PENTING: Auth user (email/password) harus sudah dibuat
 * terlebih dahulu via Supabase Admin Auth sebelum memanggil ini.
 * id harus merupakan UUID dari auth.users.
 */
export async function createUser(payload: Omit<CreateUserPayload, 'user_code'>) {
  const lastCode = await getLastUserCode();
  const user_code = generateUserCode(lastCode);

  return insertUser({ ...payload, user_code });
}

export async function editUser(id: string, payload: UpdateUserPayload) {
  await getUserById(id);
  return updateUser(id, payload);
}

export async function removeUser(id: string) {
  await getUserById(id);
  return deleteUser(id);
}

export async function getTotalUsers() {
  return countUsers();
}
