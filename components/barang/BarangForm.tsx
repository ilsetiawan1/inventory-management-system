'use client';

import React from 'react';
import { BarangImageUpload } from './BarangImageUpload';

import type { Barang, KategoriBarang, Satuan } from '@/types/barang';

interface BarangFormProps {
  initialData?: Barang;
  kategoriList: KategoriBarang[];
  satuanList: Satuan[];
  onSubmit: (data: Partial<Barang>, imageFile: File | null) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function BarangForm({ initialData, kategoriList, satuanList, onSubmit, onCancel, isLoading }: BarangFormProps) {
  const [formData, setFormData] = React.useState<Partial<Barang>>({
    nama_barang: initialData?.nama_barang || '',
    id_kategori: initialData?.id_kategori || '',
    id_satuan: initialData?.id_satuan || '',
    harga: initialData?.harga || 0,
  });

  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(initialData?.image_url || null);

  const handleImageChange = (file: File | null, url: string | null) => {
    setImageFile(file);
    setPreviewUrl(url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Format harga to number
    const dataToSubmit = {
      ...formData,
      harga: Number(formData.harga) || 0
    };
    onSubmit(dataToSubmit, imageFile);
  };

  return (
    <div className="w-full max-w-4xl flex flex-col md:flex-row gap-6">
      
      {/* Left Column: Image Upload */}
      <div className="w-full md:w-1/3 flex flex-col gap-4">
        <div className="bg-white/80 backdrop-blur-2xl border border-white/80 rounded-[32px] shadow-[0_12px_40px_-12px_rgba(0,0,0,0.1)] p-6">
          <h3 className="text-[14px] font-bold text-slate-800 mb-4">Foto Barang</h3>
          <BarangImageUpload 
            initialPreview={previewUrl}
            onImageSelect={handleImageChange}
            disabled={isLoading}
          />
          <p className="text-[11px] text-slate-400 mt-4 text-center">
            Maks. 2MB. Format: JPG, PNG, WEBP.
          </p>
        </div>
      </div>

      {/* Right Column: Form Fields */}
      <div className="w-full md:w-2/3 bg-white/80 backdrop-blur-2xl border border-white/80 rounded-[32px] shadow-[0_24px_60px_-12px_rgba(0,0,0,0.1)] p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 tracking-tight">
          {initialData ? 'Edit Data Barang' : 'Tambah Barang Baru'}
        </h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-slate-600 ml-1">Nama Barang *</label>
            <input
              required
              type="text"
              value={formData.nama_barang}
              onChange={(e) => setFormData({ ...formData, nama_barang: e.target.value })}
              placeholder="Mis. Minyak Goreng Bimoli 2L"
              className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-2xl text-[14px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all placeholder:text-slate-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-slate-600 ml-1">Kategori *</label>
              <select
                required
                value={formData.id_kategori}
                onChange={(e) => setFormData({ ...formData, id_kategori: e.target.value })}
                className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-2xl text-[14px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all appearance-none"
              >
                <option value="" disabled>Pilih Kategori</option>
                {kategoriList.map(k => (
                  <option key={k.id} value={k.id}>{k.nama_kategori}</option>
                ))}
              </select>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-slate-600 ml-1">Satuan *</label>
              <select
                required
                value={formData.id_satuan}
                onChange={(e) => setFormData({ ...formData, id_satuan: e.target.value })}
                className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-2xl text-[14px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all appearance-none"
              >
                <option value="" disabled>Pilih Satuan</option>
                {satuanList.map(s => (
                  <option key={s.id} value={s.id}>{s.nama_satuan}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-slate-600 ml-1">Harga Jual (Rp) *</label>
            <input
              required
              type="number"
              min="0"
              value={formData.harga}
              onChange={(e) => setFormData({ ...formData, harga: e.target.value ? Number(e.target.value) : 0 })}
              placeholder="0"
              className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-2xl text-[14px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all placeholder:text-slate-400"
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
              className="px-6 py-3 rounded-2xl text-[14px] font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg shadow-purple-600/20 transition-all active:scale-95 disabled:opacity-50"
            >
              {isLoading ? 'Menyimpan...' : 'Simpan Data'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
