'use client';

import React from 'react';
import type { Supplier } from '@/types/supplier';

interface SupplierFormProps {
  initialData?: Supplier;
  onSubmit: (data: Partial<Supplier>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function SupplierForm({ initialData, onSubmit, onCancel, isLoading }: SupplierFormProps) {
  const [formData, setFormData] = React.useState<Partial<Supplier>>({
    nama_supplier: initialData?.nama_supplier || '',
    nama_kontak: initialData?.nama_kontak || '',
    email: initialData?.email || '',
    no_telepon: initialData?.no_telepon || '',
    alamat: initialData?.alamat || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="w-full max-w-2xl bg-white/80 backdrop-blur-2xl border border-white/80 rounded-[32px] shadow-[0_24px_60px_-12px_rgba(0,0,0,0.1)] p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 tracking-tight">
        {initialData ? 'Edit Supplier' : 'Tambah Supplier Baru'}
      </h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-slate-600 ml-1">Nama Perusahaan *</label>
          <input
            required
            type="text"
            value={formData.nama_supplier}
            onChange={(e) => setFormData({ ...formData, nama_supplier: e.target.value })}
            placeholder="Mis. PT Akurat Maju"
            className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-2xl text-[14px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all placeholder:text-slate-400"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-slate-600 ml-1">Kontak Person</label>
            <input
              type="text"
              value={formData.nama_kontak || ''}
              onChange={(e) => setFormData({ ...formData, nama_kontak: e.target.value })}
              placeholder="Mis. Budi Santoso"
              className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-2xl text-[14px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all placeholder:text-slate-400"
            />
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-slate-600 ml-1">Telepon</label>
            <input
              type="text"
              value={formData.no_telepon || ''}
              onChange={(e) => setFormData({ ...formData, no_telepon: e.target.value })}
              placeholder="0812xxxxxx"
              className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-2xl text-[14px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-slate-600 ml-1">Email</label>
          <input
            type="email"
            value={formData.email || ''}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="supplier@contoh.com"
            className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-2xl text-[14px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all placeholder:text-slate-400"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-slate-600 ml-1">Alamat Lengkap</label>
          <textarea
            rows={3}
            value={formData.alamat || ''}
            onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
            placeholder="Jln. Sudirman No..."
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
            className="px-6 py-3 rounded-2xl text-[14px] font-bold text-white bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg shadow-purple-600/20 transition-all active:scale-95 disabled:opacity-50"
          >
            {isLoading ? 'Menyimpan...' : 'Simpan Data'}
          </button>
        </div>
      </form>
    </div>
  );
}

