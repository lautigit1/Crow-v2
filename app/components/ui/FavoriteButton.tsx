'use client';

import { motion } from 'framer-motion';
import { useWishlistStore } from '../../stores/useWishlistStore';
import { Product } from '../../types/product';

export default function FavoriteButton({ product }: { product: Product }) {
  const { isFavorite, toggleFavorite } = useWishlistStore();
  const active = isFavorite(product.id);

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(product); }}
      aria-pressed={active}
      aria-label={active ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      className={`rounded-full p-2 transition-colors ${active ? 'text-azul-electrico' : 'text-white/80 hover:text-white'} bg-black/30 hover:bg-black/40 border border-white/10`}
    >
      <motion.svg
        initial={false}
        animate={{ scale: active ? 1.08 : 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 20 }}
        viewBox="0 0 24 24"
        className="w-5 h-5"
        xmlns="http://www.w3.org/2000/svg"
      >
        {active ? (
          <path
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.934 0-3.545 1.127-4.312 2.733C11.232 4.877 9.62 3.75 7.687 3.75 5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.934 0-3.545 1.127-4.312 2.733C11.232 4.877 9.62 3.75 7.687 3.75 5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </motion.svg>
    </motion.button>
  );
}
