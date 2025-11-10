'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getStats, getAllProductsAdmin, purgeTestUsers, promoteUsersByIdentifiers } from '../../lib/admin-api';
import { useAuthStore } from '../../stores/useAuthStore';

export const dynamic = 'force-dynamic';

interface Stats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  outOfStock: number;
  lowStock: number;
  adminUsers: number;
}

interface LowStockProduct {
  id: string;
  name?: string;
  nombre?: string;
  stock: number;
  price?: number;
  precio?: number;
  image_url?: string;
  imagenUrl?: string;
}

export default function AdminDashboard() {
  const user = useAuthStore((state) => state.user);
  const [stats, setStats] = useState<Stats | null>(null);
  const [lowStockProducts, setLowStockProducts] = useState<LowStockProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    // Solo cargar datos si hay usuario autenticado
    if (user) {
      loadData();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadData = async () => {
    try {
      const [statsData, products] = await Promise.all([
        getStats(),
        getAllProductsAdmin(),
      ]);
      
      setStats(statsData);
      setLowStockProducts(products.filter((p: LowStockProduct) => p.stock > 0 && p.stock <= 15).slice(0, 5));
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePurgeTests = async () => {
    if (!confirm('¿Eliminar todos los usuarios de prueba? (emails que contienen test, demo, dummy, example, prueba)')) return;
    setActionLoading(true);
    try {
      const res = await purgeTestUsers();
      await loadData();
      alert(res?.deleted?.length ? `Eliminados ${res.deleted.length} usuarios de prueba.` : 'No se encontraron usuarios de prueba.');
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Error al purgar usuarios de prueba';
      alert(msg);
    } finally {
      setActionLoading(false);
    }
  };

  const handlePromoteLautaro = async () => {
    if (!confirm('¿Promocionar a admin todos los usuarios que coincidan con "lautaro" o "salinas"?')) return;
    setActionLoading(true);
    try {
      const res = await promoteUsersByIdentifiers(['lautaro','salinas']);
      await loadData();
      alert(res?.promoted?.length ? `Promocionados ${res.promoted.length} usuarios a admin.` : 'No se encontraron usuarios para promocionar.');
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Error al promocionar usuarios';
      alert(msg);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">⚙️</div>
          <p className="text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error al cargar estadísticas</p>
        <button onClick={loadData} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">
          Reintentar
        </button>
      </div>
    );
  }
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Bienvenido al panel de administración</p>
        </div>
        <button
          onClick={loadData}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Actualizar
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Usuarios</p>
              <p className="text-4xl font-bold mt-2">{stats.totalUsers}</p>
              <p className="text-blue-100 text-xs mt-1">{stats.adminUsers} administradores</p>
            </div>
            <div className="text-5xl opacity-20">👥</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Total Productos</p>
              <p className="text-4xl font-bold mt-2">{stats.totalProducts}</p>
              <p className="text-green-100 text-xs mt-1">{stats.lowStock} con stock bajo</p>
            </div>
            <div className="text-5xl opacity-20">📦</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Total Órdenes</p>
              <p className="text-4xl font-bold mt-2">{stats.totalOrders}</p>
              <p className="text-purple-100 text-xs mt-1">Pedidos procesados</p>
            </div>
            <div className="text-5xl opacity-20">🛒</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm font-medium">Sin Stock</p>
              <p className="text-4xl font-bold mt-2">{stats.outOfStock}</p>
              <p className="text-red-100 text-xs mt-1">Productos agotados</p>
            </div>
            <div className="text-5xl opacity-20">❌</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm font-medium">Stock Bajo</p>
              <p className="text-4xl font-bold mt-2">{stats.lowStock}</p>
              <p className="text-yellow-100 text-xs mt-1">Requieren atención</p>
            </div>
            <div className="text-5xl opacity-20">⚠️</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-100 text-sm font-medium">Valor Inventario</p>
              <p className="text-4xl font-bold mt-2">$XXX</p>
              <p className="text-indigo-100 text-xs mt-1">Estimado total</p>
            </div>
            <div className="text-5xl opacity-20">💰</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Acciones Rápidas</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/admin/products"
              className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all hover:scale-105"
            >
              <span className="text-3xl mr-3">📦</span>
              <div>
                <h3 className="font-semibold text-gray-900">Productos</h3>
                <p className="text-xs text-gray-600">Gestionar catálogo</p>
              </div>
            </Link>

            <Link
              href="/admin/orders"
              className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-all hover:scale-105"
            >
              <span className="text-3xl mr-3">🛒</span>
              <div>
                <h3 className="font-semibold text-gray-900">Órdenes</h3>
                <p className="text-xs text-gray-600">Ver pedidos</p>
              </div>
            </Link>

            <Link
              href="/admin/users"
              className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-all hover:scale-105"
            >
              <span className="text-3xl mr-3">👥</span>
              <div>
                <h3 className="font-semibold text-gray-900">Usuarios</h3>
                <p className="text-xs text-gray-600">Gestionar roles</p>
              </div>
            </Link>

            <Link
              href="/admin/settings"
              className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all hover:scale-105"
            >
              <span className="text-3xl mr-3">⚙️</span>
              <div>
                <h3 className="font-semibold text-gray-900">Configuración</h3>
                <p className="text-xs text-gray-600">Ajustes generales</p>
              </div>
            </Link>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={handlePurgeTests} disabled={actionLoading} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50">🧹 Purgar Test Users</button>
            <button onClick={handlePromoteLautaro} disabled={actionLoading} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50">👑 Promocionar &quot;Lautaro Salinas&quot;</button>
          </div>
        </div>
      </div>

      {/* Products with Low Stock */}
      <div className="bg-white rounded-xl shadow-lg">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Productos con Stock Bajo</h2>
          <Link href="/admin/products" className="text-sm text-blue-600 hover:text-blue-700">
            Ver todos →
          </Link>
        </div>
        <div className="p-6">
          {lowStockProducts.length > 0 ? (
            <div className="space-y-3">
              {lowStockProducts.map(product => (
                <div key={product.id} className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg hover:bg-yellow-100 transition-colors">
                  <div className="flex items-center gap-4">
                    {(product.image_url || product.imagenUrl) && (
                      <Image 
                        src={product.image_url || product.imagenUrl || '/images/placeholder.png'} 
                        alt={product.name || product.nombre || 'Product'} 
                        width={48}
                        height={48}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                    )}
                    <div>
                      <p className="font-semibold text-gray-900">{product.name || product.nombre}</p>
                      <p className="text-sm text-gray-600">SKU: {product.id.slice(0, 8)}</p>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-4">
                    <div>
                      <p className="text-sm font-bold text-yellow-700">{product.stock} unidades</p>
                      <p className="text-xs text-gray-500">${(product.price || product.precio || 0).toLocaleString('es-AR')}</p>
                    </div>
                    <Link
                      href={`/admin/products/edit/${product.id}`}
                      className="px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700"
                    >
                      Editar
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <span className="text-6xl mb-4 block">✅</span>
              <p className="font-medium">Todos los productos tienen stock suficiente</p>
              <p className="text-sm mt-1">No hay productos que requieran atención</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}