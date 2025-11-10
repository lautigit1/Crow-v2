'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { Product } from '../../types/product';
import { useCartStore } from '../../stores/useCartStore';
import FavoriteButton from '../../components/ui/FavoriteButton';
import { formatPrice } from '../../lib/formatPrice';

type ProductCardProps = {
  product: Product;
  highlightQuery?: string;
};

function highlight(text: string, query?: string) {
  if (!query || query.trim().length < 3) return text;
  // Normalizar sin tildes para búsqueda, pero mantener el texto original al renderizar
  const normalize = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const lowerText = normalize(text);
  const lowerQuery = normalize(query);
  const indexList: Array<{ start: number; end: number }> = [];

  // Buscar todas las ocurrencias de la consulta normalizada en el texto normalizado
  let startIndex = 0;
  while (true) {
    const idx = lowerText.indexOf(lowerQuery, startIndex);
    if (idx === -1) break;
    indexList.push({ start: idx, end: idx + lowerQuery.length });
    startIndex = idx + lowerQuery.length;
  }

  if (indexList.length === 0) return text;

  // Construir el resultado mezclando fragmentos originales y spans resaltados
  const result: React.ReactNode[] = [];
  let lastEnd = 0;
  indexList.forEach((range, i) => {
    if (range.start > lastEnd) {
      result.push(text.slice(lastEnd, range.start));
    }
    result.push(
      <span key={`hl-${i}-${range.start}`} className="text-azul-electrico font-semibold">{
        text.slice(range.start, range.end)
      }</span>
    );
    lastEnd = range.end;
  });
  if (lastEnd < text.length) {
    result.push(text.slice(lastEnd));
  }
  return result;
}

export default function ProductCard({ product, highlightQuery }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [isAdding, setIsAdding] = useState(false);



  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault(); // Previene la navegación del Link padre
    e.stopPropagation();
    
    if (product.stock === 0 || isAdding) return;
    
    setIsAdding(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    addToCart(product, 1);
    setIsAdding(false);
  };

  // Animación de aparición para cada tarjeta
  const cardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 50, 
      scale: 0.9 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15 
      } 
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="relative flex flex-col h-full rounded-3xl overflow-hidden
                 bg-gradient-to-br from-zinc-900/90 via-zinc-900/80 to-black/90
                 border border-white/5
                 backdrop-blur-xl
                 transition-all duration-700 ease-out
                 hover:shadow-[0_20px_70px_-15px_rgba(255,255,255,0.08),0_0_0_1px_rgba(255,255,255,0.1)]
                 hover:scale-[1.02] 
                 hover:border-white/20
                 hover:-translate-y-1
                 group 
                 focus-within:ring-2 focus-within:ring-white/20 
                 motion-reduce:transform-none motion-reduce:transition-none
                 before:absolute before:inset-0 before:rounded-3xl before:opacity-0 
                 before:bg-gradient-to-br before:from-white/[0.05] before:to-transparent
                 before:hover:opacity-100 before:transition-opacity before:duration-700"
    >
      {/* Línea de acento superior sutil */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[2px] opacity-0 group-hover:opacity-100 transition-all duration-700 
                   bg-gradient-to-r from-transparent via-white/40 to-transparent"
      />
      
      {product.etiqueta && (
        <span className={`absolute top-5 left-5 z-10 px-4 py-2 text-xs font-bold rounded-full shadow-2xl
                          backdrop-blur-md border
                          ${product.etiqueta === 'Oferta' && 'bg-red-500/95 border-red-400/50 text-white shadow-red-500/50'}
                          ${product.etiqueta === 'Más Vendido' && 'bg-gradient-to-r from-yellow-500/95 to-amber-500/95 border-yellow-400/50 text-black shadow-yellow-500/50'}
                          ${product.etiqueta === 'Novedad' && 'bg-emerald-500/95 border-emerald-400/50 text-white shadow-emerald-500/50'}
                          ${product.etiqueta === 'Pocas Unidades' && 'bg-orange-500/95 border-orange-400/50 text-white shadow-orange-500/50'}
                          `}>
          {product.etiqueta}
        </span>
      )}

      <div className="relative w-full h-56 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center overflow-hidden
                    border-b border-white/5">
        {/* Overlay gradient premium */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-[1]" />
        
        <Image
          src={product.imagenUrl}
          alt={product.nombre || 'Producto'}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
          loading="lazy"
          decoding="async"
          className="transition-all duration-1000 group-hover:scale-105 brightness-95 group-hover:brightness-100"
        />
        <div className="absolute top-4 right-4 z-10">
          <FavoriteButton product={product} />
        </div>
      </div>

      <div className="flex flex-col p-7 flex-grow relative z-[2]">
        <h3 className="text-xl font-bold text-white mb-2.5 leading-tight tracking-tight group-hover:text-white transition-colors duration-300">
          {highlight(product.nombre, highlightQuery)}
        </h3>
        <p className="text-gray-400 text-sm mb-1.5 font-medium tracking-wide">
          {highlight(product.marca || '', highlightQuery)}
          {product.modeloCompatible ? ' · ' : ''}
          {highlight(product.modeloCompatible || '', highlightQuery)}
        </p>
        <p className="text-gray-500 text-xs mb-5 line-clamp-2 leading-relaxed">{product.descripcionCorta}</p>

        {/* Chips premium minimalistas */}
        <div className="flex flex-wrap gap-2 mb-5">
          {product.marca && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold 
                           bg-white/5 text-gray-300 border border-white/10 
                           hover:bg-white/10 hover:border-white/20 transition-all duration-300">
              <svg className="w-3.5 h-3.5 opacity-60" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 2l3 7h7l-5.5 4 2.5 7-7-4.5L5.5 20 8 13 2 9h7l3-7z" />
              </svg>
              {product.marca}
            </span>
          )}
          {product.categoria && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold 
                           bg-white/5 text-gray-400 border border-white/10
                           hover:bg-white/10 hover:border-white/20 transition-all duration-300">
              <svg className="w-3.5 h-3.5 opacity-60" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M4 4h16v6H4V4zm0 10h10v6H4v-6z" />
              </svg>
              {product.categoria}
            </span>
          )}
        </div>

        <div className="mt-auto pt-6 border-t border-white/5 space-y-5">
          {/* Sección de precio PREMIUM */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Precio</span>
              <div className="relative">
                <span className="text-3xl font-black text-white tracking-tight">
                  {formatPrice(product.precio)}
                </span>
              </div>
            </div>
            
            <div className="text-right">
              <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg ${
                product.stock === 0 
                  ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
                  : product.stock < 10 
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' 
                    : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${
                  product.stock === 0 ? 'bg-red-400' : product.stock < 10 ? 'bg-amber-400' : 'bg-emerald-400'
                }`}></span>
                {product.stock === 0 ? 'Agotado' : `${product.stock} unidades`}
              </span>
            </div>
          </div>
          
          {/* Botones premium */}
          <div className="flex gap-3">
            <button
              onClick={handleQuickAdd}
              disabled={product.stock === 0 || isAdding}
              aria-label={isAdding ? 'Agregando al carrito' : 'Agregar al carrito'}
              className="flex-1 bg-white text-black px-5 py-3.5 rounded-xl font-bold text-sm
                         transition-all duration-300 hover:bg-gray-100 hover:scale-[1.02]
                         hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.3)]
                         disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100
                         flex items-center justify-center gap-2.5 relative overflow-hidden group/btn
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              {isAdding ? (
                <>
                  <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                  <span>Agregando...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} 
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="tracking-wide">Agregar al Carrito</span>
                </>
              )}
            </button>
            
            <Link 
              href={`/products/${product.id}`}
              aria-label={`Ver más sobre ${product.nombre}`}
              className="bg-white/10 hover:bg-white/15 border border-white/10 hover:border-white/20
                         text-white px-5 py-3.5 rounded-xl font-bold text-sm
                         transition-all duration-300 hover:scale-[1.02]
                         flex items-center justify-center gap-2 relative overflow-hidden group/btn
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            >
              <span className="tracking-wide">Detalles</span>
              <svg className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}