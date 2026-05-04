'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error('Global Application Error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-(--color-background)">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="mx-auto w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
          <AlertTriangle className="w-12 h-12 text-red-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-(--color-text-primary)">
          Terjadi Kesalahan!
        </h1>
        
        <p className="text-(--color-text-secondary) text-base">
          Maaf, sistem mengalami gangguan saat memproses permintaan Anda. Kami telah mencatat kesalahan ini.
        </p>

        {process.env.NODE_ENV === 'development' && (
          <div className="p-4 bg-(--color-surface) border border-(--color-border) rounded-lg text-left overflow-auto mt-4 max-h-48 text-sm font-mono text-red-500">
            {error.message}
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            onClick={() => reset()}
            className="flex items-center gap-2 px-6 py-2.5 bg-(--color-primary) hover:bg-(--color-primary-hover) text-white rounded-lg font-medium transition-colors w-full sm:w-auto justify-center"
          >
            <RefreshCcw size={18} />
            Coba Lagi
          </button>
          
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-6 py-2.5 bg-(--color-surface) hover:bg-(--color-surface-hover) border border-(--color-border) text-(--color-text-primary) rounded-lg font-medium transition-colors w-full sm:w-auto justify-center"
          >
            <Home size={18} />
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}

