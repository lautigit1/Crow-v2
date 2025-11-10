// app/stores/useAuthStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Order, Address } from '../types/auth';
import { apiLogin, apiLogout, apiCheckSession, apiAddOrder, apiRegister } from '../lib/auth-api';

interface AuthState {
  user: User | null;
  loading: boolean;
  
  // Actions
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => void;
  addAddress: (addr: Address) => void;
  updateAddress: (addr: Address) => void;
  removeAddress: (id: string) => void;
  addOrder: (order: Order) => Promise<void>;
  checkSession: () => Promise<void>;
  
  // Getters
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      
      login: async (email: string, password: string) => {
        set({ loading: true });
        try {
          const user = await apiLogin({ email, password });
          set({ user, loading: false });
        } catch (error) {
          set({ loading: false });
          throw error;
        }
      },
      
      logout: async () => {
        set({ loading: true });
        try {
          await apiLogout();
          set({ user: null, loading: false });
        } catch (error) {
          set({ user: null, loading: false });
          console.error('Logout error:', error);
        }
      },
      
      register: async (name: string, email: string, password: string) => {
        set({ loading: true });
        try {
          const user = await apiRegister({ name, email, password });
          set({ user, loading: false });
        } catch (error) {
          set({ loading: false });
          throw error;
        }
      },
      
      updateProfile: (data: Partial<User>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : state.user
        }));
      },
      
      addAddress: (addr: Address) => {
        set((state) => ({
          user: state.user ? {
            ...state.user,
            addresses: [...state.user.addresses, addr]
          } : state.user
        }));
      },
      
      updateAddress: (addr: Address) => {
        set((state) => ({
          user: state.user ? {
            ...state.user,
            addresses: state.user.addresses.map(a => a.id === addr.id ? addr : a)
          } : state.user
        }));
      },
      
      removeAddress: (id: string) => {
        set((state) => ({
          user: state.user ? {
            ...state.user,
            addresses: state.user.addresses.filter(a => a.id !== id)
          } : state.user
        }));
      },
      
      addOrder: async (order: Order) => {
        try {
          await apiAddOrder(order);
          set((state) => ({
            user: state.user ? {
              ...state.user,
              orders: [order, ...state.user.orders]
            } : state.user
          }));
        } catch (error) {
          console.error('Add order error:', error);
          throw error;
        }
      },
      
      checkSession: async () => {
        const tokens = localStorage.getItem('authTokens');
        
        // Si no hay tokens, no hacer llamadas al backend
        if (!tokens) {
          set({ user: null, loading: false });
          return;
        }
        
        set({ loading: true });
        try {
          const user = await apiCheckSession();
          set({ user, loading: false });
        } catch (error) {
          set({ user: null, loading: false });
          console.error('Session check error:', error);
        }
      },
      
      isAuthenticated: () => {
        const { user } = get();
        return !!user;
      }
    }),
    {
      name: 'auth-storage',
      // No persistir el user automáticamente, solo tokens
      partialize: () => ({}),
    }
  )
);