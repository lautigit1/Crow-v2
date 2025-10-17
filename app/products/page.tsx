import React, { Suspense } from 'react';
import ClientProductsPage from './ClientProductsPage';

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-white">Cargando catálogo…</div>}>
      <ClientProductsPage />
    </Suspense>
  );
}