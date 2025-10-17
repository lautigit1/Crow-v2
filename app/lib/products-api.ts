// app/lib/products-api.ts

import { products } from '../data/product';
import type { Product } from '../types/product';

// Simulación de delay de red
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchProducts(): Promise<Product[]> {
  // Simular latencia de red (500-1500ms)
  await delay(800 + Math.random() * 700);
  
  // Simular posible error (5% de probabilidad)
  if (Math.random() < 0.05) {
    throw new Error('Error de red al cargar productos');
  }
  
  return [...products]; // Retorna copia para evitar mutaciones
}

export async function fetchProductById(id: string): Promise<Product | null> {
  await delay(300 + Math.random() * 400);
  
  const product = products.find(p => p.id === id);
  return product ? { ...product } : null;
}

export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  await delay(400 + Math.random() * 600);
  
  return products.filter(p => p.categoria === category);
}

export async function searchProducts(query: string): Promise<Product[]> {
  await delay(200 + Math.random() * 300);
  
  const normalizedQuery = query.toLowerCase().trim();
  
  if (!normalizedQuery) return [...products];
  
  return products.filter(product => 
    product.nombre.toLowerCase().includes(normalizedQuery) ||
    product.descripcionCorta?.toLowerCase().includes(normalizedQuery) ||
    product.marca?.toLowerCase().includes(normalizedQuery) ||
    product.categoria?.toLowerCase().includes(normalizedQuery)
  );
}