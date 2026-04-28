// app/login/page.tsx

import type { Metadata } from 'next';
import { AuthSplitLayout } from '@/components/auth/AuthSplitLayout';
import { LoginForm } from '@/components/auth/LoginForm';

export const metadata: Metadata = {
  title: 'Login — Sistem Informasi Persediaan CV Akurat Sukses Sejati',
  description:
    'Masuk ke sistem manajemen inventaris CV Akurat Sukses Sejati.',
};

export default function LoginPage() {
  return (
    <AuthSplitLayout>
      <LoginForm />
    </AuthSplitLayout>
  );
}