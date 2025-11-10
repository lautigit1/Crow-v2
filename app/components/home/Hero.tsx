// app/components/home/Hero.tsx
'use client'

import React from 'react'
import { motion, Variants } from 'framer-motion'
import Link from 'next/link'

// Componente para la animación de revelado de texto
const AnimatedText = ({ text }: { text: string }) => {
  const words = text.split(' ')
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.3 * i },
    }),
  }
  const child: Variants = {
    visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 10, stiffness: 120 } },
    hidden: { opacity: 0, y: 40 },
  }

  return (
    <motion.h1
      className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight tracking-tight drop-shadow-lg"
      style={{ color: '#00BFFF' }}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-[1.2rem] whitespace-nowrap"
          style={{ color: '#00BFFF' }}
          variants={child}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  )
}

export default function Hero() {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.2, 0.6, 0.3, 0.9] } },
  }
  const ctaVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.2, 0.6, 0.3, 0.9],
        delay: 2.0,
      }
    }
  }

  return (
    <section className="relative flex min-h-screen items-center justify-center" role="region" aria-label="Hero principal" style={{ color: '#00BFFF' }}>
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 md:px-8 max-w-5xl mx-auto py-20">
        <AnimatedText text="POTENCIA Y TECNOLOGÍA EN CADA REPUESTO" />

        <motion.p
          className="text-lg md:text-2xl font-light mb-8 drop-shadow-md tracking-normal"
          style={{ color: '#00BFFF' }}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.2 }}
        >
          Tu flota no se detiene. Nosotros tampoco.
        </motion.p>

        <motion.div
          className="flex w-full max-w-2xl mt-8 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 shadow-xl transition-all duration-300 hover:border-white/20 hover:shadow-2xl"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.6 }}
        >
          <input
            type="text"
            placeholder="Buscar por código, marca o modelo..."
            aria-label="Buscar por código, marca o modelo"
            autoComplete="off"
            className="flex-grow rounded-l-xl bg-transparent px-8 py-4 placeholder-gray-400 text-lg focus:outline-none focus:ring-0"
            style={{ color: '#00BFFF' }}
          />
          <button
            aria-label="Buscar"
            className="px-8 py-4 rounded-r-xl font-bold text-lg transition-all duration-300 hover:brightness-110 hover:scale-105 focus:outline-none focus:ring-4 active:scale-95 flex items-center gap-2"
            style={{ backgroundColor: '#00BFFF', color: '#FFFFFF' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
            Buscar
          </button>
        </motion.div>

        <motion.div
          className="mt-12"
          variants={ctaVariants}
          initial="hidden"
          animate="visible"
        >
          <Link 
            href="/products" 
            scroll={false}
            prefetch={true}
            aria-label="Explorar catálogo de productos"
            className="inline-block text-xl font-bold px-12 py-5 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 hover:brightness-110 active:scale-95 relative overflow-hidden group focus:outline-none focus:ring-4"
            style={{ backgroundColor: '#00BFFF', color: '#FFFFFF' }}
          >
            <span className="relative z-10 flex items-center">
              EXPLORAR CATÁLOGO 
              <motion.span 
                className="ml-2 text-xl"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                &#x2192;
              </motion.span>
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}