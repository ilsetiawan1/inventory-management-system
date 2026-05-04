'use client';

import React from 'react';
import { Search, Plus, Calendar } from 'lucide-react';

import type { BarangMasukWithRelasi } from '@/types/transaksi';

interface BarangMasukTableProps {
  data: BarangMasukWithRelasi[];
  onAdd: () => void;
}

export function BarangMasukTable({ data, onAdd }: BarangMasukTableProps) {
  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(angka);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
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
            placeholder="Cari transaksi..."
            className="w-full pl-10 pr-4 py-2.5 bg-white/70 backdrop-blur-md border border-white shadow-sm rounded-xl text-[14px] outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all placeholder:text-slate-400 text-slate-700"
          />
        </div>
        <button
          onClick={onAdd}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold text-[14px] shadow-lg shadow-purple-600/20 transition-all active:scale-[0.98]"
        >
          <Plus size={18} />
          <span>Transaksi Baru</span>
        </button>
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:block w-full overflow-hidden bg-white/60 backdrop-blur-xl border border-white/80 rounded-3xl shadow-[0_8px_32px_-12px_rgba(0,0,0,0.05)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-[12px] font-bold uppercase tracking-wider text-slate-500">ID / Tanggal</th>
                <th className="px-6 py-4 text-[12px] font-bold uppercase tracking-wider text-slate-500">Barang & Supplier</th>
                <th className="px-6 py-4 text-[12px] font-bold uppercase tracking-wider text-slate-500">Jumlah</th>
                <th className="px-6 py-4 text-[12px] font-bold uppercase tracking-wider text-slate-500">Total Harga</th>
                <th className="px-6 py-4 text-[12px] font-bold uppercase tracking-wider text-slate-500 text-right">User</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-white/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="inline-flex w-max items-center px-2.5 py-1 rounded-md text-[10px] font-bold bg-slate-100 text-slate-600 uppercase tracking-wider">
                        {item.id.substring(0, 8)}
                      </span>
                      <div className="flex items-center gap-1.5 text-[12px] text-slate-500 mt-1">
                        <Calendar size={12} />
                        <span>{formatDate(item.tanggal_masuk)}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-slate-800">{item.barang?.nama_barang}</span>
                      <span className="text-[12px] text-slate-500">Dari: {item.supplier?.nama_supplier}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[13px] font-bold bg-blue-50 text-blue-600 border border-blue-100">
                      + {item.jumlah_masuk}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[14px] font-bold text-slate-800">{formatRupiah(item.total_harga)}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-[13px] font-medium text-slate-600">{item.users?.name}</span>
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500 text-[14px]">
                    Belum ada riwayat transaksi masuk.
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
              <div className="flex flex-col">
                <span className="text-[15px] font-bold text-slate-800">{item.barang?.nama_barang}</span>
                <span className="text-[12px] text-slate-500">Dari: {item.supplier?.nama_supplier}</span>
              </div>
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[13px] font-bold bg-blue-50 text-blue-600">
                + {item.jumlah_masuk}
              </span>
            </div>
            
            <div className="h-px bg-slate-100 w-full" />
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1.5 text-[12px] text-slate-500">
                <Calendar size={14} className="text-slate-400" />
                <span>{formatDate(item.tanggal_masuk)}</span>
              </div>
              <span className="text-[14px] font-bold text-slate-800">{formatRupiah(item.total_harga)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

