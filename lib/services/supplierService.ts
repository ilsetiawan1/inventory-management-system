// lib/services/supplierService.ts
// Business Logic Layer — memanggil repository, menangani logic bisnis

import { getAllSupplier, getSupplierById, getLastSupplierCode, insertSupplier, updateSupplier, deleteSupplier, countSupplier } from '@/lib/repositories/supplierRepository';
import { generateSupplierCode } from '@/lib/utils/generateCode';
import type { CreateSupplierPayload, UpdateSupplierPayload } from '@/types';

export async function getSupplierList(params?: { search?: string; page?: number; limit?: number }) {
  return getAllSupplier(params);
}

export async function getSupplierDetail(id: string) {
  return getSupplierById(id);
}

export async function createSupplier(payload: CreateSupplierPayload) {
  // Generate kode unik supplier
  const lastCode = await getLastSupplierCode();
  const supplier_code = generateSupplierCode(lastCode);

  return insertSupplier({ ...payload, supplier_code });
}

export async function editSupplier(id: string, payload: UpdateSupplierPayload) {
  // Pastikan supplier ada
  await getSupplierById(id);
  return updateSupplier(id, payload);
}

export async function removeSupplier(id: string) {
  // Pastikan supplier ada sebelum dihapus
  await getSupplierById(id);
  return deleteSupplier(id);
}

export async function getTotalSupplier() {
  return countSupplier();
}
