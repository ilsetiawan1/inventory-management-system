// lib/repositories/barangRepository.ts
// Data Access Layer — hanya berisi query Supabase, tanpa business logic

import { createClient } from '@/lib/supabase/server';
import type { CreateBarangPayload, UpdateBarangPayload } from '@/types';

export async function getAllBarang({
  search = '',
  kategoriId = '',
  page = 1,
  limit = 10,
}: {
  search?: string;
  kategoriId?: string;
  page?: number;
  limit?: number;
} = {}) {
  const supabase = await createClient();
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from('barang')
    .select(
      `
      *,
      kategori_barang ( id, kode_kategori, nama_kategori ),
      satuan ( id, nama_satuan )
    `,
      { count: 'exact' },
    )
    .order('barang_code', { ascending: true })
    .range(from, to);

  if (search) {
    query = query.or(`nama_barang.ilike.%${search}%,barang_code.ilike.%${search}%`);
  }

  if (kategoriId) {
    query = query.eq('id_kategori', kategoriId);
  }

  const { data, error, count } = await query;
  if (error) throw new Error(error.message);
  return { data: data ?? [], count: count ?? 0 };
}

export async function getBarangById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('barang')
    .select(
      `
      *,
      kategori_barang ( id, kode_kategori, nama_kategori ),
      satuan ( id, nama_satuan )
    `,
    )
    .eq('id', id)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function getLastBarangCode() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('barang').select('barang_code').order('barang_code', { ascending: false }).limit(1).maybeSingle();

  if (error) throw new Error(error.message);
  return data?.barang_code ?? null;
}

export async function insertBarang(payload: CreateBarangPayload & { barang_code: string }) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('barang').insert(payload).select().single();

  if (error) throw new Error(error.message);
  return data;
}

export async function updateBarang(id: string, payload: UpdateBarangPayload) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('barang').update(payload).eq('id', id).select().single();

  if (error) throw new Error(error.message);
  return data;
}

export async function deleteBarang(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('barang').delete().eq('id', id);
  if (error) throw new Error(error.message);
}

export async function countBarang() {
  const supabase = await createClient();
  const { count, error } = await supabase.from('barang').select('*', { count: 'exact', head: true });

  if (error) throw new Error(error.message);
  return count ?? 0;
}
