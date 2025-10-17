// app/components/home/Hero.tsx
'use client'

import React from 'react'
import { motion, Variants } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

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
      className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-azul-electrico animate-gradient text-reveal-container electric-glow"
      variants={container}
      initial="hidden"
      animate="visible"
      style={{ backgroundSize: '200% auto' }}
    >
      {words.map((word, index) => (
        <motion.span key={index} className="inline-block mr-[1.2rem] whitespace-nowrap" variants={child}>
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
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black text-white">
      <div className="absolute inset-0 z-0">
        <motion.div 
          className="h-full w-full"
          initial={{ scale: 1 }}
          animate={{ scale: 1.1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        >
          <Image
            src="/images/camion-hero.png"
            alt="Camión de carga imponente al amanecer"
            fill
            style={{ objectFit: 'cover' }}
            quality={90}
            priority
            className="filter brightness-60 contrast-125"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 md:px-8 max-w-5xl mx-auto">
        <AnimatedText text="POTENCIA Y TECNOLOGÍA EN CADA REPUESTO" />

        <motion.p
          className="text-lg md:text-2xl font-light mb-8 text-gray-300 drop-shadow-md tracking-normal"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.2 }}
        >
          Tu flota no se detiene. Nosotros tampoco.
        </motion.p>

        <motion.div
          className="flex w-full max-w-2xl mt-8 rounded-xl backdrop-blur-md bg-dark-translucent border border-blue-600 shadow-neon-blue transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.6 }}
        >
          <input
            type="text"
            placeholder="Buscar por código, marca o modelo..."
            className="flex-grow rounded-l-xl bg-transparent px-8 py-4 text-white placeholder-gray-400 text-lg focus:outline-none focus:ring-0"
          />
          <button className="bg-azul-electrico text-black px-8 py-4 rounded-r-xl font-extrabold text-lg transition-all duration-300 hover:bg-blue-400 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-glow active:scale-95 flex items-center gap-2">
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
          <motion.div
            animate={{
              scale: [1, 1.03, 1],
              boxShadow: [
                "0 0 15px rgba(255, 69, 0, 0.6)",
                "0 0 25px rgba(255, 69, 0, 0.8)",
                "0 0 15px rgba(255, 69, 0, 0.6)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 3,
            }}
          >
            {/* ¡ACÁ SACAMOS EL target y rel! */}
            <Link 
              href="/products" 
              scroll={false}
              prefetch={true}
              className="inline-block bg-rojo-potente text-white text-xl font-extrabold px-10 py-5 rounded-full shadow-neon-red transition-all duration-300 transform hover:scale-105 active:scale-95 relative overflow-hidden group focus:outline-none focus:ring-4 focus:ring-red-500/50"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
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
        </motion.div>
      </div>
    </section>
  )
}