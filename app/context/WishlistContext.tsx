'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Product } from '../types/product';
import { products as allProducts } from '../data/product';

type WishlistContextType = {
  wishlistIds: string[];
  wishlistProducts: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  toggleWishlist: (product: Product) => void;
  isProductInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const STORAGE_KEY = 'wishlist.v1';

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  // Hydrate from localStorage once on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw) as string[];
        if (Array.isArray(data)) setWishlistIds(data);
      }
    } catch {}
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlistIds));
    } catch {}
  }, [wishlistIds]);

  const wishlistProducts = useMemo(() => {
    if (!wishlistIds.length) return [];
    const set = new Set(wishlistIds);
    return allProducts.filter(p => set.has(p.id));
  }, [wishlistIds]);

  const addToWishlist = (product: Product) => {
    setWishlistIds(prev => (prev.includes(product.id) ? prev : [...prev, product.id]));
  };

  const removeFromWishlist = (productId: string) => {
    setWishlistIds(prev => prev.filter(id => id !== productId));
  };

  const toggleWishlist = (product: Product) => {
    setWishlistIds(prev => (prev.includes(product.id) ? prev.filter(id => id !== product.id) : [...prev, product.id]));
  };

  const isProductInWishlist = (productId: string) => wishlistIds.includes(productId);

  const clearWishlist = () => setWishlistIds([]);

  const value: WishlistContextType = {
    wishlistIds,
    wishlistProducts,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isProductInWishlist,
    clearWishlist,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within a WishlistProvider');
  return ctx;
}
