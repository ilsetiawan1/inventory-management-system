// // app/dashboard/layout.tsx

// import { createClient } from '@/lib/supabase/server';
// import { getUserById } from '@/lib/repositories/usersRepository';
// import { redirect } from 'next/navigation';
// import { SidebarProvider } from '@/context/SidebarContext';

// export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
//   const supabase = await createClient();
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();
//   if (!user) redirect('/login');

//   let profile = null;
//   try {
//     profile = await getUserById(user.id);
//   } catch {
//     /* profile null */
//   }

//   return (
//     <SidebarProvider>
//       {/* app-layout: flex row, full height */}
//       <div style={{ display: 'flex', minHeight: '100svh', background: '#f6f5fb' }}>
//         <Sidebar
//           userRole={profile?.role ?? 'Admin'}
//           userName={profile?.name ?? 'Pengguna'}
//           userEmail={profile?.email ?? ''}
//           avatarUrl={profile?.avatar_url ?? null}
//         />
//         <AppMainWrapper>
//           <Navbar />
//           <main style={{ flex: 1, padding: '1.75rem 2rem', overflowY: 'auto' }}>{children}</main>
//         </AppMainWrapper>
//       </div>
//     </SidebarProvider>
//   );
// }
