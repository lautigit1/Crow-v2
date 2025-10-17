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
      className="relative flex flex-col h-full rounded-xl overflow-hidden shadow-lg border border-white/10 bg-zinc-900 transition-all duration-300 ease-in-out
                 hover:shadow-neon-blue hover:scale-[1.02] hover:border-azul-electrico group"
    >
      {product.etiqueta && (
        <span className={`absolute top-3 left-3 z-10 px-3 py-1 text-xs font-bold rounded-full 
                          ${product.etiqueta === 'Oferta' && 'bg-rojo-potente text-white'}
                          ${product.etiqueta === 'Más Vendido' && 'bg-azul-electrico text-black'}
                          ${product.etiqueta === 'Novedad' && 'bg-green-500 text-white'}
                          ${product.etiqueta === 'Pocas Unidades' && 'bg-yellow-500 text-black'}
                          `}>
          {product.etiqueta}
        </span>
      )}

      <div className="relative w-full h-48 bg-gray-800 flex items-center justify-center overflow-hidden">
        <Image
          src={product.imagenUrl}
          alt={product.nombre}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-2 right-2 z-10">
          <FavoriteButton product={product} />
        </div>
      </div>

      <div className="flex flex-col p-5 flex-grow">
        <h3 className="text-xl font-semibold text-white mb-2 leading-tight">
          {highlight(product.nombre, highlightQuery)}
        </h3>
        <p className="text-gray-400 text-sm mb-1">
          {highlight(product.marca || '', highlightQuery)}
          {product.modeloCompatible ? ' - ' : ''}
          {highlight(product.modeloCompatible || '', highlightQuery)}
        </p>
        <p className="text-gray-500 text-xs mb-3 truncate">{product.descripcionCorta}</p>

        <div className="mt-auto pt-4 border-t border-white/5 space-y-3">
          <div className="flex items-end justify-between">
            <span className="text-2xl font-extrabold text-azul-electrico">
              {formatPrice(product.precio)}
            </span>
            <span className={`text-sm font-medium ${
              product.stock === 0 
                ? 'text-red-400' 
                : product.stock < 10 
                  ? 'text-yellow-400' 
                  : 'text-green-400'
            }`}>
              {product.stock === 0 ? 'Agotado' : `Stock: ${product.stock}`}
            </span>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={handleQuickAdd}
              disabled={product.stock === 0 || isAdding}
              className="flex-1 bg-azul-electrico text-white px-4 py-2 rounded-full font-bold text-sm
                         transition-all duration-300 hover:scale-105 hover:bg-blue-400 shadow-md
                         disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                         flex items-center justify-center space-x-1"
            >
              {isAdding ? (
                <>
                  <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Agregar</span>
                </>
              )}
            </button>
            
            <Link 
              href={`/products/${product.id}`}
              className="bg-rojo-potente text-white px-5 py-2 rounded-full font-bold text-sm
                         transition-all duration-300 hover:scale-105 hover:bg-red-700 shadow-md
                         flex items-center justify-center"
            >
              Ver Más
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}