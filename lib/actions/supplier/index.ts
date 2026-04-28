'use server';
// lib/actions/supplier/index.ts
// Server Actions untuk fitur Supplier — dipanggil langsung dari Client Components

import { revalidatePath } from 'next/cache';
import { createSupplier, editSupplier, removeSupplier, getSupplierList, getSupplierDetail } from '@/lib/services/supplierService';
import { withErrorHandler } from '@/lib/utils/response';
import type { CreateSupplierPayload, UpdateSupplierPayload } from '@/types';

export async function actionGetSupplierList(params?: { search?: string; page?: number; limit?: number }) {
  return withErrorHandler(() => getSupplierList(params), 'Berhasil memuat data supplier');
}

export async function actionGetSupplierDetail(id: string) {
  return withErrorHandler(() => getSupplierDetail(id), 'Berhasil memuat detail supplier');
}

export async function actionCreateSupplier(payload: CreateSupplierPayload) {
  return withErrorHandler(async () => {
    const result = await createSupplier(payload);
    revalidatePath('/data-master/supplier');
    return result;
  }, 'Supplier berhasil ditambahkan');
}

export async function actionUpdateSupplier(id: string, payload: UpdateSupplierPayload) {
  return withErrorHandler(async () => {
    const result = await editSupplier(id, payload);
    revalidatePath('/data-master/supplier');
    return result;
  }, 'Supplier berhasil diperbarui');
}

export async function actionDeleteSupplier(id: string) {
  return withErrorHandler(async () => {
    await removeSupplier(id);
    revalidatePath('/data-master/supplier');
    return { id };
  }, 'Supplier berhasil dihapus');
}
