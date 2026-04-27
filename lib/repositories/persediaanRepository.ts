// lib/repositories/persediaanRepository.ts
// Data Access Layer — hanya berisi query Supabase, tanpa business logic

import { createClient } from '@/lib/supabase/server';
import type { UpdatePersediaanPayload } from '@/types';

export async function getAllPersediaan({
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

  let query = supabase
    .from('persediaan')
    .select(
      `
      *,
      barang (
        id,
        barang_code,
        nama_barang,
        kategori_barang ( nama_kategori ),
        satuan ( nama_satuan )
      )
    `,
      { count: 'exact' },
    )
    .order('persediaan_code', { ascending: true })
    .range(from, to);

  if (search) {
    // Search via relasi barang
    query = query.or(`persediaan_code.ilike.%${search}%`);
  }

  const { data, error, count } = await query;
  if (error) throw new Error(error.message);
  return { data: data ?? [], count: count ?? 0 };
}

export async function getPersediaanByBarangId(barangId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('persediaan').select('*').eq('id_barang', barangId).single();

  if (error) throw new Error(error.message);
  return data;
}

export async function getPersediaanById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('persediaan')
    .select(
      `
      *,
      barang (
        id,
        barang_code,
        nama_barang,
        kategori_barang ( nama_kategori ),
        satuan ( nama_satuan )
      )
    `,
    )
    .eq('id', id)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function updatePersediaan(id: string, payload: UpdatePersediaanPayload) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('persediaan').update(payload).eq('id', id).select().single();

  if (error) throw new Error(error.message);
  return data;
}

export async function updateHppPersediaan(barangId: string, hpp: number) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('persediaan').update({ hpp }).eq('id_barang', barangId).select().single();

  if (error) throw new Error(error.message);
  return data;
}

export async function getTotalStokAllPersediaan() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('persediaan').select('stok');

  if (error) throw new Error(error.message);
  return (data ?? []).reduce((acc, row) => acc + (row.stok ?? 0), 0);
}
