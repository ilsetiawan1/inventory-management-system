// components\users\UserTable.tsx

'use client';

import { useState, useTransition } from 'react';
import { Search, Plus, Trash2, Edit2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { actionDeleteUser, actionToggleUserStatus } from '@/lib/actions/users';
import { toast } from 'sonner';
import type { User } from '@/types';

interface UserTableProps {
  users: User[];
  totalCount: number;
  currentPage: number;
  limit: number;
  canManageUsers: boolean;
}

export function UserTable({ users, totalCount, currentPage, limit, canManageUsers }: UserTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

  const totalPages = Math.ceil(totalCount / limit) || 1;

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchTerm) {
      params.set('search', searchTerm);
      params.set('page', '1');
    } else {
      params.delete('search');
    }
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }

  function handlePageChange(newPage: number) {
    if (newPage < 1 || newPage > totalPages) return;
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }

  function handleDelete(id: string, name: string) {
    if (!confirm(`Apakah Anda yakin ingin menghapus pengguna "${name}"?`)) return;
    
    startTransition(async () => {
      toast.loading('Menghapus pengguna...');
      const res = await actionDeleteUser(id);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  }

  function handleToggleStatus(id: string, currentStatus: 'Active' | 'Inactive') {
    startTransition(async () => {
      const res = await actionToggleUserStatus(id, currentStatus);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  }

  return (
    <div className="card w-full overflow-hidden flex flex-col bg-(--color-background)">
      {/* ── Toolbar ── */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center p-4 border-b border-(--color-border)">
        <form onSubmit={handleSearch} className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-(--color-text-muted) w-4 h-4" />
          <input
            type="text"
            placeholder="Cari nama, email, ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-9 bg-(--color-surface) border-transparent focus:border-(--color-primary) w-full"
          />
        </form>

        {canManageUsers && (
          <Link
            href="/hak-akses/tambah"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm text-white bg-(--color-primary) hover:bg-(--color-primary-hover) transition-colors shadow-[0_4px_12px_rgba(124,58,237,0.25)] hover:-translate-y-0.5 w-full sm:w-auto justify-center"
          >
            <Plus size={16} strokeWidth={2.5} />
            Tambah Pengguna Baru
          </Link>
        )}
      </div>

      {/* ── Table ── */}
      <div className="table-wrapper border-none rounded-none overflow-x-auto relative min-h-[300px]">
        {isPending && (
          <div className="absolute inset-0 bg-(--color-background)/50 backdrop-blur-[2px] z-10 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-(--color-primary) border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        <table className="table w-full whitespace-nowrap">
          <thead>
            <tr>
              <th className="w-12 text-center">
                <input type="checkbox" className="rounded border-(--color-border) bg-(--color-surface) w-4 h-4" />
              </th>
              <th>Nama</th>
              <th>ID Pengguna</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              {canManageUsers && <th className="text-right">Aksi</th>}
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-12 text-(--color-text-muted)">
                  Tidak ada pengguna ditemukan.
                </td>
              </tr>
            ) : (
              users.map((user) => {
                const initials = user.name.slice(0, 2).toUpperCase();
                return (
                  <tr key={user.id} className="group hover:bg-(--color-surface) border-b border-(--color-border-subtle)">
                    <td className="text-center">
                      <input type="checkbox" className="rounded border-(--color-border) bg-(--color-surface) w-4 h-4" />
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-(--color-primary-light) text-(--color-primary) flex items-center justify-center font-bold text-xs shrink-0 overflow-hidden">
                          {user.avatar_url ? (
                            <img src={user.avatar_url} alt={user.name} className="w-full h-full object-cover" />
                          ) : (
                            initials
                          )}
                        </div>
                        <span className="font-medium text-(--color-text-primary)">{user.name}</span>
                      </div>
                    </td>
                    <td className="font-mono text-xs text-(--color-text-secondary)">{user.user_code}</td>
                    <td className="text-(--color-text-secondary)">{user.email}</td>
                    <td>
                      <span className="font-medium text-(--color-text-primary)">{user.role}</span>
                    </td>
                    <td>
                      <button
                        onClick={() => handleToggleStatus(user.id, user.status as 'Active' | 'Inactive')}
                        disabled={!canManageUsers || isPending}
                        className={`badge cursor-pointer ${
                          user.status === 'Active' ? 'badge-success' : 'badge-danger'
                        } hover:opacity-80 transition-opacity`}
                      >
                        {user.status}
                      </button>
                    </td>
                    {canManageUsers && (
                      <td className="text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity focus-within:opacity-100">
                          <button
                            onClick={() => handleDelete(user.id, user.name)}
                            disabled={isPending}
                            className="p-1.5 text-(--color-text-muted) hover:text-red-500 rounded bg-transparent hover:bg-red-500/10 transition-colors"
                            title="Hapus"
                          >
                            <Trash2 size={16} />
                          </button>
                          <Link
                            href={`/hak-akses/${user.id}/edit`}
                            className="p-1.5 text-(--color-text-muted) hover:text-(--color-primary) rounded bg-transparent hover:bg-(--color-primary)/10 transition-colors"
                            title="Edit"
                          >
                            <Edit2 size={16} />
                          </Link>
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ── Pagination ── */}
      <div className="p-4 border-t border-(--color-border) flex items-center justify-between text-sm text-(--color-text-secondary)">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || isPending}
          className="px-4 py-2 flex items-center gap-2 border border-(--color-border) rounded-md disabled:opacity-50 hover:bg-(--color-surface) transition-colors"
        >
          &larr; Sebelumnya
        </button>
        <span className="font-medium px-4 py-1.5 bg-(--color-primary-light) text-(--color-primary) rounded-md">
          {currentPage}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || isPending}
          className="px-4 py-2 flex items-center gap-2 border border-(--color-border) rounded-md disabled:opacity-50 hover:bg-(--color-surface) transition-colors"
        >
          Selanjutnya &rarr;
        </button>
      </div>
    </div>
  );
}

