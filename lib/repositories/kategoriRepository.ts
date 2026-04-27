// lib/repositories/kategoriRepository.ts
// Data Access Layer — hanya berisi query Supabase, tanpa business logic

import { createClient } from '@/lib/supabase/server';
import type { CreateKategoriPayload, UpdateKategoriPayload } from '@/types';

export async function getAllKategori() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('kategori_barang').select('*').order('kode_kategori', { ascending: true });

  if (error) throw new Error(error.message);
  return data;
}

export async function getKategoriById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('kategori_barang').select('*').eq('id', id).single();

  if (error) throw new Error(error.message);
  return data;
}

export async function getLastKategoriCode() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('kategori_barang').select('kode_kategori').order('kode_kategori', { ascending: false }).limit(1).maybeSingle();

  if (error) throw new Error(error.message);
  return data?.kode_kategori ?? null;
}

export async function insertKategori(payload: CreateKategoriPayload) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('kategori_barang').insert(payload).select().single();

  if (error) throw new Error(error.message);
  return data;
}

export async function updateKategori(id: string, payload: UpdateKategoriPayload) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('kategori_barang').update(payload).eq('id', id).select().single();

  if (error) throw new Error(error.message);
  return data;
}

export async function deleteKategori(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('kategori_barang').delete().eq('id', id);

  if (error) throw new Error(error.message);
}
