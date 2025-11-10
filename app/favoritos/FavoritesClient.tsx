'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWishlistStore } from '../stores/useWishlistStore';
import ProductGrid from '../products/components/ProductGrid';
import Link from 'next/link';

export default function FavoritesClient() {
  const { favorites: wishlistProducts, clearFavorites: clearWishlist } = useWishlistStore();

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-900 via-black to-zinc-950 text-white pt-28 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center border border-zinc-700">
              <svg className="w-6 h-6 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white">
                Lista de Favoritos
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                {wishlistProducts.length} {wishlistProducts.length === 1 ? 'producto guardado' : 'productos guardados'}
              </p>
            </div>
          </div>

          {wishlistProducts.length > 0 && (
            <button
              onClick={clearWishlist}
              className="px-5 py-2.5 bg-zinc-800 text-gray-300 font-semibold rounded-lg border border-zinc-700 hover:border-zinc-600 hover:bg-zinc-700 transition-colors"
            >
              Vaciar Lista
            </button>
          )}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {wishlistProducts.length > 0 ? (
            <motion.div
              key="products"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ProductGrid products={wishlistProducts} />
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 bg-zinc-800 rounded-lg flex items-center justify-center mx-auto mb-6 border border-zinc-700">
                <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </div>

              <h2 className="text-2xl font-bold text-white mb-3">
                Tu lista de favoritos está vacía
              </h2>
              
              <p className="text-gray-400 text-base mb-8 max-w-md mx-auto">
                Guarda los productos que te interesan para encontrarlos fácilmente más tarde
              </p>

              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Ver Catálogo
              </Link>

              {/* Info Cards */}
              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {[
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                      </svg>
                    ),
                    title: "Guarda productos",
                    description: "Haz clic en el ícono de corazón en cualquier producto"
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    ),
                    title: "Acceso rápido",
                    description: "Encuentra todos tus productos favoritos en un lugar"
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                      </svg>
                    ),
                    title: "Compra después",
                    description: "Agrega al carrito cuando estés listo para comprar"
                  }
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-zinc-900 rounded-lg p-6 border border-zinc-800 hover:border-zinc-700 transition-colors"
                  >
                    <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center mb-4 border border-zinc-700">
                      <div className="text-gray-400">
                        {item.icon}
                      </div>
                    </div>
                    <h3 className="text-white font-semibold text-base mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
