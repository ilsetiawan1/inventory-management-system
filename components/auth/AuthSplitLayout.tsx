// components/auth/AuthSplitLayout.tsx
// Mobile-first, h-screen overflow-hidden — tidak bisa discroll di semua breakpoint.
//
// Breakpoint behaviour:
//   mobile  (< 640px)  — hero gradient atas (40%) + form sheet bawah (60%)
//   tablet  (640–767px) — sama dengan mobile tapi font & spacing sedikit lebih besar
//   desktop (≥ 768px)  — BrandPanel kiri + LoginRightPanel kanan (split)

import React from 'react';
import { BrandPanel } from './BrandPanel';
import { LoginRightPanel } from './LoginRightPanel';
import { MobileAuthLayout } from './MobileAuthLayout';

interface AuthSplitLayoutProps {
  children: React.ReactNode;
}

export function AuthSplitLayout({ children }: AuthSplitLayoutProps) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; height: 100%; overflow: hidden; background: #f8f7fc; }

        @keyframes authFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes authSlideUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .a-fade  { animation: authFadeUp  0.5s cubic-bezier(0.2, 0.8, 0.2, 1) both; }
        .a-slide { animation: authSlideUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) 0.1s both; }
        .a-d1    { animation-delay: 0.08s; }
        .a-d2    { animation-delay: 0.16s; }
      `}</style>

      {/* Mobile & Tablet Layout */}
      <MobileAuthLayout>
        {children}
      </MobileAuthLayout>

      {/* Desktop Layout */}
      <div
        className="hidden md:flex h-screen overflow-hidden w-full"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        <BrandPanel />
        <LoginRightPanel>{children}</LoginRightPanel>
      </div>
    </>
  );
}
