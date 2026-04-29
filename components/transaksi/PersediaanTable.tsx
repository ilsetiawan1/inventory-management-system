'use client';

import React from 'react';
import { Search, Package } from 'lucide-react';

import type { PersediaanWithBarang } from '@/types/barang';

interface PersediaanTableProps {
  data: PersediaanWithBarang[];
}

export function PersediaanTable({ data }: PersediaanTableProps) {
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
            placeholder="Cari persediaan..."
            className="w-full pl-10 pr-4 py-2.5 bg-white/70 backdrop-blur-md border border-white shadow-sm rounded-xl text-[14px] outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all placeholder:text-slate-400 text-slate-700"
          />
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:block w-full overflow-hidden bg-white/60 backdrop-blur-xl border border-white/80 rounded-3xl shadow-[0_8px_32px_-12px_rgba(0,0,0,0.05)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-[12px] font-bold uppercase tracking-wider text-slate-500">ID / Kode</th>
                <th className="px-6 py-4 text-[12px] font-bold uppercase tracking-wider text-slate-500">Nama Barang</th>
                <th className="px-6 py-4 text-[12px] font-bold uppercase tracking-wider text-slate-500">Stok Saat Ini</th>
                <th className="px-6 py-4 text-[12px] font-bold uppercase tracking-wider text-slate-500">HPP (Rata-rata)</th>
                <th className="px-6 py-4 text-[12px] font-bold uppercase tracking-wider text-slate-500">Total Nilai</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-white/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-slate-100 text-slate-600 uppercase">
                      {item.id.substring(0, 8)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                        <Package size={18} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[14px] font-bold text-slate-800">{item.barang?.nama_barang || 'Barang Tidak Ditemukan'}</span>
                        <span className="text-[11px] font-semibold text-purple-600">{item.barang?.barang_code || '-'}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-lg text-[13px] font-bold ${
                      item.stok <= 5 ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                    }`}>
                      {item.stok} {item.barang?.satuan?.nama_satuan || 'unit'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[14px] font-semibold text-slate-700">{formatRupiah(item.hpp || 0)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[14px] font-bold text-slate-800">{formatRupiah((item.hpp || 0) * (item.stok || 0))}</span>
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500 text-[14px]">
                    Belum ada data persediaan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="flex flex-col gap-4 sm:hidden">
        {data.map((item) => (
          <div key={item.id} className="bg-white/80 backdrop-blur-xl border border-white/80 rounded-2xl p-5 shadow-[0_4px_16px_-8px_rgba(0,0,0,0.05)] flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 flex-shrink-0">
                  <Package size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[15px] font-bold text-slate-800">{item.barang?.nama_barang}</span>
                  <span className="text-[11px] font-semibold text-purple-600">{item.barang?.barang_code}</span>
                </div>
              </div>
            </div>
            
            <div className="h-px bg-slate-100 w-full" />
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-[11px] text-slate-500">Stok Saat Ini</span>
                <span className={`text-[15px] font-bold ${item.stok <= 5 ? 'text-red-600' : 'text-emerald-600'}`}>
                  {item.stok} {item.barang?.satuan?.nama_satuan || 'unit'}
                </span>
              </div>
              <div className="flex flex-col gap-1 text-right">
                <span className="text-[11px] text-slate-500">HPP</span>
                <span className="text-[14px] font-semibold text-slate-700">{formatRupiah(item.hpp || 0)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
