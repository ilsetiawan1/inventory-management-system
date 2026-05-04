// lib/repositories/fiturRepository.ts
import { createClient } from '@/lib/supabase/server';

export async function getAllFitur() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('fitur')
    .select('*')
    .order('urutan', { ascending: true });

  if (error) throw new Error(error.message);
  return data ?? [];
}
