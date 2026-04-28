// components/auth/AuthSplitLayout.tsx

import React from 'react';
import { BoxIcon } from './icons/BoxIcon';
import { BrandPanel } from './BrandPanel';
import { LoginRightPanel } from './LoginRightPanel';

interface AuthSplitLayoutProps {
  children: React.ReactNode;
}

export function AuthSplitLayout({ children }: AuthSplitLayoutProps) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=Syne:wght@700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; height: 100%; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .auth-animate {
          animation: fadeUp 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .auth-animate-delay {
          animation: fadeUp 0.45s cubic-bezier(0.22, 1, 0.36, 1) 0.08s both;
        }
      `}</style>

      <div
        className="min-h-svh flex flex-col"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: '#f0eff0' }}
      >
        {/* ── Mobile banner ── */}
        <div
          className="flex md:hidden items-center gap-3 px-6 py-5"
          style={{ background: 'linear-gradient(135deg, #3b0764 0%, #5b21b6 60%, #6d28d9 100%)' }}
        >
          <div
            className="flex items-center justify-center rounded-xl border flex-shrink-0"
            style={{ width: 38, height: 38, background: 'rgba(255,255,255,0.15)', borderColor: 'rgba(255,255,255,0.2)' }}
          >
            <BoxIcon />
          </div>
          <div>
            <div className="text-white font-bold text-sm leading-tight">CV Akurat Sukses Sejati</div>
            <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.6)' }}>Inventory System</div>
          </div>
        </div>

        {/* ── Mobile form ── */}
        <div className="flex-1 md:hidden px-5 py-8 auth-animate">
          <div
            className="bg-white rounded-2xl p-6 border"
            style={{ borderColor: 'rgba(0,0,0,0.06)', boxShadow: '0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)' }}
          >
            {children}
          </div>
        </div>

        {/* ── Desktop split ── */}
        <div className="hidden md:flex min-h-svh w-full">
          <BrandPanel />

          {/* Right panel */}
          <LoginRightPanel>
            {children}
          </LoginRightPanel>
        </div>
      </div>
    </>
  );
}