// lib/utils/formatter.ts
// Helper formatting — currency, tanggal, angka

/**
 * Format angka ke Rupiah
 * Contoh: 1500000 → "Rp 1.500.000"
 */
export function formatRupiah(value: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Format tanggal ISO ke format lokal Indonesia
 * Contoh: "2024-04-01" → "01 April 2024"
 */
export function formatTanggal(dateStr: string): string {
  if (!dateStr) return '-';
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateStr));
}

/**
 * Format tanggal ke format singkat
 * Contoh: "2024-04-01" → "01/04/2024"
 */
export function formatTanggalPendek(dateStr: string): string {
  if (!dateStr) return '-';
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(dateStr));
}

/**
 * Format angka biasa dengan pemisah ribuan
 * Contoh: 1500 → "1.500"
 */
export function formatAngka(value: number): string {
  return new Intl.NumberFormat('id-ID').format(value);
}

/**
 * Format persentase
 * Contoh: 12 → "+12%" | -5 → "-5%"
 */
export function formatPersen(value: number): string {
  const sign = value > 0 ? '+' : '';
  return `${sign}${value}%`;
}

/**
 * Truncate teks panjang
 * Contoh: truncate("Hello World", 5) → "Hello..."
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

/**
 * Konversi string tanggal ke format input date (yyyy-MM-dd)
 * Berguna untuk value default di <input type="date">
 */
export function toInputDate(dateStr?: string | null): string {
  if (!dateStr) return new Date().toISOString().split('T')[0];
  return new Date(dateStr).toISOString().split('T')[0];
}
