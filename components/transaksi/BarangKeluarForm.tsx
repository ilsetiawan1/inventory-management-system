'use client';

import React from 'react';

import type { PersediaanWithBarang } from '@/types/barang';
import type { CreateBarangKeluarPayload } from '@/types/transaksi';

interface BarangKeluarFormProps {
  persediaanList: PersediaanWithBarang[];
  onSubmit: (data: Partial<CreateBarangKeluarPayload>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function BarangKeluarForm({ persediaanList, onSubmit, onCancel, isLoading }: BarangKeluarFormProps) {
  const [formData, setFormData] = React.useState({
    id_barang: '',
    jumlah_keluar: '',
    keterangan: '',
  });

  const selectedItem = persediaanList.find(p => p.id_barang === formData.id_barang);
  const maxStok = selectedItem?.stok || 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      jumlah_keluar: parseInt(formData.jumlah_keluar, 10),
    });
  };

  return (
    <div className="w-full max-w-2xl bg-white/80 backdrop-blur-2xl border border-white/80 rounded-[32px] shadow-[0_24px_60px_-12px_rgba(0,0,0,0.1)] p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 tracking-tight">
        Catat Barang Keluar
      </h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-slate-600 ml-1">Pilih Barang dari Persediaan *</label>
          <select
            required
            value={formData.id_barang}
            onChange={(e) => setFormData({ ...formData, id_barang: e.target.value })}
            className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-2xl text-[14px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all appearance-none"
          >
            <option value="" disabled>-- Pilih Barang --</option>
            {persediaanList.map(p => (
              <option key={p.id_barang} value={p.id_barang} disabled={p.stok <= 0}>
                {p.barang?.barang_code} - {p.barang?.nama_barang} (Stok: {p.stok})
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-slate-600 ml-1">Jumlah Keluar *</label>
          <div className="relative">
            <input
              required
              type="number"
              min="1"
              max={maxStok > 0 ? maxStok : undefined}
              value={formData.jumlah_keluar}
              onChange={(e) => setFormData({ ...formData, jumlah_keluar: e.target.value })}
              placeholder="0"
              disabled={!formData.id_barang}
              className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-2xl text-[14px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all placeholder:text-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            {formData.id_barang && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[12px] text-slate-400 pointer-events-none">
                Maks: {maxStok}
              </div>
            )}
          </div>
          {formData.jumlah_keluar && parseInt(formData.jumlah_keluar) > maxStok && (
            <p className="text-[11px] text-red-500 ml-1 mt-0.5">Jumlah melebihi stok yang tersedia!</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-slate-600 ml-1">Keterangan / Tujuan *</label>
          <textarea
            required
            rows={2}
            value={formData.keterangan || ''}
            onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
            placeholder="Misal: Dikirim ke cabang A, Terjual, Rusak..."
            className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-2xl text-[14px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all placeholder:text-slate-400 resize-none"
          />
        </div>

        <div className="h-px w-full bg-slate-100 my-2" />

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="px-6 py-3 rounded-2xl text-[14px] font-bold text-slate-500 hover:bg-slate-100 transition-colors disabled:opacity-50"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={isLoading || (formData.jumlah_keluar ? parseInt(formData.jumlah_keluar) > maxStok : true)}
            className="px-6 py-3 rounded-2xl text-[14px] font-bold text-white bg-linear-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-lg shadow-red-500/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Memproses...' : 'Simpan Transaksi'}
          </button>
        </div>
      </form>
    </div>
  );
}

