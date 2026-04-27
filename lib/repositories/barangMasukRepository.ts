// lib/repositories/barangMasukRepository.ts
// Data Access Layer — hanya berisi query Supabase, tanpa business logic

import { createClient } from '@/lib/supabase/server';
import type { CreateBarangMasukPayload, UpdateBarangMasukPayload } from '@/types';

export async function getAllBarangMasuk({
  search = '',
  page = 1,
  limit = 10,
  startDate = '',
  endDate = '',
}: {
  search?: string;
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
} = {}) {
  const supabase = await createClient();
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from('barang_masuk')
    .select(
      `
      *,
      barang ( id, barang_code, nama_barang, harga ),
      supplier ( id, supplier_code, nama_supplier ),
      users ( id, user_code, name )
    `,
      { count: 'exact' },
    )
    .order('tanggal_masuk', { ascending: false })
    .range(from, to);

  if (search) {
    query = query.or(`barang_masuk_code.ilike.%${search}%`);
  }

  if (startDate) query = query.gte('tanggal_masuk', startDate);
  if (endDate) query = query.lte('tanggal_masuk', endDate);

  const { data, error, count } = await query;
  if (error) throw new Error(error.message);
  return { data: data ?? [], count: count ?? 0 };
}

export async function getBarangMasukById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('barang_masuk')
    .select(
      `
      *,
      barang ( id, barang_code, nama_barang, harga ),
      supplier ( id, supplier_code, nama_supplier ),
      users ( id, user_code, name )
    `,
    )
    .eq('id', id)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function getLastBarangMasukCode() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('barang_masuk').select('barang_masuk_code').order('barang_masuk_code', { ascending: false }).limit(1).maybeSingle();

  if (error) throw new Error(error.message);
  return data?.barang_masuk_code ?? null;
}

export async function insertBarangMasuk(payload: CreateBarangMasukPayload & { barang_masuk_code: string }) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('barang_masuk').insert(payload).select().single();

  if (error) throw new Error(error.message);
  return data;
}

export async function updateBarangMasuk(id: string, payload: UpdateBarangMasukPayload) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('barang_masuk').update(payload).eq('id', id).select().single();

  if (error) throw new Error(error.message);
  return data;
}

export async function deleteBarangMasuk(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('barang_masuk').delete().eq('id', id);

  if (error) throw new Error(error.message);
}

export async function countBarangMasuk() {
  const supabase = await createClient();
  const { count, error } = await supabase.from('barang_masuk').select('*', { count: 'exact', head: true });

  if (error) throw new Error(error.message);
  return count ?? 0;
}

// Hitung total barang masuk bulan ini vs bulan lalu (untuk dashboard)
export async function countBarangMasukByMonth(year: number, month: number) {
  const supabase = await createClient();
  const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
  const endDate = new Date(year, month, 0).toISOString().split('T')[0];

  const { count, error } = await supabase.from('barang_masuk').select('*', { count: 'exact', head: true }).gte('tanggal_masuk', startDate).lte('tanggal_masuk', endDate);

  if (error) throw new Error(error.message);
  return count ?? 0;
}
