'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../../stores/useCartStore';
import { CartItem } from '../../types/product';
import { formatPrice } from '../../lib/formatPrice';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, updateQuantity, removeFromCart, getTotalPrice } = useCartStore();

  const subtotal = getTotalPrice();
  const envioGratis = subtotal >= 200000;
  const costoEnvio = envioGratis ? 0 : 15000;
  const total = subtotal + costoEnvio;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay - Click para cerrar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={() => {
              console.log('Overlay clicked - closing cart');
              onClose();
            }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm cursor-pointer"
            style={{ 
              zIndex: 9998,
              pointerEvents: 'auto',
              left: '-2px',
              right: '-2px',
              top: '-2px',
              bottom: '-2px',
              borderRadius: 0
            }}
          />

          {/* Drawer - No se cierra al hacer click dentro */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ 
              type: 'spring', 
              damping: 25, 
              stiffness: 200,
              opacity: { duration: 0.3 }
            }}
            onClick={(e) => {
              console.log('Drawer clicked - not closing');
              e.stopPropagation();
            }}
            className="fixed top-0 right-0 h-full w-full max-w-md flex flex-col shadow-2xl bg-zinc-800"
            style={{
              zIndex: 9999,
              pointerEvents: 'auto',
              backgroundColor: 'rgb(39, 39, 42)', // zinc-800 sólido
              isolation: 'isolate'
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 bg-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-azul-electrico to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-azul-electrico/30">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2.25 2.25h1.386c.51 0 .955.343 1.087.835l.383 1.437" />
                    <path d="M6.116 4.5h13.384c.72 0 1.236.67 1.065 1.37l-1.755 7.02a1.125 1.125 0 01-1.095.86H7.5" />
                    <path d="M7.5 14.25L5.477 4.522" />
                    <path d="M4.5 12.75H3.375" />
                    <circle cx="15.75" cy="19.5" r="1.125" />
                    <circle cx="9" cy="19.5" r="1.125" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Carrito</h2>
                  <p className="text-sm text-gray-400">{items.length} productos</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white hover:bg-zinc-700 rounded-lg transition-all duration-200 hover:rotate-90"
                aria-label="Cerrar carrito"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col">
              {items.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-16 h-16 bg-zinc-700 border border-zinc-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                    <svg className="w-8 h-8 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2.25 2.25h1.386c.51 0 .955.343 1.087.835l.383 1.437" />
                      <path d="M6.116 4.5h13.384c.72 0 1.236.67 1.065 1.37l-1.755 7.02a1.125 1.125 0 01-1.095.86H7.5" />
                      <path d="M7.5 14.25L5.477 4.522" />
                      <path d="M4.5 12.75H3.375" />
                      <circle cx="15.75" cy="19.5" r="1.125" />
                      <circle cx="9" cy="19.5" r="1.125" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Tu carrito está vacío</h3>
                  <p className="text-gray-400 text-sm mb-4">Agrega productos para empezar a comprar</p>
                  <button
                    onClick={onClose}
                    className="bg-azul-electrico text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-400 transition-colors"
                  >
                    Continuar Comprando
                  </button>
                </div>
              ) : (
                <>
                  {/* Products List */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {items.map((item: CartItem) => (
                      <div key={item.product.id} className="flex items-center gap-3 p-3 bg-zinc-700 rounded-lg border border-zinc-600 shadow-lg">
                        {/* Image */}
                        <div className="relative w-12 h-12 bg-zinc-600 rounded overflow-hidden flex-shrink-0">
                          <Image
                            src={item.product.imagenUrl}
                            alt={item.product.nombre}
                            fill
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                        
                        {/* Product Info */}
                        <div className="flex-grow min-w-0">
                          <h4 className="font-medium text-white text-sm truncate">{item.product.nombre}</h4>
                          <p className="text-gray-400 text-xs">{item.product.marca}</p>
                          <p className="text-azul-electrico font-semibold text-sm">{formatPrice(item.product.precio)}</p>
                        </div>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="w-6 h-6 rounded bg-zinc-700 text-white text-sm hover:bg-zinc-600 disabled:opacity-50"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-white text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            disabled={item.quantity >= item.product.stock}
                            className="w-6 h-6 rounded bg-zinc-700 text-white text-sm hover:bg-zinc-600 disabled:opacity-50"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="w-6 h-6 rounded bg-red-600 text-white text-sm hover:bg-red-500 ml-2"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="border-t border-zinc-700 p-6 space-y-4 bg-zinc-800">
                    {/* Summary */}
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Subtotal:</span>
                        <span className="text-white font-semibold">{formatPrice(subtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Envío:</span>
                        <span className={`font-semibold ${envioGratis ? 'text-green-400' : 'text-gray-300'}`}>
                          {envioGratis ? '✨ GRATIS' : formatPrice(costoEnvio)}
                        </span>
                      </div>
                      <div className="flex justify-between text-lg font-bold pt-2 border-t border-zinc-700">
                        <span className="text-white">Total:</span>
                        <span className="text-azul-electrico">{formatPrice(total)}</span>
                      </div>
                    </div>

                    {/* Shipping Message */}
                    {envioGratis && (
                      <div className="bg-green-600/20 rounded-lg p-3 text-center">
                        <p className="text-green-400 text-sm font-semibold">
                          ✨ ¡Envío gratis incluido!
                        </p>
                      </div>
                    )}

                    {!envioGratis && (
                      <div className="bg-amber-500/20 rounded-lg p-3 text-center">
                        <p className="text-amber-400 text-sm">
                          💰 Agrega {formatPrice(200000 - subtotal)} más para envío gratis
                        </p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <Link
                        href="/cart"
                        onClick={onClose}
                        className="block w-full bg-rojo-potente text-white text-center py-4 rounded-xl font-bold hover:bg-red-700 transition-colors"
                      >
                        🛒 Ver Carrito Completo
                      </Link>
                      <Link
                        href="/checkout"
                        onClick={onClose}
                        className="block w-full cursor-pointer bg-azul-electrico text-white text-center py-4 rounded-xl font-bold hover:bg-blue-400 transition-colors"
                      >
                        ⚡ Proceder al Pago
                      </Link>
                      <button
                        onClick={onClose}
                        className="block w-full border border-zinc-600 text-azul-electrico text-center py-3 rounded-xl font-semibold hover:border-azul-electrico hover:bg-azul-electrico/10 transition-colors"
                      >
                        🛍️ Continuar Comprando
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}