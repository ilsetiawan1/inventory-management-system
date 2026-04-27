// lib/repositories/usersRepository.ts
// Data Access Layer — hanya berisi query Supabase, tanpa business logic

import { createClient } from '@/lib/supabase/server';
import type { CreateUserPayload, UpdateUserPayload } from '@/types';

export async function getAllUsers({
  search = '',
  page = 1,
  limit = 10,
}: {
  search?: string;
  page?: number;
  limit?: number;
} = {}) {
  const supabase = await createClient();
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase.from('users').select('*', { count: 'exact' }).order('user_code', { ascending: true }).range(from, to);

  if (search) {
    query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,user_code.ilike.%${search}%`);
  }

  const { data, error, count } = await query;
  if (error) throw new Error(error.message);
  return { data: data ?? [], count: count ?? 0 };
}

export async function getUserById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('users').select('*').eq('id', id).single();

  if (error) throw new Error(error.message);
  return data;
}

export async function getLastUserCode() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('users').select('user_code').order('user_code', { ascending: false }).limit(1).maybeSingle();

  if (error) throw new Error(error.message);
  return data?.user_code ?? null;
}

export async function insertUser(payload: CreateUserPayload) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('users').insert(payload).select().single();

  if (error) throw new Error(error.message);
  return data;
}

export async function updateUser(id: string, payload: UpdateUserPayload) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('users').update(payload).eq('id', id).select().single();

  if (error) throw new Error(error.message);
  return data;
}

export async function deleteUser(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('users').delete().eq('id', id);
  if (error) throw new Error(error.message);
}

export async function countUsers() {
  const supabase = await createClient();
  const { count, error } = await supabase.from('users').select('*', { count: 'exact', head: true });

  if (error) throw new Error(error.message);
  return count ?? 0;
}
