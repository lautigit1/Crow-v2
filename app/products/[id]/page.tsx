import { notFound } from 'next/navigation';
import { products } from '../../data/product';
import ProductDetailClient from './ProductDetailClient';
import React from 'react';
import { fetchProductById } from '../../lib/products-api';

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // Intento rápido en el server con el catálogo base
  const baseProduct = products.find((p) => p.id === id) || null;
  if (baseProduct) {
    return <ProductDetailClient product={baseProduct} />;
  }

  // Fallback: en runtime cliente, buscar también en adminProducts (localStorage)
  const clientProduct = await fetchProductById(id);
  if (!clientProduct) notFound();
  return <ProductDetailClient product={clientProduct} />;
}