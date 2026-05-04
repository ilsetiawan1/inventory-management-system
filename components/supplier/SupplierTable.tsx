'use client';

import React from 'react';
import { Edit2, Trash2, Phone, Mail, MapPin, Search, Plus, User } from 'lucide-react';
import type { Supplier } from '@/types/supplier';

interface SupplierTableProps {
  data: Supplier[];
  onEdit: (supplier: Supplier) => void;
  onDelete: (supplier: Supplier) => void;
  onAdd: () => void;
}

export function SupplierTable({ data, onEdit, onDelete, onAdd }: SupplierTableProps) {
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
            placeholder="Cari nama supplier..."
            className="w-full pl-10 pr-4 py-2.5 bg-white/70 backdrop-blur-md border border-white shadow-sm rounded-xl text-[14px] outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all placeholder:text-slate-400 text-slate-700"
          />
        </div>
        <button
          onClick={onAdd}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold text-[14px] shadow-lg shadow-purple-600/20 transition-all active:scale-[0.98]"
        >
          <Plus size={18} />
          <span>Tambah Supplier</span>
        </button>
      </div>

      {/* Desktop Table View (Hidden on mobile) */}
      <div className="hidden sm:block w-full overflow-hidden bg-white/60 backdrop-blur-xl border border-white/80 rounded-3xl shadow-[0_8px_32px_-12px_rgba(0,0,0,0.05)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-[12px] font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap">ID Supplier</th>
                <th className="px-6 py-4 text-[12px] font-bold uppercase tracking-wider text-slate-500">Info Utama</th>
                <th className="px-6 py-4 text-[12px] font-bold uppercase tracking-wider text-slate-500">Kontak</th>
                <th className="px-6 py-4 text-[12px] font-bold uppercase tracking-wider text-slate-500">Alamat</th>
                <th className="px-6 py-4 text-[12px] font-bold uppercase tracking-wider text-slate-500 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-white/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600">
                      {item.supplier_code || item.id.substring(0, 8)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-slate-800">{item.nama_supplier}</span>
                      <span className="text-[12px] text-slate-500">{item.nama_kontak || '-'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-[13px] text-slate-600">
                        <Phone size={14} className="text-slate-400" />
                        <span>{item.no_telepon || '-'}</span>
                      </div>
                      {item.email && (
                        <div className="flex items-center gap-1.5 text-[13px] text-slate-600">
                          <Mail size={14} className="text-slate-400" />
                          <span>{item.email}</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 max-w-[200px] truncate text-[13px] text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={14} className="text-slate-400 shrink-0" />
                      <span className="truncate">{item.alamat || '-'}</span>
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
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500 text-[14px]">
                    Belum ada data supplier.
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
          <div key={item.id} className="bg-white/80 backdrop-blur-xl border border-white/80 rounded-2xl p-5 shadow-[0_4px_16px_-8px_rgba(0,0,0,0.05)] flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <span className="text-[15px] font-bold text-slate-800">{item.nama_supplier}</span>
                <span className="text-[12px] font-semibold text-purple-600">{item.supplier_code || item.id.substring(0, 8)}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onEdit(item)}
                  className="p-2 rounded-xl bg-slate-50 text-slate-600 active:bg-slate-100"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => onDelete(item)}
                  className="p-2 rounded-xl bg-red-50 text-red-600 active:bg-red-100"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            <div className="h-px bg-slate-100 w-full" />
            
            <div className="flex flex-col gap-2">
              {item.nama_kontak && (
                <div className="flex items-center gap-2 text-[13px] text-slate-600">
                  <User size={14} className="text-slate-400" />
                  <span>{item.nama_kontak}</span>
                </div>
              )}
              {item.no_telepon && (
                <div className="flex items-center gap-2 text-[13px] text-slate-600">
                  <Phone size={14} className="text-slate-400" />
                  <span>{item.no_telepon}</span>
                </div>
              )}
              {item.alamat && (
                <div className="flex items-center gap-2 text-[13px] text-slate-600">
                  <MapPin size={14} className="text-slate-400" />
                  <span className="line-clamp-2">{item.alamat}</span>
                </div>
              )}
            </div>
          </div>
        ))}
        {data.length === 0 && (
          <div className="bg-white/50 backdrop-blur-md border border-white/50 rounded-2xl p-8 text-center text-slate-500 text-[14px]">
            Belum ada data supplier.
          </div>
        )}
      </div>
    </div>
  );
}

