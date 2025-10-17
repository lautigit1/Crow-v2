// app/components/layout/Navbar.tsx
'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCartStore } from '../../stores/useCartStore'
import { useAuthStore } from '../../stores/useAuthStore'
import SearchResults from './SearchResults'
import { products } from '../../data/product'
import { Product } from '../../types/product'

// Componente del ícono del carrito
function CartIcon({ onClick }: { onClick: () => void }) {
  const totalItems = useCartStore((state) => state.getTotalItems())

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      className="group relative p-2 text-white transition-all duration-200 rounded-lg hover:bg-zinc-800/50 hover:ring-2 hover:ring-white/40"
      aria-label={`Carrito de compras${totalItems > 0 ? ` (${totalItems} productos)` : ''}`}
    >
      <svg
        className="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Carrito moderno estilo outline */}
        <path d="M2.25 2.25h1.386c.51 0 .955.343 1.087.835l.383 1.437" />
        <path d="M6.116 4.5h13.384c.72 0 1.236.67 1.065 1.37l-1.755 7.02a1.125 1.125 0 01-1.095.86H7.5" />
        <path d="M7.5 14.25L5.477 4.522" />
        <path d="M4.5 12.75H3.375" />
        <circle cx="15.75" cy="19.5" r="1.125" />
        <circle cx="9" cy="19.5" r="1.125" />
      </svg>
      {totalItems > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 bg-rojo-potente text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
        >
          {totalItems}
        </motion.span>
      )}
    </motion.button>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const openCart = useCartStore((state) => state.openCart)
  const user = useAuthStore((state) => state.user)
  const pathname = usePathname()
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState<Product[]>([])
  const [showResults, setShowResults] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const searchRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)

  // Ocultar búsqueda en página de productos
  const hideSearch = pathname === '/products'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Debounced search
  useEffect(() => {
    if (searchTerm.trim().length < 3) {
      setResults([])
      setShowResults(false)
      setHighlightedIndex(-1)
      return
    }
    const id = setTimeout(() => {
      const normalize = (s: string) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()
      const term = normalize(searchTerm)
      const filtered = products.filter(p => {
        const nombre = normalize(p.nombre)
        const marca = normalize(p.marca || '')
        const modelo = normalize(p.modeloCompatible || '')
        return nombre.includes(term) || marca.includes(term) || modelo.includes(term)
      }).slice(0, 5)
      setResults(filtered)
      setShowResults(filtered.length > 0)
      setHighlightedIndex(filtered.length ? 0 : -1)
    }, 300)
    return () => clearTimeout(id)
  }, [searchTerm])

  // Close on outside click
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!searchRef.current) return
      if (searchRef.current.contains(e.target as Node)) return
      setShowResults(false)
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [])

  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showResults || results.length === 0) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightedIndex(i => (i + 1) % results.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightedIndex(i => (i - 1 + results.length) % results.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const item = results[highlightedIndex]
      if (item) {
        window.location.href = `/products/${item.id}`
      }
    } else if (e.key === 'Escape') {
      setShowResults(false)
    }
  }, [results, highlightedIndex, showResults])

  const links = [
    { href: '/categorias/motor', label: 'Motor' },
    { href: '/categorias/frenos', label: 'Frenos' },
    { href: '/categorias/filtros', label: 'Filtros' },
    { href: '/contacto', label: 'Contacto' },
  ]

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out`}
      animate={{
        backgroundColor: scrolled ? 'rgba(17, 17, 17, 0.7)' : 'rgba(17, 17, 17, 0)',
        backdropFilter: scrolled ? 'blur(10px)' : 'blur(0px)',
      }}
    >
      <nav className="container mx-auto flex h-24 items-center justify-between px-8">
        {/* Logo */}
        <div className="text-3xl font-bold">
          <Link 
            href="/" 
            className="text-azul-electrico logo-electric transition-all duration-300 logo-glow"
          >
            CrowRepuestos
          </Link>
        </div>

        {/* Enlaces centrales - ocultos en móvil */}
        <ul className="hidden md:flex items-center space-x-8">
          {links.map((link) => (
            <li key={link.href}>
              <Link 
                href={link.href} 
                className="text-gray-300 hover:text-white transition-colors duration-300 font-medium"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Sección derecha */}
        <div className="flex items-center space-x-3">
          {/* Búsqueda con autocompletado - Oculta en página de productos */}
          {!hideSearch && (
            <div ref={searchRef} className="relative hidden xl:block">
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setShowResults(results.length > 0)}
              onKeyDown={onKeyDown}
              placeholder="Buscar repuestos..."
              className="w-64 rounded-full border border-azul-electrico/20 bg-[#0d1a2b]/70 px-4 py-2 text-sm text-white placeholder-gray-400 transition-all duration-300 focus:w-80 focus:border-azul-electrico focus:outline-none backdrop-blur-sm"
            />
            <SearchResults
              results={results}
              visible={showResults}
              highlightedIndex={highlightedIndex}
              onItemHover={(i) => setHighlightedIndex(i)}
              onClose={() => setShowResults(false)}
              query={searchTerm}
            />
          </div>
          )}

          {/* Botón de búsqueda mobile - También oculto en página de productos */}
          {!hideSearch && (
            <button
              className="xl:hidden p-2 rounded-lg text-white hover:bg-zinc-800/50 hover:ring-2 hover:ring-white/40"
              onClick={() => {
                setMobileSearchOpen(true)
                setTimeout(() => inputRef.current?.focus(), 0)
              }}
              aria-label="Abrir búsqueda"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </button>
          )}
          
          {/* Carrito */}
            <CartIcon onClick={openCart} />

          {/* Favoritos */}
          <Link
            href="/favoritos"
            className="p-2 rounded-lg text-white hover:bg-zinc-800/50 hover:ring-2 hover:ring-white/40"
            aria-label="Ver favoritos"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.934 0-3.545 1.127-4.312 2.733C11.232 4.877 9.62 3.75 7.687 3.75 5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </Link>
          
          {/* Perfil / Login */}
          {user ? (
            <Link
              href="/perfil"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-white hover:bg-zinc-800/50 hover:ring-2 hover:ring-white/40"
              aria-label="Ver perfil"
            >
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-azul-electrico text-black font-extrabold">
                {user.name?.[0]?.toUpperCase() || 'U'}
              </span>
              <span className="hidden sm:block">Perfil</span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="p-2 rounded-lg text-white hover:bg-zinc-800/50 hover:ring-2 hover:ring-white/40"
              aria-label="Iniciar sesión"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M4 21v-2a4 4 0 0 1 3-3.87"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </Link>
          )}

          {/* Admin Panel (only in development) */}
          {process.env.NODE_ENV === 'development' && (
            <Link
              href="/admin/login"
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-zinc-800/50 transition-colors"
              title="Panel de Administración"
            >
              ⚙️
            </Link>
          )}
        </div>
      </nav>

      {/* Overlay de búsqueda mobile - Solo si no estamos en productos */}
      {mobileSearchOpen && !hideSearch && (
        <div className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm">
          <div className="absolute inset-x-0 top-0 p-4 flex items-center gap-2">
            <div ref={searchRef} className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Buscar repuestos..."
                className="w-full rounded-full border border-azul-electrico/40 bg-[#0d1a2b]/80 px-5 py-3 text-base text-white placeholder-gray-400 focus:outline-none focus:border-azul-electrico"
              />
              <SearchResults
                results={results}
                visible={results.length > 0}
                highlightedIndex={highlightedIndex}
                onItemHover={(i) => setHighlightedIndex(i)}
                onClose={() => setMobileSearchOpen(false)}
                query={searchTerm}
              />
            </div>
            <button
              className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-zinc-800"
              aria-label="Cerrar búsqueda"
              onClick={() => { setMobileSearchOpen(false); setShowResults(false) }}
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

  {/* Cart Drawer movido a ClientLayout */}
    </motion.header>
  )
}