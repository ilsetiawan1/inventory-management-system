// app/page.tsx
// Root redirect — middleware akan handle redirect ke /login jika belum login

import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/dashboard');
}
