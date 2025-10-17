'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { AdminProvider } from './context/AdminContext';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin');
    if (adminStatus === 'true') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
      if (pathname !== '/admin/login') {
        router.push('/admin/login');
      }
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    router.push('/');
  };

  // Mostrar loader mientras verificamos el estado de autenticación
  if (isAdmin === null) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-600">Verificando acceso...</div>
      </div>
    );
  }

  // Si no está autenticado y no está en login, no mostrar nada (el useEffect redirige)
  if (!isAdmin && pathname !== '/admin/login') {
    return null;
  }

  // Si está en la página de login, mostrar solo el children
  if (pathname === '/admin/login') {
    return <div className="min-h-screen bg-gray-100">{children}</div>;
  }

  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: '📊',
    },
    {
      name: 'Productos',
      href: '/admin/products',
      icon: '📦',
    },
    {
      name: 'Órdenes',
      href: '/admin/orders',
      icon: '🛒',
    },
  ];

  return (
    <AdminProvider>
      <div className="min-h-screen bg-gray-100">
        <div className="flex">
          {/* Sidebar */}
          <nav className="w-64 bg-white shadow-lg min-h-screen">
            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-8">
                Panel Admin
              </h1>
              
              {/* Navigation Links */}
              <ul className="space-y-2">
                {navigationItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-700'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <span className="text-lg">{item.icon}</span>
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Logout Button */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <span className="text-lg">🚪</span>
                  Cerrar Sesión
                </button>
              </div>

              {/* Back to Store */}
              <div className="mt-4">
                <Link
                  href="/"
                  className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <span className="text-lg">🏪</span>
                  Volver a la Tienda
                </Link>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1 p-8">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AdminProvider>
  );
}