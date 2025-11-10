'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '../stores/useAuthStore';

// Evita que Next intente prerenderizar rutas de admin en build
export const dynamic = 'force-dynamic';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const verifyAdmin = async () => {
      setIsChecking(true);
      
      // Esperar a que termine el loading del store
      if (loading) {
        return;
      }
      
      setIsChecking(false);
      
      // Si no hay usuario logeado, redirigir a login
      if (!user) {
        router.push('/login?redirect=/admin/dashboard');
        return;
      }
      
      // Si hay usuario pero no es admin, redirigir a home
      if (user.role !== 'admin') {
        router.push('/?error=no_admin_access');
        return;
      }
    };

    verifyAdmin();
  }, [user, loading, pathname, router]);

  const handleLogout = () => {
    useAuthStore.getState().logout();
    router.push('/');
  };

  // Mostrar loader mientras verificamos el estado de autenticación
  if (isChecking || loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-600 mb-2">Verificando acceso...</div>
          <div className="animate-spin text-4xl">⚙️</div>
        </div>
      </div>
    );
  }

  // Si no es admin, no mostrar nada (el useEffect ya redirige)
  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                🦅 Crow Admin
              </Link>
              <span className="text-sm text-gray-500">Panel de Administración</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                👤 {user?.email}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg min-h-[calc(100vh-73px)] sticky top-[73px]">
          <nav className="p-4 space-y-2">
            <Link
              href="/admin/dashboard"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                pathname === '/admin/dashboard'
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="text-xl">📊</span>
              Dashboard
            </Link>

            <Link
              href="/admin/products"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                pathname?.startsWith('/admin/products')
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="text-xl">📦</span>
              Productos
            </Link>

            <Link
              href="/admin/orders"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                pathname === '/admin/orders'
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="text-xl">🛒</span>
              Órdenes
            </Link>

            <Link
              href="/admin/users"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                pathname === '/admin/users'
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="text-xl">👥</span>
              Usuarios
            </Link>

            <div className="pt-4 mt-4 border-t border-gray-200">
              <Link
                href="/"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <span className="text-xl">�</span>
                Volver a la Tienda
              </Link>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}