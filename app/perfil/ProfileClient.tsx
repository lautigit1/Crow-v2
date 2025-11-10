'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '../stores/useAuthStore';

export default function ProfileClient() {
  const { user, loading, logout, updateProfile } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'addresses' | 'account'>('overview');
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = '/login?redirect=/perfil';
    }
  }, [user, loading]);

  useEffect(() => {
    if (user) {
      setNewName(user.name);
    }
  }, [user]);

  if (!user) return null;

  const handleSaveName = async () => {
    if (newName.trim() && newName !== user.name) {
      updateProfile({ name: newName.trim() });
      // TODO: Llamar al backend para actualizar el nombre
      setIsEditingName(false);
    }
  };

  const isAdmin = user.role === 'admin';

  return (
    <main className="min-h-screen text-white bg-gradient-to-b from-[#0b1020] via-[#0a0f1a] to-black pt-28 pb-16">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar */}
        <aside className="bg-[#0f172a]/60 border border-white/10 rounded-2xl p-6 h-fit sticky top-28 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-azul-electrico to-purple-500 text-black font-extrabold flex items-center justify-center text-2xl shadow-lg">
              {user.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1">
              <div className="font-bold text-lg">{user.name}</div>
              <div className="text-xs text-gray-400">{user.email}</div>
              {isAdmin && (
                <div className="mt-1 inline-block px-2 py-0.5 bg-purple-500/20 border border-purple-500/50 rounded text-xs text-purple-300 font-semibold">
                  👑 Administrador
                </div>
              )}
            </div>
          </div>

          <div className="pt-2 pb-3 border-t border-white/10">
            <div className="text-xs text-gray-400 mb-2">ESTADÍSTICAS</div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-white/5 rounded-lg p-2 border border-white/10">
                <div className="text-azul-electrico font-bold text-lg">{user.orders.length}</div>
                <div className="text-xs text-gray-400">Pedidos</div>
              </div>
              <div className="bg-white/5 rounded-lg p-2 border border-white/10">
                <div className="text-azul-electrico font-bold text-lg">{user.addresses.length}</div>
                <div className="text-xs text-gray-400">Direcciones</div>
              </div>
            </div>
          </div>

          <nav className="pt-2 space-y-2 text-sm">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                activeTab === 'overview'
                  ? 'bg-azul-electrico text-black font-bold'
                  : 'bg-white/5 border border-white/10 hover:bg-white/10'
              }`}
            >
              📊 Resumen
            </button>
            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                activeTab === 'addresses'
                  ? 'bg-azul-electrico text-black font-bold'
                  : 'bg-white/5 border border-white/10 hover:bg-white/10'
              }`}
            >
              📍 Direcciones
            </button>
            <button
              onClick={() => setActiveTab('account')}
              className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                activeTab === 'account'
                  ? 'bg-azul-electrico text-black font-bold'
                  : 'bg-white/5 border border-white/10 hover:bg-white/10'
              }`}
            >
              ⚙️ Datos de cuenta
            </button>
            {isAdmin && (
              <Link
                href="/admin/dashboard"
                className="block w-full text-left px-3 py-2 rounded-lg bg-purple-500/20 border border-purple-500/50 hover:bg-purple-500/30 text-purple-300 font-semibold"
              >
                👑 Panel Admin
              </Link>
            )}
          </nav>

          <button
            onClick={() => { logout(); window.location.href = '/'; }}
            className="w-full mt-2 px-3 py-2 rounded-lg bg-red-600/20 text-red-400 border border-red-500/30 hover:bg-red-600/30 font-semibold transition-all"
          >
            🚪 Cerrar sesión
          </button>
        </aside>

        {/* Main */}
        <section className="lg:col-span-2 space-y-6">
          {/* RESUMEN */}
          {activeTab === 'overview' && (
            <>
              <div className="bg-[#0f172a]/60 border border-white/10 rounded-2xl p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  👋 Bienvenido, {user.name.split(' ')[0]}!
                </h2>
                <p className="text-gray-400 mb-4">
                  Aquí podés gestionar tu cuenta, ver tus pedidos y actualizar tus datos.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-azul-electrico/20 to-purple-500/20 border border-azul-electrico/30 rounded-xl p-4">
                    <div className="text-3xl font-bold text-azul-electrico">{user.orders.length}</div>
                    <div className="text-sm text-gray-300">Pedidos totales</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-4">
                    <div className="text-3xl font-bold text-green-400">{user.addresses.length}</div>
                    <div className="text-sm text-gray-300">Direcciones guardadas</div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-xl p-4">
                    <div className="text-3xl font-bold text-orange-400">${user.orders.reduce((sum, o) => sum + o.total, 0).toLocaleString('es-AR')}</div>
                    <div className="text-sm text-gray-300">Total gastado</div>
                  </div>
                </div>
              </div>

              <div className="bg-[#0f172a]/60 border border-white/10 rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-4">📦 Pedidos recientes</h2>
                {user.orders.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-6xl mb-4">📦</div>
                    <div className="text-gray-400 mb-4">Todavía no realizaste pedidos.</div>
                    <Link href="/products" className="inline-block px-6 py-2 rounded-lg bg-azul-electrico text-black font-bold hover:bg-azul-electrico/80 transition-all">
                      Ver productos
                    </Link>
                  </div>
                ) : (
                  <ul className="divide-y divide-white/10">
                    {user.orders.slice(0, 5).map(o => (
                      <li key={o.id} className="py-4 flex items-center justify-between hover:bg-white/5 px-4 rounded-lg transition-all">
                        <div>
                          <div className="font-semibold">Pedido #{o.id.slice(0, 8)}</div>
                          <div className="text-sm text-gray-400">{new Date(o.date).toLocaleString('es-AR', { dateStyle: 'medium', timeStyle: 'short' })}</div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="font-bold text-azul-electrico">${o.total.toLocaleString('es-AR')}</div>
                          <Link href={`/pedido/confirmacion/${o.id}`} className="px-4 py-2 rounded-lg bg-azul-electrico text-black font-bold text-sm hover:bg-azul-electrico/80 transition-all">
                            Ver detalles
                          </Link>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          )}

          {/* DIRECCIONES */}
          {activeTab === 'addresses' && (
            <div className="bg-[#0f172a]/60 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">📍 Direcciones de envío</h2>
                <button className="px-4 py-2 rounded-lg bg-azul-electrico text-black font-bold hover:bg-azul-electrico/80 transition-all">
                  + Agregar dirección
                </button>
              </div>
              {user.addresses.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📍</div>
                  <div className="text-gray-400 mb-2">No tenés direcciones guardadas</div>
                  <div className="text-sm text-gray-500">Agregá una dirección para agilizar tus compras</div>
                </div>
              ) : (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {user.addresses.map(addr => (
                    <li key={addr.id} className="p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-azul-electrico/50 transition-all group">
                      <div className="flex items-start justify-between mb-2">
                        <div className="font-semibold text-lg">{addr.fullName || user.name}</div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="text-azul-electrico hover:text-azul-electrico/70">✏️</button>
                          <button className="text-red-400 hover:text-red-300">🗑️</button>
                        </div>
                      </div>
                      <div className="text-gray-300 text-sm space-y-1">
                        <div>{addr.street}</div>
                        <div>{addr.city}, {addr.state} {addr.postalCode}</div>
                        <div>{addr.country}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* DATOS DE CUENTA */}
          {activeTab === 'account' && (
            <div className="space-y-6">
              <div className="bg-[#0f172a]/60 border border-white/10 rounded-2xl p-6">
                <h2 className="text-2xl font-bold mb-6">⚙️ Información personal</h2>
                
                {/* Nombre */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-2">Nombre completo</label>
                  {isEditingName ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-azul-electrico focus:outline-none"
                        autoFocus
                      />
                      <button
                        onClick={handleSaveName}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all"
                      >
                        Guardar
                      </button>
                      <button
                        onClick={() => {
                          setNewName(user.name);
                          setIsEditingName(false);
                        }}
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-all"
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between px-4 py-3 bg-white/5 border border-white/10 rounded-lg">
                      <span className="text-gray-200">{user.name}</span>
                      <button
                        onClick={() => setIsEditingName(true)}
                        className="text-azul-electrico hover:text-azul-electrico/70 font-semibold text-sm"
                      >
                        Editar
                      </button>
                    </div>
                  )}
                </div>

                {/* Email */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-2">Email</label>
                  <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-gray-400">
                    {user.email}
                    <span className="ml-2 text-xs text-gray-500">(no se puede cambiar)</span>
                  </div>
                </div>

                {/* Rol */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Rol</label>
                  <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg">
                    {isAdmin ? (
                      <span className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/20 border border-purple-500/50 rounded text-purple-300 font-semibold">
                        👑 Administrador
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-500/50 rounded text-blue-300 font-semibold">
                        👤 Cliente
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-red-400 mb-2">⚠️ Zona de peligro</h3>
                <p className="text-sm text-gray-400 mb-4">Acciones irreversibles</p>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all">
                  Eliminar cuenta
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
