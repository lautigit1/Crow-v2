'use client';

import React from 'react';
import Link from 'next/link';
import { useAdmin } from '../context/AdminContext';

export default function AdminDashboard() {
  const { products, resetProducts } = useAdmin();

  const totalProducts = products.length;
  const lowStockProducts = products.filter(p => p.stock <= 15).length;
  const outOfStockProducts = products.filter(p => p.stock === 0).length;

  const handleResetProducts = () => {
    if (confirm('¿Estás seguro de que quieres restaurar el catálogo original? Esta acción eliminará todos los cambios realizados.')) {
      resetProducts();
    }
  };
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Bienvenido al panel de administración</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <span className="text-2xl">📦</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Productos</p>
              <p className="text-2xl font-bold text-gray-900">{totalProducts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <span className="text-2xl">❌</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Sin Stock</p>
              <p className="text-2xl font-bold text-gray-900">{outOfStockProducts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <span className="text-2xl">⚠️</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Stock Bajo</p>
              <p className="text-2xl font-bold text-gray-900">{lowStockProducts}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Acciones Rápidas</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/admin/products"
              className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <span className="text-2xl mr-3">📦</span>
              <div>
                <h3 className="font-medium text-gray-900">Gestionar Productos</h3>
                <p className="text-sm text-gray-600">Ver, crear, editar y eliminar productos</p>
              </div>
            </Link>

            <div className="flex items-center p-4 bg-gray-50 rounded-lg opacity-60">
              <span className="text-2xl mr-3">🛒</span>
              <div>
                <h3 className="font-medium text-gray-900">Ver Órdenes</h3>
                <p className="text-sm text-gray-600">Próximamente disponible</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Actions */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Administración</h2>
        </div>
        <div className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleResetProducts}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
            >
              <span>🔄</span>
              Restaurar Catálogo Original
            </button>
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg">
              <span>💾</span>
              <span className="text-sm">Los cambios se guardan automáticamente en localStorage</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Productos con Stock Bajo</h2>
        </div>
        <div className="p-6">
          {lowStockProducts > 0 ? (
            <div className="space-y-2">
              {products.filter(p => p.stock <= 15 && p.stock > 0).map(product => (
                <div key={product.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{product.nombre}</p>
                    <p className="text-sm text-gray-600">ID: {product.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-yellow-700">{product.stock} unidades</p>
                    <Link
                      href={`/admin/products/edit/${product.id}`}
                      className="text-xs text-blue-600 hover:text-blue-700"
                    >
                      Actualizar stock
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <span className="text-4xl mb-4 block">✅</span>
              <p>Todos los productos tienen stock suficiente</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}