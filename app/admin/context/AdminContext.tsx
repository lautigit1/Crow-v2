'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { products as initialProducts } from '@/app/data/product';
import type { Product } from '@/app/types/product';

interface AdminContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  getProduct: (productId: string) => Product | undefined;
  resetProducts: () => void;
}

const AdminContext = createContext<AdminContextType | null>(null);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  // Cargar productos desde localStorage al inicio
  useEffect(() => {
    const storedProducts = localStorage.getItem('adminProducts');
    if (storedProducts) {
      try {
        const parsedProducts = JSON.parse(storedProducts);
        if (Array.isArray(parsedProducts) && parsedProducts.length > 0) {
          setProducts(parsedProducts);
        }
      } catch (error) {
        console.error('Error loading products from localStorage:', error);
      }
    }
  }, []);

  // Sincronizar con localStorage cada vez que cambian los productos
  useEffect(() => {
    localStorage.setItem('adminProducts', JSON.stringify(products));
  }, [products]);

  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => 
      prev.map(product => 
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(product => product.id !== productId));
  };

  const getProduct = (productId: string) => {
    return products.find(product => product.id === productId);
  };

  const resetProducts = () => {
    setProducts(initialProducts);
    localStorage.removeItem('adminProducts');
  };

  const value: AdminContextType = {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    resetProducts,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};