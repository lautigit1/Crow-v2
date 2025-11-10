'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import ProductGrid from './components/ProductGrid';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../lib/products-api';
import { ProductGridSkeleton } from '../components/ui/Skeletons';
import { useSearchParams } from 'next/navigation';
import CatalogBackground from '../components/visual/CatalogBackground';

export default function ClientProductsPage() {
  const searchParams = useSearchParams();
  const initialQ = searchParams?.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(initialQ);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedBrand, setSelectedBrand] = useState('Todas');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high'>('name');

  // Usar React Query para obtener productos
  const { 
    data: products = [], 
    isLoading, 
    isError
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 1000 * 60, // 1 min: evita refetches constantes
    gcTime: 1000 * 60 * 5, // 5 min de cache en memoria
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const q = searchParams?.get('q') || '';
    setSearchTerm(q);
  }, [searchParams]);

  // Memoizar categories y brands basados en los productos cargados
  const categories = useMemo(() => 
    ['Todos', ...new Set(products.map((product) => product.categoria).filter(Boolean))],
    [products]
  );
  
  const brands = useMemo(() => 
    ['Todas', ...new Set(products.map((product) => product.marca).filter(Boolean))],
    [products]
  );

  const filteredProducts = useMemo(() => {
    const normalize = (s: string) => (s ? s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() : '');
    const q = normalize(searchTerm.trim());

    const filtered = products.filter((product) => {
      const matchesSearch = q.length === 0 ||
        normalize(product.nombre).includes(q) ||
        normalize(product.descripcionCorta || '').includes(q) ||
        normalize(product.marca || '').includes(q) ||
        normalize(product.modeloCompatible || '').includes(q);
      const matchesCategory = selectedCategory === 'Todos' || product.categoria === selectedCategory;
      const matchesBrand = selectedBrand === 'Todas' || product.marca === selectedBrand;
      const matchesPrice = product.precio >= priceRange[0] && product.precio <= priceRange[1];
      return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.precio - b.precio;
        case 'price-high':
          return b.precio - a.precio;
        case 'name':
        default:
          return a.nombre.localeCompare(b.nombre);
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, selectedBrand, priceRange, sortBy, products]);

  // Estados de loading y error
  if (isLoading) {
    return (
      <main className="relative min-h-screen text-white">
  <CatalogBackground variant="intense" />
        <div className="container mx-auto px-4 pt-32 pb-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }} className="text-center mb-16 relative">
            <motion.h1 initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-5xl lg:text-7xl font-extrabold mb-6 relative px-6 py-3 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-azul-electrico animate-gradient electric-glow" style={{ backgroundSize: '200% auto' }}>
              <span className="block pb-1">Catálogo</span>
              <span className="block -mt-1">de Repuestos</span>
            </motion.h1>
          </motion.div>
          <ProductGridSkeleton />
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="relative min-h-screen text-white">
        <div className="container mx-auto px-4 pt-32 pb-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Error al cargar productos</h1>
            <p className="text-gray-400 mb-6">Ha ocurrido un error cargando los productos. Por favor, intenta nuevamente.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-azul-electrico text-black font-bold rounded-lg hover:bg-blue-400 transition-colors"
            >
              Reintentar
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen text-white">
  <CatalogBackground variant="intense" />

      <div className="container mx-auto px-4 pt-32 pb-8">
        {/* Header del catálogo ultra moderno */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, ease: 'easeOut' }} 
          className="text-center mb-24 relative"
        >
          {/* Glow effect sutil */}
          <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-30">
            <div className="w-[800px] h-[400px] bg-white/5 rounded-full blur-3xl"></div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-6xl lg:text-8xl font-black mb-3 relative leading-[1.1] tracking-tight">
              <span className="block text-white drop-shadow-2xl">
                Catálogo Premium
              </span>
              <span className="block text-gray-400 text-5xl lg:text-6xl font-bold mt-2">
                Repuestos de Calidad
              </span>
            </h1>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.4 }} 
            className="max-w-3xl mx-auto mt-8"
          >
            <p className="text-lg text-gray-400 mb-8 leading-relaxed font-normal">
              Encontrá los mejores repuestos para camiones con garantía oficial y envío a todo el país
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {[
                { icon: '✓', text: 'Stock Disponible' },
                { icon: '✓', text: 'Garantía Oficial' },
                { icon: '✓', text: 'Envío Nacional' },
                { icon: '✓', text: 'Soporte 24/7' }
              ].map((item, i) => (
                <motion.span 
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + (i * 0.1) }}
                  className="flex items-center gap-2 text-gray-400 font-medium"
                >
                  <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-white text-xs">
                    {item.icon}
                  </span>
                  <span>{item.text}</span>
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Barra de búsqueda premium minimalista */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.6 }} 
          className="mb-16"
        >
          <div className="relative max-w-3xl mx-auto" role="search">
            <div className="relative group">
              <input
                type="text"
                placeholder="Buscar repuestos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Buscar repuestos"
                autoComplete="off"
                className="relative w-full px-6 py-5 bg-white/5 
                         border border-white/10 rounded-2xl text-white text-base placeholder-gray-500 
                         focus:outline-none focus:border-white/30 focus:bg-white/10
                         transition-all duration-300 backdrop-blur-xl
                         hover:border-white/20"
              />
              
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    aria-label="Limpiar búsqueda"
                  >
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
                <div className="p-2.5 bg-white text-black rounded-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Panel de filtros minimalista */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16"
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 max-w-7xl mx-auto 
                        hover:border-white/20 transition-all duration-500">
            <h3 className="text-base font-bold text-gray-400 mb-6 flex items-center gap-3 tracking-wide uppercase">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
              <span>Filtros</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-300 tracking-wide uppercase">
                  Categoría
                </label>
                <select 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)} 
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white 
                           focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30
                           hover:border-white/20 transition-all duration-300 cursor-pointer
                           appearance-none backdrop-blur-sm"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.75rem center',
                    backgroundSize: '1.25rem'
                  }}
                >
                  {categories.map((category, index) => (
                    <option key={`category-${index}-${category}`} value={category} className="bg-zinc-900">
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-300 tracking-wide uppercase">
                  Marca
                </label>
                <select 
                  value={selectedBrand} 
                  onChange={(e) => setSelectedBrand(e.target.value)} 
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white 
                           focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30
                           hover:border-white/20 transition-all duration-300 cursor-pointer
                           appearance-none backdrop-blur-sm"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.75rem center',
                    backgroundSize: '1.25rem'
                  }}
                >
                  {brands.map((brand, index) => (
                    <option key={`brand-${index}-${brand}`} value={brand} className="bg-zinc-900">
                      {brand}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-300 tracking-wide uppercase">
                  Ordenar por
                </label>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value as 'name' | 'price-low' | 'price-high')} 
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white 
                           focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30
                           hover:border-white/20 transition-all duration-300 cursor-pointer
                           appearance-none backdrop-blur-sm"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.75rem center',
                    backgroundSize: '1.25rem'
                  }}
                >
                  <option value="name" className="bg-zinc-900">Nombre A-Z</option>
                  <option value="price-low" className="bg-zinc-900">Precio: Menor a Mayor</option>
                  <option value="price-high" className="bg-zinc-900">Precio: Mayor a Menor</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-300 tracking-wide uppercase">
                  Precio máximo
                </label>
                <input
                  type="range"
                  min="0"
                  max="500000"
                  step="10000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, white 0%, white ${(priceRange[1] / 500000) * 100}%, rgba(255,255,255,0.1) ${(priceRange[1] / 500000) * 100}%, rgba(255,255,255,0.1) 100%)`,
                  }}
                />
                <div className="flex justify-between items-center text-xs mt-2">
                  <span className="text-gray-500">$0</span>
                  <span className="font-bold text-white bg-white/10 px-3 py-1 rounded-full border border-white/10">
                    ${priceRange[1].toLocaleString('es-AR')}
                  </span>
                  <span className="text-gray-500">$500,000</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-3 bg-white/5 
                        border border-white/10 rounded-full px-8 py-4 backdrop-blur-md
                        hover:border-white/20 transition-all duration-300">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span className="text-white font-bold text-lg">
              {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} 
              <span className="text-azul-electrico ml-1">encontrado{filteredProducts.length !== 1 ? 's' : ''}</span>
            </span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
          <ProductGrid products={filteredProducts} highlightQuery={searchTerm} />
        </motion.div>

        {filteredProducts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.6, ease: 'easeOut' }} 
            className="text-center py-24"
          >
            <div className="max-w-md mx-auto">
              {/* Icono animado */}
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-9xl mb-8 opacity-30"
              >
                🔍
              </motion.div>
              
              <h3 className="text-4xl font-black mb-4 text-white">
                No encontramos productos
              </h3>
              
              <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                No hay productos que coincidan con tus criterios de búsqueda. 
                <br />
                Probá ajustando los filtros o buscando con otros términos.
              </p>
              
              <motion.button 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }} 
                onClick={() => { 
                  setSearchTerm(''); 
                  setSelectedCategory('Todos'); 
                  setSelectedBrand('Todas'); 
                  setPriceRange([0, 500000]); 
                  setSortBy('name'); 
                }} 
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black 
                         font-bold rounded-xl hover:bg-gray-100
                         transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Limpiar todos los filtros</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
