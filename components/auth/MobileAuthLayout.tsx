import React from 'react';
import Image from 'next/image';

interface MobileAuthLayoutProps {
  children: React.ReactNode;
}

export function MobileAuthLayout({ children }: MobileAuthLayoutProps) {
  return (
    <div
      className="md:hidden min-h-screen relative flex flex-col items-center justify-center px-5 py-8 bg-[#f8f7fc] overflow-hidden"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* ── Decorative Background ── */}
      <div
        className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.35]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #c4b5fd 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />
      
      {/* Top Blob */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: "-10%",
          right: "-20%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, rgba(109,40,217,0.02) 50%, transparent 75%)",
          filter: "blur(40px)",
        }}
      />

      {/* Bottom Blob */}
      <div
        className="pointer-events-none absolute"
        style={{
          bottom: "-5%",
          left: "-20%",
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(167,139,250,0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* ── Content Wrapper ── */}
      <div className="relative z-10 w-full max-w-[400px] flex flex-col items-center">
        
        {/* Header / Logo */}
        <div className="flex flex-col items-center text-center mb-8">
          <div
            className="rounded-[16px] flex items-center justify-center mb-4 bg-white shadow-[0_8px_24px_-8px_rgba(109,40,217,0.25)]"
            style={{
              width: 56,
              height: 56,
              border: '1px solid rgba(124,58,237,0.1)',
            }}
          >
            <Image
              src="/images/logo-inventory-app.png"
              alt="Logo"
              width={32}
              height={32}
            />
          </div>
          
          <h1 className="text-[#1c1c1e] font-extrabold text-[22px] tracking-tight mb-1.5">
            CV Akurat Sukses Sejati
          </h1>
          <p className="text-black/50 text-[13px] font-medium px-4">
            Sistem Informasi Persediaan & Manajemen Stok Internal
          </p>
        </div>

        {/* ── Form Sheet ── */}
        <div className="w-full relative">
          <div
            className="bg-white/80 backdrop-blur-xl w-full"
            style={{
              borderRadius: 32,
              padding: '36px 24px',
              border: '1px solid rgba(255,255,255,0.9)',
              boxShadow: '0 12px 48px -12px rgba(109,40,217,0.15), inset 0 0 0 1px rgba(255,255,255,1)',
            }}
          >
            {children}
          </div>
        </div>

        {/* ── Footer ── */}
        <p className="text-center text-[12px] text-black/40 mt-8 font-semibold tracking-wide">
          © {new Date().getFullYear()} CV Akurat Sukses Sejati
        </p>

      </div>
    </div>
  );
}
