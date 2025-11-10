'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const categories = [
  {
    name: 'Motor',
    description: 'Piezas esenciales para el corazón de tu camión',
    icon: '⚙️',
    href: '/products'
  },
  {
    name: 'Frenos',
    description: 'Seguridad y control en cada frenada',
    icon: '🛑',
    href: '/products'
  },
  {
    name: 'Suspensión',
    description: 'Confort y estabilidad en cada viaje',
    icon: '🔧',
    href: '/products'
  },
  {
    name: 'Transmisión',
    description: 'Potencia eficiente a las ruedas',
    icon: '⚡',
    href: '/products'
  },
  {
    name: 'Eléctrico',
    description: 'Iluminación y sistemas electrónicos',
    icon: '💡',
    href: '/products'
  },
  {
    name: 'Filtros',
    description: 'Protección y rendimiento óptimo',
    icon: '🔍',
    href: '/products'
  }
]

export default function Categories() {
  return (
    <section className="relative py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Categorías Destacadas
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Encuentra exactamente lo que necesitas para tu flota
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                href={category.href}
                className="block bg-gradient-to-br from-zinc-900/90 via-zinc-900/80 to-black/90 
                         border border-white/5 rounded-2xl p-8 
                         hover:border-white/20 transition-all duration-300 group
                         hover:scale-105 hover:shadow-2xl"
              >
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-gray-100">
                  {category.name}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300">
                  {category.description}
                </p>
                <div className="mt-4 flex items-center text-white group-hover:translate-x-2 transition-transform duration-300">
                  <span className="text-sm font-semibold">Ver productos</span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
