'use client';

import React from 'react';

import type { Barang } from '@/types/barang';
import type { Supplier } from '@/types/supplier';
import type { CreateBarangMasukPayload } from '@/types/transaksi';

interface BarangMasukFormProps {
  barangList: Barang[];
  supplierList: Supplier[];
  onSubmit: (data: Partial<CreateBarangMasukPayload>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function BarangMasukForm({ barangList, supplierList, onSubmit, onCancel, isLoading }: BarangMasukFormProps) {
  const [formData, setFormData] = React.useState({
    id_barang: '',
    id_supplier: '',
    jumlah_masuk: '',
    total_harga: '',
    keterangan: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      jumlah_masuk: parseInt(formData.jumlah_masuk, 10),
      total_harga: parseFloat(formData.total_harga)
    });
  };

  return (
    <div className="w-full max-w-2xl bg-white/80 backdrop-blur-2xl border border-white/80 rounded-[32px] shadow-[0_24px_60px_-12px_rgba(0,0,0,0.1)] p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 tracking-tight">
        Transaksi Barang Masuk
      </h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-slate-600 ml-1">Pilih Barang *</label>
          <select
            required
            value={formData.id_barang}
            onChange={(e) => setFormData({ ...formData, id_barang: e.target.value })}
            className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-2xl text-[14px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all appearance-none"
          >
            <option value="" disabled>-- Pilih Barang --</option>
            {barangList.map(b => (
              <option key={b.id} value={b.id}>{b.barang_code} - {b.nama_barang}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-slate-600 ml-1">Pilih Supplier *</label>
          <select
            required
            value={formData.id_supplier}
            onChange={(e) => setFormData({ ...formData, id_supplier: e.target.value })}
            className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-2xl text-[14px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all appearance-none"
          >
            <option value="" disabled>-- Pilih Supplier --</option>
            {supplierList.map(s => (
              <option key={s.id} value={s.id}>{s.nama_supplier}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-slate-600 ml-1">Jumlah *</label>
            <input
              required
              type="number"
              min="1"
              value={formData.jumlah_masuk}
              onChange={(e) => setFormData({ ...formData, jumlah_masuk: e.target.value })}
              placeholder="0"
              className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-2xl text-[14px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all placeholder:text-slate-400"
            />
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-slate-600 ml-1">Total Harga (Rp) *</label>
            <input
              required
              type="number"
              min="0"
              value={formData.total_harga}
              onChange={(e) => setFormData({ ...formData, total_harga: e.target.value })}
              placeholder="0"
              className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-2xl text-[14px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-slate-600 ml-1">Keterangan (Opsional)</label>
          <textarea
            rows={2}
            value={formData.keterangan || ''}
            onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
            placeholder="Keterangan transaksi..."
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
            disabled={isLoading}
            className="px-6 py-3 rounded-2xl text-[14px] font-bold text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg shadow-blue-500/20 transition-all active:scale-95 disabled:opacity-50"
          >
            {isLoading ? 'Memproses...' : 'Simpan Transaksi'}
          </button>
        </div>
      </form>
    </div>
  );
}
