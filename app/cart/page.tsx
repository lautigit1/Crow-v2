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
      className="flex items-center gap-4 p-4 bg-zinc-800/50 rounded-xl border border-zinc-700"
    >
      {/* Imagen del producto */}
      <div className="relative w-20 h-20 bg-zinc-700 rounded-lg overflow-hidden flex-shrink-0">
        <Image
          src={item.product.imagenUrl}
          alt={item.product.nombre}
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>

      {/* Información del producto */}
      <div className="flex-grow">
        <h3 className="font-semibold text-white text-lg">{item.product.nombre}</h3>
        <p className="text-gray-400 text-sm">
          {item.product.marca} - {item.product.modeloCompatible}
        </p>
        <p className="text-azul-electrico font-bold text-xl">
          {formatPrice(item.product.precio)}
        </p>
      </div>

      {/* Controles de cantidad */}
      <div className="flex items-center gap-3">
        <div className="flex items-center border border-zinc-700 rounded-lg">
          <button
            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
            className="px-3 py-2 text-white hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            -
          </button>
          <span className="px-4 py-2 text-white bg-zinc-800 min-w-[3rem] text-center">
            {item.quantity}
          </span>
          <button
            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
            disabled={item.quantity >= item.product.stock}
            className="px-3 py-2 text-white hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            +
          </button>
        </div>

        {/* Botón eliminar */}
        <button
          onClick={() => onRemove(item.product.id)}
          className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-colors"
          aria-label="Eliminar producto"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      {/* Subtotal del producto */}
      <div className="text-right flex-shrink-0">
        <p className="text-gray-400 text-sm">Subtotal:</p>
        <p className="text-white font-bold text-lg">
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
      <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white">
        <div className="container mx-auto px-4 pt-24 pb-16">
          <div className="text-center space-y-6">
            <div className="w-24 h-24 mx-auto bg-zinc-800 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold">Tu carrito está vacío</h1>
            <p className="text-gray-400 text-lg">
              ¡Explora nuestro catálogo y encuentra los mejores repuestos para tu camión!
            </p>
            <Link
              href="/products"
              className="inline-block bg-azul-electrico text-white px-8 py-3 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 shadow-neon-blue"
            >
              Ver Catálogo
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white">
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Carrito de Compras</h1>
          <p className="text-gray-400">
            {items.length} {items.length === 1 ? 'producto' : 'productos'} en tu carrito
          </p>
        </div>

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
                className="text-red-400 hover:text-red-300 hover:underline transition-colors"
              >
                Vaciar carrito completo
              </button>
            </div>
          </div>

          {/* Resumen del pedido */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Resumen del Pedido</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Envío:</span>
                  <span className={envioGratis ? 'text-green-400' : ''}>
                    {envioGratis ? 'GRATIS' : formatPrice(costoEnvio)}
                  </span>
                </div>

                {envioGratis && (
                  <p className="text-green-400 text-sm">
                    ✓ ¡Felicidades! Tu envío es gratis por superar los $200.000
                  </p>
                )}

                {!envioGratis && (
                  <p className="text-yellow-400 text-sm">
                    Agrega {formatPrice(200000 - subtotal)} más para envío gratis
                  </p>
                )}
                
                <hr className="border-zinc-600" />
                
                <div className="flex justify-between text-xl font-bold">
                  <span>Total:</span>
                  <span className="text-azul-electrico">{formatPrice(total)}</span>
                </div>

                {/* Estimación de envío */}
                <div className="mt-6">
                  <h3 className="font-semibold mb-3">Calcular Envío</h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Código postal"
                      className="flex-grow px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-azul-electrico"
                    />
                    <button className="px-4 py-2 bg-azul-electrico text-white rounded-lg font-medium hover:bg-blue-400 transition-colors">
                      Calcular
                    </button>
                  </div>
                  <p className="text-gray-400 text-sm mt-2">
                    Tiempo estimado: 3-5 días hábiles
                  </p>
                </div>

                {/* Botón proceder al pago */}
                <Link
                  href="/checkout"
                  className="block w-full text-center cursor-pointer bg-rojo-potente text-white px-6 py-4 rounded-xl font-bold text-lg mt-6 transition-all duration-300 hover:scale-105 hover:bg-red-700 shadow-lg hover:shadow-neon-red"
                >
                  Proceder al Pago
                </Link>

                {/* Continuar comprando */}
                <Link
                  href="/products"
                  className="block w-full text-center border border-zinc-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:border-azul-electrico hover:text-azul-electrico"
                >
                  Continuar Comprando
                </Link>
              </div>

              {/* Información adicional */}
              <div className="mt-6 pt-6 border-t border-zinc-700">
                <h4 className="font-semibold mb-3 text-sm">Información de Compra</h4>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li>• Pago 100% seguro</li>
                  <li>• Garantía en todos los productos</li>
                  <li>• Soporte técnico incluido</li>
                  <li>• Devoluciones hasta 30 días</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}