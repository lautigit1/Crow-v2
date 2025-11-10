'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { User, Address, Order } from '../types/auth';
import { apiLogin, apiLogout, apiCheckSession, apiAddOrder } from '../lib/auth-api';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => void;
  addAddress: (addr: Address) => void;
  updateAddress: (addr: Address) => void;
  removeAddress: (id: string) => void;
  addOrder: (order: Order) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await apiCheckSession();
        setUser(user);
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const user = await apiLogin({ email, password });
      setUser(user);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (name: string, email: string) => {
    setUser({
      id: 'u_' + Math.random().toString(36).slice(2, 9),
      name,
      email,
      role: 'authenticated',
      addresses: [],
      orders: [],
    });
  };

  const logout = async () => {
    try {
      await apiLogout();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      setUser(null); // Logout local anyway
    }
  };

  const updateProfile = (data: Partial<User>) => {
    setUser(prev => (prev ? { ...prev, ...data } : prev));
  };

  const addAddress = (addr: Address) => {
    setUser(prev => (prev ? { ...prev, addresses: [...prev.addresses, addr] } : prev));
  };

  const updateAddress = (addr: Address) => {
    setUser(prev => (prev ? { ...prev, addresses: prev.addresses.map(a => a.id === addr.id ? addr : a) } : prev));
  };

  const removeAddress = (id: string) => {
    setUser(prev => (prev ? { ...prev, addresses: prev.addresses.filter(a => a.id !== id) } : prev));
  };

  const addOrder = async (order: Order) => {
    try {
      await apiAddOrder(order);
      setUser(prev => (prev ? { ...prev, orders: [order, ...prev.orders] } : prev));
    } catch (error) {
      console.error('Add order error:', error);
      throw error;
    }
  };

  const value: AuthContextType = useMemo(() => ({ user, loading, login, logout, register, updateProfile, addAddress, updateAddress, removeAddress, addOrder }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
