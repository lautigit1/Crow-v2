import React, { Suspense } from 'react';
import CheckoutClient from './CheckoutClient';

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-28 text-white flex items-center justify-center">Cargando checkout…</div>}>
      <CheckoutClient />
    </Suspense>
  );
}
