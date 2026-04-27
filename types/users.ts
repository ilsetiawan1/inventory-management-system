// types/users.ts

export type UserRole = 'Admin' | 'Manajer' | 'Direktur Utama';
export type UserStatus = 'Active' | 'Inactive';

export interface User {
  id: string; // UUID — relasi ke auth.users
  user_code: string; // USR001, USR002
  name: string;
  email: string;
  role: UserRole;
  avatar_url: string | null;
  status: UserStatus;
  created_at: string;
  updated_at: string;
}

// Payload untuk insert / update
export interface CreateUserPayload {
  id: string; // harus dari Supabase Auth terlebih dahulu
  user_code: string;
  name: string;
  email: string;
  role: UserRole;
  avatar_url?: string | null;
  status?: UserStatus;
}

export interface UpdateUserPayload {
  name?: string;
  role?: UserRole;
  avatar_url?: string | null;
  status?: UserStatus;
}
