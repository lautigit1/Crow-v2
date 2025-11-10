// app/stores/useWishlistStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '../types/product';

interface WishlistState {
  favorites: Product[];
  
  // Actions
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: string) => void;
  toggleFavorite: (product: Product) => void;
  clearFavorites: () => void;
  
  // Getters
  isFavorite: (productId: string) => boolean;
  getFavoriteCount: () => number;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      favorites: [],
      
      addToFavorites: (product: Product) => {
        set((state) => {
          const exists = state.favorites.some(fav => fav.id === product.id);
          if (exists) return state;
          
          return {
            favorites: [...state.favorites, product]
          };
        });
      },
      
      removeFromFavorites: (productId: string) => {
        set((state) => ({
          favorites: state.favorites.filter(fav => fav.id !== productId)
        }));
      },
      
      toggleFavorite: (product: Product) => {
        const { isFavorite, addToFavorites, removeFromFavorites } = get();
        
        if (isFavorite(product.id)) {
          removeFromFavorites(product.id);
        } else {
          addToFavorites(product);
        }
      },
      
      clearFavorites: () => {
        set({ favorites: [] });
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
    }
  )
);