'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import ProductGrid from './components/ProductGrid';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../lib/products-api';
import { ProductGridSkeleton } from '../components/ui/Skeletons';
import { useSearchParams } from 'next/navigation';

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
      <main className="relative min-h-screen text-white bg-gradient-to-br from-[#0a0f1f] via-[#0c1428] to-[#081220]">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-60 -left-60 h-[70rem] w-[70rem] rounded-full blur-3xl opacity-50 bg-[radial-gradient(circle_at_center,_#00BFFF_0%,_rgba(0,191,255,0.3)_30%,_rgba(0,191,255,0.1)_60%,_transparent_100%)]" />
          <div className="absolute top-1/4 -right-60 h-[60rem] w-[60rem] rounded-full blur-3xl opacity-40 bg-[radial-gradient(circle_at_center,_#0099FF_0%,_rgba(0,153,255,0.25)_40%,_rgba(0,153,255,0.05)_70%,_transparent_100%)]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[100rem] w-[100rem] rounded-full blur-3xl opacity-10 bg-[radial-gradient(ellipse_at_center,_rgba(0,191,255,0.6)_0%,_rgba(0,191,255,0.2)_30%,_rgba(0,191,255,0.05)_60%,_transparent_100%)]" />
        </div>
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
      <main className="relative min-h-screen text-white bg-gradient-to-br from-[#0a0f1f] via-[#0c1428] to-[#081220]">
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
    <main className="relative min-h-screen text-white bg-gradient-to-br from-[#0a0f1f] via-[#0c1428] to-[#081220]">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* Orbs principales más grandes y vibrantes */}
        <div className="absolute -top-60 -left-60 h-[70rem] w-[70rem] rounded-full blur-3xl opacity-50 bg-[radial-gradient(circle_at_center,_#00BFFF_0%,_rgba(0,191,255,0.3)_30%,_rgba(0,191,255,0.1)_60%,_transparent_100%)]" />
        <div className="absolute top-1/4 -right-60 h-[60rem] w-[60rem] rounded-full blur-3xl opacity-40 bg-[radial-gradient(circle_at_center,_#0099FF_0%,_rgba(0,153,255,0.25)_40%,_rgba(0,153,255,0.05)_70%,_transparent_100%)]" />
        
        {/* Orb central masivo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[100rem] w-[100rem] rounded-full blur-3xl opacity-10 bg-[radial-gradient(ellipse_at_center,_rgba(0,191,255,0.6)_0%,_rgba(0,191,255,0.2)_30%,_rgba(0,191,255,0.05)_60%,_transparent_100%)]" />
        
        {/* Grid pattern más sutil y elegante */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,rgba(0,191,255,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,191,255,0.2)_1px,transparent_1px)] bg-[size:80px_80px]" />
        
        {/* Orbs flotantes adicionales */}
        <div className="absolute top-10 left-1/4 h-[40rem] w-[40rem] rounded-full blur-3xl opacity-30 bg-[radial-gradient(circle_at_center,_#00CCFF_0%,_rgba(0,204,255,0.15)_50%,_transparent_80%)]" />
        <div className="absolute bottom-20 right-1/4 h-[45rem] w-[45rem] rounded-full blur-3xl opacity-25 bg-[radial-gradient(circle_at_center,_#0088CC_0%,_rgba(0,136,204,0.12)_60%,_transparent_90%)]" />
        <div className="absolute top-2/3 left-10 h-[35rem] w-[35rem] rounded-full blur-3xl opacity-20 bg-[radial-gradient(circle_at_center,_#00AAFF_0%,_rgba(0,170,255,0.1)_70%,_transparent_100%)]" />
        
        {/* Líneas de conexión sutiles */}
        <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-azul-electrico/10 to-transparent" />
        <div className="absolute bottom-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/8 to-transparent" />
        
        {/* Efecto de profundidad con capas */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_transparent_0%,_rgba(0,0,0,0.1)_100%)]" />
      </div>

      <div className="container mx-auto px-4 pt-32 pb-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }} className="text-center mb-16 relative">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-azul-electrico/5 rounded-full blur-3xl"></div>
          </div>
          <motion.h1 initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-5xl lg:text-7xl font-extrabold mb-6 relative px-6 py-3 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-azul-electrico animate-gradient electric-glow" style={{ backgroundSize: '200% auto' }}>
            <span className="block pb-1">Catálogo</span>
            <span className="block -mt-1">de Repuestos</span>
          </motion.h1>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="max-w-4xl mx-auto">
            <p className="text-xl lg:text-2xl text-gray-300 mb-4 leading-relaxed">Encontrá los mejores repuestos para camiones con garantía y envío a todo el país</p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-azul-electrico">
              <span className="flex items-center gap-2">✓ <span className="text-gray-400">Stock disponible</span></span>
              <span className="flex items-center gap-2">✓ <span className="text-gray-400">Garantía incluida</span></span>
              <span className="flex items-center gap-2">✓ <span className="text-gray-400">Envío a todo el país</span></span>
              <span className="flex items-center gap-2">✓ <span className="text-gray-400">Soporte técnico</span></span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="mb-12">
          <div className="relative max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar repuestos por nombre o descripción..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-8 py-6 bg-gradient-to-r from-[#0d1a2b]/70 to-[#0b1624]/70 border border-azul-electrico/20 rounded-2xl text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-azul-electrico focus:border-azul-electrico transition-all duration-300 shadow-[0_0_18px_rgba(0,191,255,0.08)] backdrop-blur-md"
              />
              <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
                <svg className="w-6 h-6 text-azul-electrico" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#0f172a]/60 to-[#0b1220]/60 backdrop-blur-md border border-azul-electrico/20 rounded-2xl p-6 max-w-7xl mx-auto shadow-[0_0_30px_rgba(0,191,255,0.06)]">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-azul-electrico" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
              Filtros Avanzados
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Categoría</label>
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full px-4 py-3 bg-[#0d1a2b]/60 border border-azul-electrico/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-azul-electrico focus:border-azul-electrico transition-all duration-300 backdrop-blur-sm">
                  {categories.map((category, index) => (
                    <option key={`category-${index}-${category}`} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Marca</label>
                <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)} className="w-full px-4 py-3 bg-[#0d1a2b]/60 border border-azul-electrico/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-azul-electrico focus:border-azul-electrico transition-all duration-300 backdrop-blur-sm">
                  {brands.map((brand, index) => (
                    <option key={`brand-${index}-${brand}`} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Ordenar por</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value as 'name' | 'price-low' | 'price-high')} className="w-full px-4 py-3 bg-[#0d1a2b]/60 border border-azul-electrico/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-azul-electrico focus:border-azul-electrico transition-all duration-300 backdrop-blur-sm">
                  <option value="name">Nombre A-Z</option>
                  <option value="price-low">Precio: Menor a Mayor</option>
                  <option value="price-high">Precio: Mayor a Menor</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Precio máximo</label>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="500000"
                    step="10000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full h-2 bg-[#0d1a2b] rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #00BFFF 0%, #00BFFF ${(priceRange[1] / 500000) * 100}%, rgba(255,255,255,0.08) ${(priceRange[1] / 500000) * 100}%, rgba(255,255,255,0.08) 100%)`,
                    }}
                  />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>$0</span>
                    <span className="font-semibold text-azul-electrico">${priceRange[1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                    <span>$500,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-azul-electrico/10 to-cyan-500/10 border border-azul-electrico/20 rounded-full px-6 py-3 backdrop-blur-sm">
            <svg className="w-5 h-5 text-azul-electrico" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span className="text-white font-semibold">{filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
          <ProductGrid products={filteredProducts} highlightQuery={searchTerm} />
        </motion.div>

        {filteredProducts.length === 0 && (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: 'easeOut' }} className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="text-8xl mb-6 opacity-50">🔍</div>
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">No encontramos productos</h3>
              <p className="text-gray-400 mb-8 text-lg leading-relaxed">No hay productos que coincidan con tus criterios de búsqueda. Probá ajustando los filtros o buscando con otros términos.</p>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => { setSearchTerm(''); setSelectedCategory('Todos'); setSelectedBrand('Todas'); setPriceRange([0, 500000]); setSortBy('name'); }} className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-azul-electrico to-cyan-500 text-black font-bold rounded-xl hover:from-cyan-500 hover:to-azul-electrico transition-all duration-300 shadow-lg hover:shadow-xl">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Limpiar todos los filtros
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
