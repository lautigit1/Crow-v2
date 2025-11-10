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
            className="fixed inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
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
            className="fixed top-0 right-0 h-full w-full max-w-md flex flex-col shadow-2xl bg-gradient-to-b from-zinc-900 via-zinc-900 to-black border-l border-white/10"
            style={{
              zIndex: 9999,
              pointerEvents: 'auto',
              isolation: 'isolate'
            }}
          >
            {/* Header */}
            <div className="p-6 bg-zinc-900 border-b border-zinc-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M2.25 2.25h1.386c.51 0 .955.343 1.087.835l.383 1.437" />
                      <path d="M6.116 4.5h13.384c.72 0 1.236.67 1.065 1.37l-1.755 7.02a1.125 1.125 0 01-1.095.86H7.5" />
                      <path d="M7.5 14.25L5.477 4.522" />
                      <circle cx="15.75" cy="19.5" r="1.125" />
                      <circle cx="9" cy="19.5" r="1.125" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">Carrito de Compras</h2>
                    <p className="text-xs text-gray-400">
                      {items.length} {items.length === 1 ? 'producto' : 'productos'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                  aria-label="Cerrar carrito"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
              {items.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-20 h-20 bg-zinc-800 rounded-lg flex items-center justify-center mb-6 border border-zinc-700">
                    <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Tu carrito está vacío</h3>
                  <p className="text-gray-400 text-sm mb-4">Agrega productos para empezar a comprar</p>
                  <button
                    onClick={onClose}
                    className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Continuar Comprando
                  </button>
                </div>
              ) : (
                <>
                  {/* Products List */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {items.map((item: CartItem, index: number) => (
                      <motion.div
                        key={item.product.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ delay: index * 0.03 }}
                        className="bg-zinc-900 rounded-lg p-3 border border-zinc-800 hover:border-zinc-700 transition-colors"
                      >
                        <div className="flex gap-3">
                          {/* Image */}
                          <div className="relative w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={item.product.imagenUrl}
                              alt={item.product.nombre}
                              fill
                              style={{ objectFit: 'contain' }}
                              className="p-1"
                            />
                          </div>
                          
                          {/* Product Info */}
                          <div className="flex-grow min-w-0">
                            <h4 className="font-semibold text-white text-sm mb-0.5 truncate">{item.product.nombre}</h4>
                            <p className="text-gray-500 text-xs mb-1.5">{item.product.marca}</p>
                            <p className="text-blue-500 font-bold text-base">{formatPrice(item.product.precio)}</p>
                            
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2 mt-2">
                              <div className="flex items-center bg-zinc-800 rounded-lg border border-zinc-700 overflow-hidden">
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                  className="p-1.5 text-gray-400 hover:text-white hover:bg-zinc-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                                  </svg>
                                </button>
                                <span className="px-3 py-1 text-sm font-semibold text-white min-w-[2rem] text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                  disabled={item.quantity >= item.product.stock}
                                  className="p-1.5 text-gray-400 hover:text-white hover:bg-zinc-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                  </svg>
                                </button>
                              </div>
                              <button
                                onClick={() => removeFromCart(item.product.id)}
                                className="ml-auto p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                aria-label="Eliminar producto"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="border-t border-zinc-800 p-6 space-y-4 bg-zinc-900">
                    {/* Summary */}
                    <div className="space-y-2.5 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 font-medium">Subtotal:</span>
                        <span className="text-white font-semibold">{formatPrice(subtotal)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 font-medium">Envío:</span>
                        <span className={`font-semibold ${envioGratis ? 'text-green-500' : 'text-white'}`}>
                          {envioGratis ? 'Gratis' : formatPrice(costoEnvio)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-base font-bold pt-2.5 border-t border-zinc-800">
                        <span className="text-white">Total:</span>
                        <span className="text-blue-500 text-lg">
                          {formatPrice(total)}
                        </span>
                      </div>
                    </div>

                    {/* Shipping Message */}
                    {envioGratis && (
                      <div className="bg-green-500/10 rounded-lg p-3 text-center border border-green-500/20">
                        <p className="text-green-500 text-sm font-semibold flex items-center justify-center gap-2">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Envío gratis incluido
                        </p>
                      </div>
                    )}

                    {!envioGratis && (
                      <div className="bg-amber-500/10 rounded-lg p-3 text-center border border-amber-500/20">
                        <p className="text-amber-500 text-sm font-medium">
                          Agrega {formatPrice(200000 - subtotal)} para envío gratis
                        </p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="space-y-2.5 pt-2">
                      <Link
                        href="/checkout"
                        onClick={onClose}
                        className="block w-full bg-blue-600 text-white text-center py-3.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                      >
                        Proceder al Pago
                      </Link>
                      
                      <Link
                        href="/cart"
                        onClick={onClose}
                        className="block w-full bg-zinc-800 text-white text-center py-3 rounded-lg font-medium hover:bg-zinc-700 transition-colors"
                      >
                        Ver Carrito Completo
                      </Link>
                      
                      <button
                        onClick={onClose}
                        className="block w-full border border-zinc-700 text-gray-300 text-center py-2.5 rounded-lg font-medium hover:border-zinc-600 hover:bg-zinc-800/50 transition-colors"
                      >
                        Continuar Comprando
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