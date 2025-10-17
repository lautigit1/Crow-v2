import React, { Suspense } from 'react';
import OrderConfirmationClient from '../OrderConfirmationClient';

type Params = Promise<{ orderId: string }>;

export default async function OrderConfirmationPage({ params }: { params: Params }) {
  const { orderId } = await params;
  return (
    <Suspense fallback={<div className="min-h-screen pt-28 text-white flex items-center justify-center">Cargando pedido…</div>}>
      <OrderConfirmationClient orderId={orderId} />
    </Suspense>
  );
}
