'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { actionCreateUser } from '@/lib/actions/users';

interface Fitur {
  id: string;
  nama_fitur: string;
}

interface UserFormProps {
  lastUserCode: string | null;
  fiturList: Fitur[];
}

export function UserForm({ lastUserCode, fiturList }: UserFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Generate ID Pengguna (misal P01, P02)
  const nextCodeNumber = lastUserCode ? parseInt(lastUserCode.replace('P', ''), 10) + 1 : 1;
  const userCode = `P${nextCodeNumber.toString().padStart(2, '0')}`;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Staff', // Default
  });

  const [permissions, setPermissions] = useState<
    Record<string, { can_create: boolean; can_read: boolean; can_update: boolean; can_delete: boolean }>
  >(
    fiturList.reduce((acc, fitur) => {
      acc[fitur.id] = { can_create: false, can_read: false, can_update: false, can_delete: false };
      return acc;
    }, {} as Record<string, { can_create: boolean; can_read: boolean; can_update: boolean; can_delete: boolean }>)
  );

  function handlePermissionChange(fiturId: string, type: 'can_create' | 'can_read' | 'can_update' | 'can_delete') {
    setPermissions((prev) => ({
      ...prev,
      [fiturId]: {
        ...prev[fiturId],
        [type]: !prev[fiturId][type],
      },
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    // Validasi
    if (!formData.name || !formData.email || !formData.password) {
      toast.error('Mohon lengkapi semua field yang wajib.');
      return;
    }

    startTransition(async () => {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('password', formData.password);
      data.append('role', formData.role);
      data.append('permissions', JSON.stringify(permissions));
      
      toast.loading('Menyimpan pengguna...');
      const res = await actionCreateUser(data);
      if (res.success) {
        toast.success(res.message);
        router.push('/hak-akses');
      } else {
        toast.error(res.message);
      }
    });
  }

  return (
    <div className="max-w-[1000px] w-full">
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm font-semibold text-(--color-primary) hover:text-(--color-primary-hover) transition-colors mb-4"
        >
          <ArrowLeft size={16} />
          Kembali
        </button>
        <h1 className="text-2xl font-bold text-(--color-text-primary)">Tambah Pengguna</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="label">Nama</label>
            <input
              type="text"
              required
              placeholder="Masukkan Nama"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input-field"
              disabled={isPending}
            />
          </div>
          <div className="space-y-2">
            <label className="label">ID Pengguna</label>
            <input
              type="text"
              value={userCode}
              disabled
              className="input-field bg-(--color-surface) text-(--color-text-muted) cursor-not-allowed"
            />
          </div>
          <div className="space-y-2">
            <label className="label">Email</label>
            <input
              type="email"
              required
              placeholder="Masukkan Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="input-field"
              disabled={isPending}
            />
          </div>
          <div className="space-y-2">
            <label className="label">Password</label>
            <input
              type="password"
              required
              placeholder="Masukkan Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="input-field"
              disabled={isPending}
              minLength={6}
            />
          </div>
          <div className="space-y-2">
            <label className="label">Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="input-field bg-white dark:bg-(--color-background)"
              disabled={isPending}
            >
              <option value="Admin">Admin</option>
              <option value="Manejer">Manejer</option>
              <option value="Direktur Utama">Direktur Utama</option>
              <option value="Staff">Staff</option>
            </select>
          </div>
        </div>

        {/* Permissions Table */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-(--color-text-primary)">Hak Akses Fitur</h2>
          <div className="table-wrapper border-none shadow-none rounded-none overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="border-b-0 bg-transparent">
                  <th className="font-semibold text-sm text-(--color-text-primary) normal-case">Fitur</th>
                  <th className="font-semibold text-sm text-(--color-text-primary) normal-case text-center w-24">Create</th>
                  <th className="font-semibold text-sm text-(--color-text-primary) normal-case text-center w-24">Read</th>
                  <th className="font-semibold text-sm text-(--color-text-primary) normal-case text-center w-24">Update</th>
                  <th className="font-semibold text-sm text-(--color-text-primary) normal-case text-center w-24">Delete</th>
                </tr>
              </thead>
              <tbody>
                {fiturList.map((fitur) => (
                  <tr key={fitur.id} className="border-b-0 hover:bg-transparent">
                    <td className="py-2">
                      <div className="bg-(--color-surface) px-4 py-2 rounded-lg text-sm font-medium text-(--color-text-secondary) w-full max-w-[250px]">
                        {fitur.nama_fitur}
                      </div>
                    </td>
                    <td className="py-2 text-center">
                      <div className="bg-(--color-surface) p-2 rounded-lg inline-flex justify-center w-full max-w-[60px]">
                        <input
                          type="checkbox"
                          checked={permissions[fitur.id]?.can_create}
                          onChange={() => handlePermissionChange(fitur.id, 'can_create')}
                          className="rounded border-(--color-border) bg-transparent w-4 h-4 cursor-pointer"
                          disabled={isPending}
                        />
                      </div>
                    </td>
                    <td className="py-2 text-center">
                      <div className="bg-(--color-surface) p-2 rounded-lg inline-flex justify-center w-full max-w-[60px]">
                        <input
                          type="checkbox"
                          checked={permissions[fitur.id]?.can_read}
                          onChange={() => handlePermissionChange(fitur.id, 'can_read')}
                          className="rounded border-(--color-border) bg-transparent w-4 h-4 cursor-pointer"
                          disabled={isPending}
                        />
                      </div>
                    </td>
                    <td className="py-2 text-center">
                      <div className="bg-(--color-surface) p-2 rounded-lg inline-flex justify-center w-full max-w-[60px]">
                        <input
                          type="checkbox"
                          checked={permissions[fitur.id]?.can_update}
                          onChange={() => handlePermissionChange(fitur.id, 'can_update')}
                          className="rounded border-(--color-border) bg-transparent w-4 h-4 cursor-pointer"
                          disabled={isPending}
                        />
                      </div>
                    </td>
                    <td className="py-2 text-center">
                      <div className="bg-(--color-surface) p-2 rounded-lg inline-flex justify-center w-full max-w-[60px]">
                        <input
                          type="checkbox"
                          checked={permissions[fitur.id]?.can_delete}
                          onChange={() => handlePermissionChange(fitur.id, 'can_delete')}
                          className="rounded border-(--color-border) bg-transparent w-4 h-4 cursor-pointer"
                          disabled={isPending}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isPending}
            className="btn-primary w-full sm:w-auto min-w-[140px]"
          >
            {isPending ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              'Simpan'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

