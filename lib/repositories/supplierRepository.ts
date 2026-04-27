// lib/repositories/supplierRepository.ts
// Data Access Layer — hanya berisi query Supabase, tanpa business logic

import { createClient } from '@/lib/supabase/server';
import type { CreateSupplierPayload, UpdateSupplierPayload } from '@/types';

export async function getAllSupplier({
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

  let query = supabase.from('supplier').select('*', { count: 'exact' }).order('supplier_code', { ascending: true }).range(from, to);

  if (search) {
    query = query.or(`nama_supplier.ilike.%${search}%,supplier_code.ilike.%${search}%,email.ilike.%${search}%`);
  }

  const { data, error, count } = await query;
  if (error) throw new Error(error.message);
  return { data: data ?? [], count: count ?? 0 };
}

export async function getSupplierById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('supplier').select('*').eq('id', id).single();

  if (error) throw new Error(error.message);
  return data;
}

export async function getLastSupplierCode() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('supplier').select('supplier_code').order('supplier_code', { ascending: false }).limit(1).maybeSingle();

  if (error) throw new Error(error.message);
  return data?.supplier_code ?? null;
}

export async function insertSupplier(payload: CreateSupplierPayload & { supplier_code: string }) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('supplier').insert(payload).select().single();

  if (error) throw new Error(error.message);
  return data;
}

export async function updateSupplier(id: string, payload: UpdateSupplierPayload) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('supplier').update(payload).eq('id', id).select().single();

  if (error) throw new Error(error.message);
  return data;
}

export async function deleteSupplier(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('supplier').delete().eq('id', id);

  if (error) throw new Error(error.message);
}

export async function countSupplier() {
  const supabase = await createClient();
  const { count, error } = await supabase.from('supplier').select('*', { count: 'exact', head: true });

  if (error) throw new Error(error.message);
  return count ?? 0;
}
