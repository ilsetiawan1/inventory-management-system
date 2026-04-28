// app/page.tsx
// Entry point — redirect ke /login
// Jika user sudah login, middleware akan redirect ke /dashboard

import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/login');
}
