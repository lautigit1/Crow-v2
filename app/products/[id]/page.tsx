import { notFound } from 'next/navigation';
import { products } from '../../data/product';
import ProductDetailClient from './ProductDetailClient';
import React from 'react';

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) notFound();
  return <ProductDetailClient product={product} />;
}