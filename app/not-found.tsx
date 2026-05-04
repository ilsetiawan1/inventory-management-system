import Link from 'next/link';
import { SearchX, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-(--color-background)">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="mx-auto w-32 h-32 bg-(--color-surface) rounded-full flex items-center justify-center mb-6 shadow-sm border border-(--color-border)">
          <SearchX className="w-16 h-16 text-(--color-primary) opacity-80" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-6xl font-extrabold text-(--color-primary)">404</h1>
          <h2 className="text-2xl font-bold text-(--color-text-primary)">Halaman Tidak Ditemukan</h2>
        </div>
        
        <p className="text-(--color-text-secondary) text-base">
          Maaf, halaman yang Anda cari mungkin telah dihapus, namanya diubah, atau sementara tidak tersedia.
        </p>

        <div className="pt-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 bg-(--color-primary) hover:bg-(--color-primary-hover) text-white rounded-xl font-semibold transition-all shadow-[0_4px_12px_rgba(124,58,237,0.25)] hover:-translate-y-0.5"
          >
            <ArrowLeft size={18} />
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}

