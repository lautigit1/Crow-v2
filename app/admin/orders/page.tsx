import React from 'react';
import Link from 'next/link';

export default function AdminOrdersPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Órdenes</h1>
        <p className="text-gray-600 mt-2">Gestiona los pedidos de tu tienda</p>
      </div>

      {/* Coming Soon */}
      <div className="bg-white rounded-lg shadow p-12 text-center">
        <span className="text-6xl mb-4 block">🚧</span>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Próximamente</h2>
        <p className="text-gray-600 mb-8">
          La gestión de órdenes estará disponible en una futura versión del panel de administración.
        </p>
        <div className="space-y-4">
          <p className="text-sm text-gray-500">Funcionalidades planificadas:</p>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>📋 Ver todas las órdenes</li>
            <li>🔍 Filtrar por estado</li>
            <li>📤 Actualizar estados de envío</li>
            <li>📊 Reportes de ventas</li>
            <li>👤 Información de clientes</li>
          </ul>
        </div>
        <div className="mt-8">
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            📦 Gestionar Productos
          </Link>
        </div>
      </div>
    </div>
  );
}