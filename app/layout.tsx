// app/layout.tsx
// Root layout — pasang Toaster (sonner) di sini agar tersedia di seluruh app

import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'CV Akurat Sukses Sejati — Sistem Informasi Persediaan Barang',
  description: 'Sistem manajemen inventaris barang CV Akurat Sukses Sejati',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}

          {/* Toast notifications — sonner */}
          <Toaster
            position="top-right"
            richColors
            closeButton
            duration={3500}
            toastOptions={{
              style: {
                fontFamily: 'var(--font-sans)',
                fontSize: '0.875rem',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
