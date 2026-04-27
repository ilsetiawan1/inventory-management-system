// lib/repositories/satuanRepository.ts
// Data Access Layer — hanya berisi query Supabase, tanpa business logic

import { createClient } from '@/lib/supabase/server';
import type { CreateSatuanPayload } from '@/types';

export async function getAllSatuan() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('satuan').select('*').order('nama_satuan', { ascending: true });

  if (error) throw new Error(error.message);
  return data;
}

export async function getSatuanById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('satuan').select('*').eq('id', id).single();

  if (error) throw new Error(error.message);
  return data;
}

export async function insertSatuan(payload: CreateSatuanPayload) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('satuan').insert(payload).select().single();

  if (error) throw new Error(error.message);
  return data;
}

export async function updateSatuan(id: string, nama_satuan: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('satuan').update({ nama_satuan }).eq('id', id).select().single();

  if (error) throw new Error(error.message);
  return data;
}

export async function deleteSatuan(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('satuan').delete().eq('id', id);

  if (error) throw new Error(error.message);
}
