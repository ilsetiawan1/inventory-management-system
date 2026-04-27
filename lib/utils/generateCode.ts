// lib/utils/generateCode.ts
// Helper untuk generate kode unik setiap entitas

/**
 * Generate kode supplier: S001, S002, S003, ...
 */
export function generateSupplierCode(lastCode: string | null): string {
  if (!lastCode) return 'S001';
  const num = parseInt(lastCode.replace('S', ''), 10);
  return `S${String(num + 1).padStart(3, '0')}`;
}

/**
 * Generate kode barang: 000001, 000002, ...
 */
export function generateBarangCode(lastCode: string | null): string {
  if (!lastCode) return '000001';
  const num = parseInt(lastCode, 10);
  return String(num + 1).padStart(6, '0');
}

/**
 * Generate kode user: USR001, USR002, ...
 */
export function generateUserCode(lastCode: string | null): string {
  if (!lastCode) return 'USR001';
  const num = parseInt(lastCode.replace('USR', ''), 10);
  return `USR${String(num + 1).padStart(3, '0')}`;
}

/**
 * Generate kode kategori: KAT-001, KAT-002, ...
 */
export function generateKategoriCode(lastCode: string | null): string {
  if (!lastCode) return 'KAT-001';
  const num = parseInt(lastCode.replace('KAT-', ''), 10);
  return `KAT-${String(num + 1).padStart(3, '0')}`;
}

/**
 * Generate kode barang masuk: BM-2024-001
 * Format: BM-{YEAR}-{SEQ}
 */
export function generateBarangMasukCode(lastCode: string | null): string {
  const year = new Date().getFullYear();
  const prefix = `BM-${year}-`;

  if (!lastCode || !lastCode.startsWith(prefix)) {
    return `${prefix}001`;
  }

  const seq = parseInt(lastCode.replace(prefix, ''), 10);
  return `${prefix}${String(seq + 1).padStart(3, '0')}`;
}

/**
 * Generate kode barang keluar: BK-2024-001
 * Format: BK-{YEAR}-{SEQ}
 */
export function generateBarangKeluarCode(lastCode: string | null): string {
  const year = new Date().getFullYear();
  const prefix = `BK-${year}-`;

  if (!lastCode || !lastCode.startsWith(prefix)) {
    return `${prefix}001`;
  }

  const seq = parseInt(lastCode.replace(prefix, ''), 10);
  return `${prefix}${String(seq + 1).padStart(3, '0')}`;
}
