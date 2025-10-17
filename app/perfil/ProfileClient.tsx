'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useAuthStore } from '../stores/useAuthStore';

export default function ProfileClient() {
  const { user, loading, logout } = useAuthStore();

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = '/login?redirect=/perfil';
    }
  }, [user, loading]);

  if (!user) return null;

  return (
    <main className="min-h-screen text-white bg-gradient-to-b from-[#0b1020] via-[#0a0f1a] to-black pt-28 pb-16">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar */}
  <aside className="bg-[#0f172a]/60 border border-white/10 rounded-2xl p-6 h-fit sticky top-28 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-azul-electrico text-black font-extrabold flex items-center justify-center">
              {user.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div>
              <div className="font-bold">{user.name}</div>
              <div className="text-sm text-gray-300">{user.email}</div>
            </div>
          </div>
          <nav className="pt-4 space-y-2 text-sm">
            <Link href="/perfil" className="block px-3 py-2 rounded-lg bg-white/5 border border-white/10">Resumen</Link>
            <a className="block px-3 py-2 rounded-lg bg-white/5 border border-white/10 opacity-60 pointer-events-none">Direcciones (pronto)</a>
            <a className="block px-3 py-2 rounded-lg bg-white/5 border border-white/10 opacity-60 pointer-events-none">Datos de cuenta (pronto)</a>
          </nav>
          <button
            onClick={() => { logout(); window.location.href = '/'; }}
            className="w-full mt-2 px-3 py-2 rounded-lg bg-zinc-700 text-white border border-white/10 hover:bg-zinc-600"
          >
            Cerrar sesión
          </button>
        </aside>

        {/* Main */}
        <section className="lg:col-span-2 space-y-8">
          <div className="bg-[#0f172a]/60 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4">Direcciones</h2>
            {user.addresses.length === 0 ? (
              <div className="text-gray-300">No tenés direcciones guardadas.</div>
            ) : (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user.addresses.map(addr => (
                  <li key={addr.id} className="p-4 rounded-xl border border-white/10 bg-white/5">
                    <div className="font-semibold">{addr.fullName || user.name}</div>
                    <div className="text-gray-300 text-sm">{addr.street}</div>
                    <div className="text-gray-300 text-sm">{addr.city}, {addr.state} {addr.postalCode}</div>
                    <div className="text-gray-300 text-sm">{addr.country}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="bg-[#0f172a]/60 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4">Pedidos recientes</h2>
            {user.orders.length === 0 ? (
              <div className="text-gray-300">Todavía no realizaste pedidos.</div>
            ) : (
              <ul className="divide-y divide-white/10">
                {user.orders.map(o => (
                  <li key={o.id} className="py-4 flex items-center justify-between">
                    <div>
                      <div className="font-semibold">Pedido #{o.id}</div>
                      <div className="text-sm text-gray-400">{new Date(o.date).toLocaleString()}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="font-bold">${o.total.toLocaleString('es-AR')}</div>
                      <Link href={`/pedido/confirmacion/${o.id}`} className="px-3 py-1 rounded-lg bg-azul-electrico text-black font-bold text-sm">Ver</Link>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
