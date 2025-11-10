'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCartStore } from '../stores/useCartStore';
import { CartItem } from '../types/product';
import { formatPrice } from '../lib/formatPrice';

// Componente para cada item del carrito
function CartItemComponent({ item, onUpdateQuantity, onRemove }: {
  item: CartItem;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col md:flex-row items-start md:items-center gap-4 p-5 bg-gradient-to-br from-zinc-900/90 via-zinc-900/80 to-black/90 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300"
    >
      {/* Imagen del producto */}
      <div className="relative w-24 h-24 bg-zinc-800/50 rounded-xl overflow-hidden flex-shrink-0 border border-white/5">
        <Image
          src={item.product.imagenUrl}
          alt={item.product.nombre}
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>

      {/* Información del producto */}
      <div className="flex-grow min-w-0">
        <h3 className="font-bold text-white text-lg mb-1">{item.product.nombre}</h3>
        <p className="text-gray-400 text-sm mb-2">
          {item.product.marca} - {item.product.modeloCompatible}
        </p>
        <p className="text-white font-black text-2xl">
          {formatPrice(item.product.precio)}
        </p>
      </div>

      {/* Controles de cantidad */}
      <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
        <div className="flex items-center bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <button
            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
            className="px-4 py-3 text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-bold text-lg"
          >
            −
          </button>
          <span className="px-5 py-3 text-white font-bold min-w-[3.5rem] text-center bg-white/5">
            {item.quantity}
          </span>
          <button
            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
            disabled={item.quantity >= item.product.stock}
            className="px-4 py-3 text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-bold text-lg"
          >
            +
          </button>
        </div>

        {/* Botón eliminar */}
        <button
          onClick={() => onRemove(item.product.id)}
          className="p-3 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-xl transition-all duration-300 border border-red-500/20 hover:border-red-500/40"
          aria-label="Eliminar producto"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      {/* Subtotal del producto */}
      <div className="text-right flex-shrink-0 md:ml-auto">
        <p className="text-gray-400 text-sm mb-1">Subtotal:</p>
        <p className="text-white font-black text-xl">
          {formatPrice(item.product.precio * item.quantity)}
        </p>
      </div>
    </motion.div>
  );
}

// Componente principal de la página del carrito
export default function CartPage() {
  const { items, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useCartStore();

  // Cálculo del envío (estimado)
  const subtotal = getTotalPrice();
  const envioGratis = subtotal >= 200000;
  const costoEnvio = envioGratis ? 0 : 15000;
  const total = subtotal + costoEnvio;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-950 text-white relative overflow-hidden">
        {/* Efectos visuales de fondo */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
          <div className="text-center space-y-6 max-w-md mx-auto">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="w-32 h-32 mx-auto bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 rounded-3xl flex items-center justify-center border border-white/10 backdrop-blur-sm"
            >
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </motion.div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              Tu Carrito está Vacío
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              ¡Explora nuestro catálogo y encuentra los mejores repuestos para tu flota!
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/50"
            >
              Ver Catálogo
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-950 text-white relative overflow-hidden">
      {/* Efectos visuales de fondo */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 pt-24 pb-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-5xl font-black mb-2 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
            Carrito de Compras
          </h1>
          <p className="text-gray-400 text-lg">
            {items.length} {items.length === 1 ? 'producto' : 'productos'} en tu carrito
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de productos */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItemComponent
                key={item.product.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
              />
            ))}
            
            {/* Botón limpiar carrito */}
            <div className="pt-4">
              <button
                onClick={clearCart}
                className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors group"
              >
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Vaciar carrito completo
              </button>
            </div>
          </div>

          {/* Resumen del pedido */}
          <div className="lg:col-span-1">
            <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6 sticky top-24 shadow-2xl">
              <h2 className="text-2xl font-black mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Resumen del Pedido
              </h2>
              
              <div className="space-y-4">
                <div className="flex justify-between text-lg">
                  <span className="text-gray-300">Subtotal:</span>
                  <span className="font-bold">{formatPrice(subtotal)}</span>
                </div>
                
                <div className="flex justify-between text-lg">
                  <span className="text-gray-300">Envío:</span>
                  <span className={`font-bold ${envioGratis ? 'text-emerald-400' : ''}`}>
                    {envioGratis ? 'GRATIS ✓' : formatPrice(costoEnvio)}
                  </span>
                </div>

                {envioGratis && (
                  <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                    <svg className="w-5 h-5 text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-emerald-400 text-sm font-semibold">
                      ¡Envío gratis por superar $200.000!
                    </p>
                  </div>
                )}

                {!envioGratis && (
                  <div className="flex items-center gap-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                    <svg className="w-5 h-5 text-amber-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <p className="text-amber-400 text-sm">
                      Agrega {formatPrice(200000 - subtotal)} para envío gratis
                    </p>
                  </div>
                )}
                
                <hr className="border-white/10" />
                
                <div className="flex justify-between text-2xl font-black">
                  <span>Total:</span>
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {formatPrice(total)}
                  </span>
                </div>

                {/* Estimación de envío */}
                <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Calcular Envío
                  </h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Código postal"
                      className="flex-grow px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                    <button className="px-5 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300">
                      Calcular
                    </button>
                  </div>
                  <p className="text-gray-400 text-sm mt-3 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Tiempo estimado: 3-5 días hábiles
                  </p>
                </div>

                {/* Botón proceder al pago */}
                <Link
                  href="/checkout"
                  className="block w-full text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-xl font-bold text-lg mt-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/50"
                >
                  Proceder al Pago
                </Link>

                {/* Continuar comprando */}
                <Link
                  href="/products"
                  className="block w-full text-center border border-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:bg-white/5 hover:border-white/30"
                >
                  Continuar Comprando
                </Link>
              </div>

              {/* Información adicional */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <h4 className="font-bold mb-4 text-sm flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Beneficios de Compra
                </h4>
                <ul className="text-sm text-gray-400 space-y-3">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Pago 100% seguro
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Garantía en todos los productos
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Soporte técnico incluido
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Devoluciones hasta 30 días
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}