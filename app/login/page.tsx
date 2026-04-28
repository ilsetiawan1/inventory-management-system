// app/login/page.tsx
// Halaman Login — sesuai UI screenshot dengan background foto toko

import { LoginForm } from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <main className="login-page">
      {/* Background overlay */}
      <div className="login-bg-overlay" />

      {/* Header teks atas */}
      <div className="login-header">
        {/* Logo / Icon */}
        <div className="login-logo">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon
              points="20,4 36,32 4,32"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2.5"
            />
            <line
              x1="20"
              y1="4"
              x2="20"
              y2="32"
              stroke="#f59e0b"
              strokeWidth="2"
            />
            <line
              x1="12"
              y1="18"
              x2="28"
              y2="18"
              stroke="#f59e0b"
              strokeWidth="2"
            />
          </svg>
        </div>
        <h1 className="login-title">CV Akurat Sukses Sejati</h1>
        <p className="login-subtitle">Sistem Informasi Persediaan Barang</p>
      </div>

      {/* Form Card */}
      <LoginForm />
    </main>
  );
}
