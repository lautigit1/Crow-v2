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
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const ariaLabel = mounted && totalItems > 0
    ? `Carrito de compras (${totalItems} productos)`
    : 'Carrito de compras'

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      initial={false}
      className="group relative p-2 text-white transition-all duration-200 rounded-lg hover:bg-zinc-800/50 hover:ring-2 hover:ring-white/40"
      aria-label={ariaLabel}
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
      {mounted && totalItems > 0 && (
        <motion.span
          initial={false}
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
  const logout = useAuthStore((state) => state.logout)
  const pathname = usePathname()
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState<Product[]>([])
  const [showResults, setShowResults] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const searchRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const userMenuRef = useRef<HTMLDivElement | null>(null)

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

  // Close user menu on outside click
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!userMenuRef.current) return
      if (userMenuRef.current.contains(e.target as Node)) return
      setShowUserMenu(false)
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [])

  const handleLogout = async () => {
    await logout()
    setShowUserMenu(false)
    window.location.href = '/'
  }

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

  const links: { href: string; label: string }[] = []

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
            <div ref={userMenuRef} className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:bg-zinc-800/50 hover:ring-2 hover:ring-azul-electrico/40 transition-all"
                aria-label="Menú de usuario"
              >
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-azul-electrico to-purple-500 text-black font-extrabold shadow-lg">
                  {user.name?.[0]?.toUpperCase() || 'U'}
                </span>
                <span className="hidden sm:block font-medium">{user.name.split(' ')[0]}</span>
                <svg 
                  className={`w-4 h-4 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-56 bg-[#0d1a2b] border border-azul-electrico/30 rounded-xl shadow-2xl overflow-hidden z-50"
                >
                  <div className="px-4 py-3 border-b border-white/10">
                    <p className="text-sm font-semibold text-white">{user.name}</p>
                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                    {user.role === 'admin' && (
                      <span className="inline-block mt-1 px-2 py-0.5 bg-purple-500/20 border border-purple-500/50 rounded text-xs text-purple-300 font-semibold">
                        👑 Admin
                      </span>
                    )}
                  </div>
                  
                  <div className="py-1">
                    <Link
                      href="/perfil"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-azul-electrico/20 hover:text-white transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Mi perfil
                    </Link>
                    
                    <Link
                      href="/favoritos"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-azul-electrico/20 hover:text-white transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      Mis favoritos
                    </Link>

                    {user.role === 'admin' && (
                      <Link
                        href="/admin/dashboard"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-purple-300 hover:bg-purple-500/20 hover:text-purple-200 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Panel Admin
                      </Link>
                    )}
                  </div>

                  <div className="border-t border-white/10">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Cerrar sesión
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-azul-electrico to-blue-500 hover:from-azul-electrico hover:to-azul-electrico text-white font-semibold transition-all duration-300 shadow-lg shadow-azul-electrico/50 hover:shadow-xl hover:shadow-azul-electrico/70 hover:scale-105 active:scale-95"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                  <polyline points="10 17 15 12 10 7"/>
                  <line x1="15" y1="12" x2="3" y2="12"/>
                </svg>
                Iniciar sesión
              </Link>
              
              {/* Mobile - Solo ícono con efecto */}
              <Link
                href="/login"
                className="sm:hidden p-2.5 rounded-xl bg-gradient-to-r from-azul-electrico to-blue-500 hover:from-azul-electrico hover:to-azul-electrico text-white transition-all duration-300 shadow-lg shadow-azul-electrico/50 hover:shadow-xl hover:shadow-azul-electrico/70 hover:scale-105 active:scale-95"
                aria-label="Iniciar sesión"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                  <polyline points="10 17 15 12 10 7"/>
                  <line x1="15" y1="12" x2="3" y2="12"/>
                </svg>
              </Link>
            </div>
          )}

          {/* Admin Panel - Eliminado, ya está en el dropdown del usuario */}
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