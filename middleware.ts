
// Proteksi semua route — redirect ke /login jika belum autentikasi

import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

// Route yang boleh diakses tanpa login
const PUBLIC_ROUTES = ['/login'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Bypass route publik
  if (PUBLIC_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options));
      },
    },
  });

  // Cek session — JANGAN hapus baris ini, penting untuk refresh token
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Jika belum login dan bukan route publik → redirect ke /login
  if (!user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/login';
    return NextResponse.redirect(loginUrl);
  }

  // Jika sudah login dan mengakses /login → redirect ke /dashboard
  if (user && pathname === '/login') {
    const dashboardUrl = request.nextUrl.clone();
    dashboardUrl.pathname = '/dashboard';
    return NextResponse.redirect(dashboardUrl);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match semua route KECUALI:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - File ekstensi statis (svg, png, jpg, dll)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
