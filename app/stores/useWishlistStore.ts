// app/stores/useWishlistStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '../types/product';
import * as wishlistApi from '../lib/wishlist-api';
import { getTokens } from '../lib/auth-api';

// Helper para mapear productos del backend al formato local
function mapProduct(item: wishlistApi.WishlistItem): Product {
  return {
    id: String(item.product!.id),
    nombre: item.product!.name,
    precio: item.product!.price,
    imagenUrl: item.product!.image_url,
    stock: item.product!.stock,
    marca: '',
    modeloCompatible: '',
    descripcionCorta: '',
  };
}

interface WishlistState {
  favorites: Product[];
  isLoading: boolean;
  
  // Actions
  loadWishlist: () => Promise<void>;
  addToFavorites: (product: Product) => Promise<void>;
  removeFromFavorites: (productId: string) => Promise<void>;
  toggleFavorite: (product: Product) => Promise<void>;
  clearFavorites: () => Promise<void>;
  
  // Getters
  isFavorite: (productId: string) => boolean;
  getFavoriteCount: () => number;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      favorites: [],
      isLoading: false,

      loadWishlist: async () => {
        const token = getTokens()?.accessToken;
        if (!token) {
          set({ favorites: [] });
          return;
        }

        try {
          set({ isLoading: true });
          const wishlist = await wishlistApi.getWishlist(token);
          set({ 
            favorites: wishlist.items.map(mapProduct)
          });
        } catch (error) {
          console.error('Error loading wishlist:', error);
        } finally {
          set({ isLoading: false });
        }
      },
      
      addToFavorites: async (product: Product) => {
        const token = getTokens()?.accessToken;
        
        // Si no hay token, usar wishlist local
        if (!token) {
          set((state) => {
            const exists = state.favorites.some(fav => fav.id === product.id);
            if (exists) return state;
            
            return {
              favorites: [...state.favorites, product]
            };
          });
          return;
        }

        // Usar backend
        try {
          set({ isLoading: true });
          const wishlist = await wishlistApi.addToWishlist(token, Number(product.id));
          set({ 
            favorites: wishlist.items.map(mapProduct)
          });
        } catch (error) {
          console.error('Error adding to wishlist:', error);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
      
      removeFromFavorites: async (productId: string) => {
        const token = getTokens()?.accessToken;
        
        // Si no hay token, usar wishlist local
        if (!token) {
          set((state) => ({
            favorites: state.favorites.filter(fav => fav.id !== productId)
          }));
          return;
        }

        // Usar backend
        try {
          set({ isLoading: true });
          const wishlist = await wishlistApi.removeFromWishlist(token, Number(productId));
          set({ 
            favorites: wishlist.items.map(mapProduct)
          });
        } catch (error) {
          console.error('Error removing from wishlist:', error);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
      
      toggleFavorite: async (product: Product) => {
        const { isFavorite, addToFavorites, removeFromFavorites } = get();
        
        if (isFavorite(product.id)) {
          await removeFromFavorites(product.id);
        } else {
          await addToFavorites(product);
        }
      },
      
      clearFavorites: async () => {
        const token = getTokens()?.accessToken;
        
        // Si no hay token, limpiar local
        if (!token) {
          set({ favorites: [] });
          return;
        }

        // Usar backend
        try {
          set({ isLoading: true });
          await wishlistApi.clearWishlist(token);
          set({ favorites: [] });
        } catch (error) {
          console.error('Error clearing wishlist:', error);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
      
      isFavorite: (productId: string) => {
        const { favorites } = get();
        return favorites.some(fav => fav.id === productId);
      },
      
      getFavoriteCount: () => {
        const { favorites } = get();
        return favorites.length;
      }
    }),
    {
      name: 'wishlist-storage',
      partialize: (state) => ({ favorites: state.favorites }),
    }
  )
);