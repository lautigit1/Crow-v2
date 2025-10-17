'use client'

import { products as defaultProducts } from '../../data/product'
import ProductCard from './ProductCard'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Product } from '../../types/product'

interface ProductGridProps {
  products?: Product[]
  highlightQuery?: string
}

export default function ProductGrid({ products = defaultProducts, highlightQuery }: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  
  // Si se pasan productos filtrados, no aplicamos el filtro de categoría interno
  const shouldUseInternalFiltering = products === defaultProducts
  
  const displayedProducts = shouldUseInternalFiltering && selectedCategory !== 'Todos'
    ? products.filter(p => p.categoria === selectedCategory)
    : products
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8"
    >
      {/* Filtros con efecto de desplazamiento suave - solo si usamos filtros internos */}
      {shouldUseInternalFiltering && (
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-4 flex-wrap"
        >
          {['Todos', 'Motor', 'Sistema de Frenos', 'Suspensión', 'Transmisión'].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300
                ${selectedCategory === category 
                  ? 'bg-azul-electrico text-white scale-105 shadow-lg shadow-azul-electrico/50' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            >
              {category}
            </button>
          ))}
        </motion.div>
      )}

      {/* Grid de productos con animación de aparición escalonada */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        variants={containerVariants}
      >
        {displayedProducts.length > 0 ? (
          displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} highlightQuery={highlightQuery} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-white mb-2">No se encontraron productos</h3>
            <p className="text-gray-400">Intenta ajustar tus filtros o realiza una búsqueda diferente</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}