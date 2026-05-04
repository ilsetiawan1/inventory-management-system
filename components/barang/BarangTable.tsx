'use client';

import React from 'react';
import { Edit2, Trash2, Search, Plus, Image as ImageIcon, Package } from 'lucide-react';

import type { BarangWithRelasi } from '@/types/barang';

interface BarangTableProps {
  data: BarangWithRelasi[];
  onEdit: (barang: BarangWithRelasi) => void;
  onDelete: (barang: BarangWithRelasi) => void;
  onAdd: () => void;
}

export function BarangTable({ data, onEdit, onDelete, onAdd }: BarangTableProps) {
  // Format currency
  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(angka);
  };

  return (
    <div className="w-full">
      {/* Toolbar / Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="relative w-full sm:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Cari kode atau nama barang..."
            className="w-full pl-10 pr-4 py-2.5 bg-white/70 backdrop-blur-md border border-white shadow-sm rounded-xl text-[14px] outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all placeholder:text-slate-400 text-slate-700"
          />
        </div>
        <div className="flex w-full sm:w-auto items-center gap-3">
          <button
            onClick={onAdd}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold text-[14px] shadow-lg shadow-purple-600/20 transition-all active:scale-[0.98]"
          >
            <Plus size={18} />
            <span>Tambah Barang</span>
          </button>
        </div>
      </div>

      {/* Desktop Table View (Hidden on mobile) */}
      <div className="hidden sm:block w-full overflow-hidden bg-white/60 backdrop-blur-xl border border-white/80 rounded-3xl shadow-[0_8px_32px_-12px_rgba(0,0,0,0.05)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-[12px] font-bold uppercase tracking-wider text-slate-500">Info Barang</th>
                <th className="px-6 py-4 text-[12px] font-bold uppercase tracking-wider text-slate-500">Kategori</th>
                <th className="px-6 py-4 text-[12px] font-bold uppercase tracking-wider text-slate-500">Harga</th>
                <th className="px-6 py-4 text-[12px] font-bold uppercase tracking-wider text-slate-500 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-white/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      {item.image_url ? (
                        <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-200 shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={item.image_url} alt={item.nama_barang} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 text-slate-400">
                          <ImageIcon size={20} />
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="text-[14px] font-bold text-slate-800">{item.nama_barang}</span>
                        <span className="text-[12px] text-purple-600 font-semibold">{item.barang_code}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="inline-flex items-center w-max px-2.5 py-1 rounded-md text-[11px] font-bold bg-indigo-50 text-indigo-600">
                        {item.kategori_barang?.nama_kategori || '-'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-slate-800">{formatRupiah(item.harga || 0)}</span>
                      <span className="text-[12px] text-slate-500">per {item.satuan?.nama_satuan || 'unit'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onEdit(item)}
                        className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => onDelete(item)}
                        className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                        title="Hapus"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-500 text-[14px]">
                    Belum ada data barang.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View (Hidden on desktop) */}
      <div className="flex flex-col gap-4 sm:hidden">
        {data.map((item) => (
          <div key={item.id} className="bg-white/80 backdrop-blur-xl border border-white/80 rounded-2xl p-4 shadow-[0_4px_16px_-8px_rgba(0,0,0,0.05)] flex gap-4">
            {/* Image */}
            <div className="shrink-0">
              {item.image_url ? (
                <div className="w-16 h-16 rounded-xl overflow-hidden border border-slate-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image_url} alt={item.nama_barang} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                  <Package size={24} />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col flex-1 justify-between py-0.5">
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold text-slate-800 leading-tight mb-1">{item.nama_barang}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-purple-600 uppercase bg-purple-50 px-1.5 py-0.5 rounded">{item.barang_code}</span>
                    <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">{item.kategori_barang?.nama_kategori || '-'}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-end mt-3">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500">Harga per {item.satuan?.nama_satuan || 'unit'}</span>
                  <span className="text-[13px] font-bold text-slate-800">{formatRupiah(item.harga || 0)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onEdit(item)}
                    className="p-1.5 rounded-lg bg-blue-50 text-blue-600 active:bg-blue-100"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => onDelete(item)}
                    className="p-1.5 rounded-lg bg-red-50 text-red-600 active:bg-red-100"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {data.length === 0 && (
          <div className="bg-white/50 backdrop-blur-md border border-white/50 rounded-2xl p-8 text-center text-slate-500 text-[14px]">
            Belum ada data barang.
          </div>
        )}
      </div>
    </div>
  );
}

