'use client';

import React from 'react';
import { motion } from 'framer-motion';

// Skeleton para ProductCard
export function ProductCardSkeleton() {
  return (
    <div className="relative flex flex-col h-full rounded-xl overflow-hidden shadow-lg border border-white/10 bg-zinc-900">
      {/* Skeleton de imagen */}
      <div className="relative w-full h-48 bg-gray-800">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700/50 to-transparent"
          animate={{ x: [-100, 400] }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.5, 
            ease: "linear" 
          }}
        />
      </div>

      <div className="flex flex-col p-5 flex-grow space-y-3">
        {/* Skeleton del título */}
        <div className="space-y-2">
          <div className="h-6 bg-gray-700 rounded animate-pulse" />
          <div className="h-4 bg-gray-700 rounded w-3/4 animate-pulse" />
        </div>

        {/* Skeleton de descripción */}
        <div className="space-y-2">
          <div className="h-3 bg-gray-800 rounded animate-pulse" />
          <div className="h-3 bg-gray-800 rounded w-5/6 animate-pulse" />
        </div>

        {/* Skeleton del footer */}
        <div className="mt-auto pt-4 border-t border-white/5 space-y-3">
          <div className="flex items-end justify-between">
            <div className="h-8 bg-gray-700 rounded w-1/2 animate-pulse" />
            <div className="h-4 bg-gray-800 rounded w-1/4 animate-pulse" />
          </div>
          
          <div className="flex gap-2">
            <div className="flex-1 h-10 bg-gray-700 rounded-full animate-pulse" />
            <div className="h-10 w-20 bg-gray-700 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Skeleton para ProductGrid
export function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {Array.from({ length: 8 }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}

// Skeleton para página de producto detalle
export function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Skeleton de galería */}
          <div className="space-y-4">
            <div className="relative w-full h-96 bg-zinc-800 rounded-xl animate-pulse" />
            <div className="flex gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="w-20 h-20 bg-zinc-700 rounded-lg animate-pulse" />
              ))}
            </div>
          </div>

          {/* Skeleton de información */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="h-4 w-20 bg-gray-700 rounded animate-pulse" />
              <div className="h-10 w-3/4 bg-gray-700 rounded animate-pulse" />
              <div className="h-6 w-1/2 bg-gray-700 rounded animate-pulse" />
            </div>

            <div className="h-6 w-32 bg-green-600 rounded animate-pulse" />
            <div className="h-12 w-48 bg-gray-700 rounded animate-pulse" />
            
            <div className="space-y-3">
              <div className="h-4 w-24 bg-gray-700 rounded animate-pulse" />
              <div className="flex gap-2">
                <div className="h-10 w-32 bg-gray-700 rounded animate-pulse" />
                <div className="h-4 w-20 bg-gray-700 rounded animate-pulse" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-12 w-full bg-gray-700 rounded-xl animate-pulse" />
              <div className="space-y-1">
                <div className="h-3 w-full bg-gray-800 rounded animate-pulse" />
                <div className="h-3 w-3/4 bg-gray-800 rounded animate-pulse" />
                <div className="h-3 w-1/2 bg-gray-800 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Skeleton de pestañas */}
        <div className="mt-16 space-y-6">
          <div className="flex space-x-8 border-b border-zinc-700">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-6 w-24 bg-gray-700 rounded animate-pulse" />
            ))}
          </div>
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-4 w-full bg-gray-800 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Skeleton genérico para listas
export function ListSkeleton({ items = 5 }: { items?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="flex items-center space-x-4 p-4 bg-zinc-800/50 rounded-lg">
          <div className="w-16 h-16 bg-gray-700 rounded-lg animate-pulse" />
          <div className="flex-grow space-y-2">
            <div className="h-4 bg-gray-700 rounded animate-pulse" />
            <div className="h-3 bg-gray-800 rounded w-3/4 animate-pulse" />
            <div className="h-3 bg-gray-800 rounded w-1/2 animate-pulse" />
          </div>
          <div className="w-20 h-8 bg-gray-700 rounded animate-pulse" />
        </div>
      ))}
    </div>
  );
}

// Componente de carga con spinner
export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`${sizeClasses[size]} border-2 border-azul-electrico border-t-transparent rounded-full animate-spin`} />
    </div>
  );
}

// Skeleton para el carrito drawer
export function CartDrawerSkeleton() {
  return (
    <div className="space-y-4 p-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="flex gap-3 p-3 bg-zinc-800/50 rounded-lg">
          <div className="w-16 h-16 bg-zinc-700 rounded-lg animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-700 rounded animate-pulse" />
            <div className="h-3 bg-gray-800 rounded w-1/2 animate-pulse" />
            <div className="h-4 bg-gray-700 rounded w-1/3 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}