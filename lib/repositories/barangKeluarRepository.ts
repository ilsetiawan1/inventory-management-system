// lib/repositories/barangKeluarRepository.ts
// Data Access Layer — hanya berisi query Supabase, tanpa business logic

import { createClient } from '@/lib/supabase/server';
import type { CreateBarangKeluarPayload, UpdateBarangKeluarPayload } from '@/types';

export async function getAllBarangKeluar({
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
    .from('barang_keluar')
    .select(
      `
      *,
      barang ( id, barang_code, nama_barang ),
      users ( id, user_code, name )
    `,
      { count: 'exact' },
    )
    .order('tanggal_keluar', { ascending: false })
    .range(from, to);

  if (search) {
    query = query.or(`barang_keluar_code.ilike.%${search}%`);
  }

  if (startDate) query = query.gte('tanggal_keluar', startDate);
  if (endDate) query = query.lte('tanggal_keluar', endDate);

  const { data, error, count } = await query;
  if (error) throw new Error(error.message);
  return { data: data ?? [], count: count ?? 0 };
}

export async function getBarangKeluarById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('barang_keluar')
    .select(
      `
      *,
      barang ( id, barang_code, nama_barang ),
      users ( id, user_code, name )
    `,
    )
    .eq('id', id)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function getLastBarangKeluarCode() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('barang_keluar').select('barang_keluar_code').order('barang_keluar_code', { ascending: false }).limit(1).maybeSingle();

  if (error) throw new Error(error.message);
  return data?.barang_keluar_code ?? null;
}

export async function insertBarangKeluar(payload: CreateBarangKeluarPayload & { barang_keluar_code: string }) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('barang_keluar').insert(payload).select().single();

  if (error) throw new Error(error.message);
  return data;
}

export async function updateBarangKeluar(id: string, payload: UpdateBarangKeluarPayload) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('barang_keluar').update(payload).eq('id', id).select().single();

  if (error) throw new Error(error.message);
  return data;
}

export async function deleteBarangKeluar(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('barang_keluar').delete().eq('id', id);

  if (error) throw new Error(error.message);
}

export async function countBarangKeluar() {
  const supabase = await createClient();
  const { count, error } = await supabase.from('barang_keluar').select('*', { count: 'exact', head: true });

  if (error) throw new Error(error.message);
  return count ?? 0;
}

// Hitung total barang keluar bulan ini vs bulan lalu (untuk dashboard)
export async function countBarangKeluarByMonth(year: number, month: number) {
  const supabase = await createClient();
  const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
  const endDate = new Date(year, month, 0).toISOString().split('T')[0];

  const { count, error } = await supabase.from('barang_keluar').select('*', { count: 'exact', head: true }).gte('tanggal_keluar', startDate).lte('tanggal_keluar', endDate);

  if (error) throw new Error(error.message);
  return count ?? 0;
}
