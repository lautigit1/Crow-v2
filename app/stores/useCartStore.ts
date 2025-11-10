// app/stores/useCartStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, CartItem } from '../types/product';
import * as cartApi from '../lib/cart-api';
import { getTokens } from '../lib/auth-api';

// Helper para mapear items del carrito del backend al formato local
function mapCartItem(item: cartApi.CartItem): CartItem {
  return {
    product: {
      id: String(item.product!.id),
      nombre: item.product!.name,
      precio: item.product!.price,
      imagenUrl: item.product!.image_url,
      stock: item.product!.stock,
      marca: '',
      modeloCompatible: '',
      descripcionCorta: '',
    },
    quantity: item.quantity,
  };
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  isLoading: boolean;
  
  // Actions
  loadCart: () => Promise<void>;
  addToCart: (product: Product, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  
  // Getters
  getTotalPrice: () => number;
  getTotalItems: () => number;
  getItemQuantity: (productId: string) => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      isLoading: false,

      loadCart: async () => {
        const token = getTokens()?.accessToken;
        if (!token) {
          set({ items: [] });
          return;
        }

        try {
          set({ isLoading: true });
          const cart = await cartApi.getCart(token);
          set({ 
            items: cart.items.map(mapCartItem)
          });
        } catch (error) {
          console.error('Error loading cart:', error);
        } finally {
          set({ isLoading: false });
        }
      },
      
      addToCart: async (product: Product, quantity: number) => {
        const token = getTokens()?.accessToken;
        
        // Si no hay token, usar carrito local
        if (!token) {
          set((state) => {
            const existingItem = state.items.find(item => item.product.id === product.id);
            
            if (existingItem) {
              return {
                items: state.items.map(item => 
                  item.product.id === product.id 
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
                )
              };
            } else {
              return {
                items: [...state.items, { product, quantity }]
              };
            }
          });
          return;
        }

        // Usar backend
        try {
          set({ isLoading: true });
          const cart = await cartApi.addToCart(token, Number(product.id), quantity);
          set({ 
            items: cart.items.map(mapCartItem)
          });
        } catch (error) {
          console.error('Error adding to cart:', error);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
      
      removeFromCart: async (productId: string) => {
        const token = getTokens()?.accessToken;
        
        // Si no hay token, usar carrito local
        if (!token) {
          set((state) => ({
            items: state.items.filter(item => item.product.id !== productId)
          }));
          return;
        }

        // Usar backend
        try {
          set({ isLoading: true });
          const cart = await cartApi.removeFromCart(token, Number(productId));
          set({ 
            items: cart.items.map(mapCartItem)
          });
        } catch (error) {
          console.error('Error removing from cart:', error);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
      
      updateQuantity: async (productId: string, quantity: number) => {
        if (quantity <= 0) {
          await get().removeFromCart(productId);
          return;
        }

        const token = getTokens()?.accessToken;
        
        // Si no hay token, usar carrito local
        if (!token) {
          set((state) => ({
            items: state.items.map(item => 
              item.product.id === productId 
                ? { ...item, quantity }
                : item
            )
          }));
          return;
        }

        // Usar backend
        try {
          set({ isLoading: true });
          const cart = await cartApi.updateCartItem(token, Number(productId), quantity);
          set({ 
            items: cart.items.map(mapCartItem)
          });
        } catch (error) {
          console.error('Error updating cart:', error);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
      
      clearCart: async () => {
        const token = getTokens()?.accessToken;
        
        // Si no hay token, limpiar local
        if (!token) {
          set({ items: [] });
          return;
        }

        // Usar backend
        try {
          set({ isLoading: true });
          await cartApi.clearCart(token);
          set({ items: [] });
        } catch (error) {
          console.error('Error clearing cart:', error);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
      
      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },
      
      openCart: () => {
        set({ isOpen: true });
      },
      
      closeCart: () => {
        set({ isOpen: false });
      },
      
      getTotalPrice: () => {
        const { items } = get();
        return items.reduce((total, item) => total + (item.product.precio * item.quantity), 0);
      },
      
      getTotalItems: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getItemQuantity: (productId: string) => {
        const { items } = get();
        const item = items.find(item => item.product.id === productId);
        return item ? item.quantity : 0;
      }
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items }),
    }
  )
);