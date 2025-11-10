// app/lib/products-api.ts (real backend integration)

import type { Product } from '../types/product';
import { API_URL } from './config';

type BackendProduct = {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  brand_id?: string;
  category_id?: string;
  description?: string;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
};

function mapBackendProduct(bp: BackendProduct): Product {
  return {
    id: bp.id,
    nombre: bp.name,
    descripcionCorta: bp.description?.substring(0, 100) || '',
    descripcionCompleta: bp.description || '',
    precio: bp.price,
    imagenUrl: bp.image_url || '/images/default-product.png',
    marca: bp.brand_id || 'Sin marca',
    categoria: bp.category_id || 'General',
    stock: bp.stock,
    modeloCompatible: 'Universal',
  };
}

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/products`, { cache: 'no-store' });
  if (!res.ok) throw new Error('No se pudieron cargar los productos');
  const data = (await res.json()) as BackendProduct[];
  return data.map(mapBackendProduct);
}

export async function fetchProductById(id: string): Promise<Product | null> {
  const res = await fetch(`${API_URL}/products/${id}`, { cache: 'no-store' });
  if (!res.ok) return null;
  const bp = (await res.json()) as BackendProduct;
  return mapBackendProduct(bp);
}

export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  const all = await fetchProducts();
  return all.filter(p => p.categoria === category);
}

export async function searchProducts(query: string): Promise<Product[]> {
  if (!query.trim()) return fetchProducts();
  const res = await fetch(`${API_URL}/products?q=${encodeURIComponent(query)}`, { cache: 'no-store' });
  if (!res.ok) return [];
  const data = (await res.json()) as BackendProduct[];
  return data.map(mapBackendProduct);
}