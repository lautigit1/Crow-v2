'use client';

import React from 'react';
import { useWishlistStore } from '../stores/useWishlistStore';
import ProductGrid from '../products/components/ProductGrid';
import Link from 'next/link';

export default function FavoritesClient() {
  const { favorites: wishlistProducts, clearFavorites: clearWishlist } = useWishlistStore();

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white pt-28 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl lg:text-4xl font-extrabold">Tus Favoritos</h1>
          {wishlistProducts.length > 0 && (
            <button onClick={clearWishlist} className="text-sm text-gray-300 hover:text-white underline underline-offset-4">Vaciar</button>
          )}
        </div>

        {wishlistProducts.length > 0 ? (
          <ProductGrid products={wishlistProducts} />
        ) : (
          <div className="text-center py-20">
            <div className="text-7xl mb-4">💙</div>
            <h2 className="text-2xl font-bold mb-2">Tu lista de deseos está vacía</h2>
            <p className="text-gray-400 mb-6">Guardá productos que te interesen y volvé cuando quieras.</p>
            <Link href="/products" className="inline-block px-6 py-3 rounded-lg bg-azul-electrico text-black font-bold hover:brightness-110">Explorar catálogo</Link>
          </div>
        )}
      </div>
    </main>
  );
}
