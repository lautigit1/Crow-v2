'use client';

import React, { useMemo } from 'react';
import { useAuthStore } from '../../stores/useAuthStore';
import Link from 'next/link';

export default function OrderConfirmationClient({ orderId }: { orderId: string }) {
  const { user } = useAuthStore();
  const order = useMemo(() => user?.orders.find(o => o.id === orderId), [user, orderId]);

  if (!order) {
    return (
      <main className="min-h-screen pt-28 text-white flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Pedido no encontrado</h1>
        <Link className="px-4 py-2 rounded-lg bg-azul-electrico text-black font-bold" href="/products">Ir al catálogo</Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen text-white bg-gradient-to-b from-[#0b1020] via-[#0a0f1a] to-black pt-28 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-[#0f172a]/60 border border-white/10 rounded-2xl p-6 space-y-6">
          <h1 className="text-2xl font-extrabold">¡Gracias por tu compra!</h1>
          <p className="text-gray-300">Tu pedido <span className="font-mono text-white">#{order.id}</span> fue recibido correctamente.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="space-y-3">
              <h2 className="font-bold">Resumen</h2>
              <ul className="divide-y divide-white/10">
                {order.items.map(it => (
                  <li key={it.productId} className="flex items-center justify-between py-2">
                    <span className="text-sm text-gray-300">{it.nombre} x{it.quantity}</span>
                    <span className="font-semibold">${(it.precio * it.quantity).toLocaleString('es-AR')}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between text-sm text-gray-300">
                <span>Subtotal</span>
                <span>${order.subtotal.toLocaleString('es-AR')}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-300">
                <span>Envío</span>
                <span>{order.shipping.cost === 0 ? 'Gratis' : `$${order.shipping.cost.toLocaleString('es-AR')}`}</span>
              </div>
              <div className="flex items-center justify-between text-lg font-extrabold">
                <span>Total</span>
                <span>${order.total.toLocaleString('es-AR')}</span>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="font-bold">Envío</h2>
              <div className="text-gray-300">
                <div>{order.shipping.label} — {order.shipping.eta}</div>
                <div className="mt-2">{order.shippingAddress.street}</div>
                <div>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</div>
                <div>{order.shippingAddress.country}</div>
              </div>
            </section>
          </div>

          <div className="flex gap-3">
            <Link href="/products" className="px-4 py-2 rounded-lg bg-zinc-700 text-white">Seguir comprando</Link>
            <Link href="/perfil" className="px-4 py-2 rounded-lg bg-azul-electrico text-black font-bold">Ver mis pedidos</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
