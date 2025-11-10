// app/page.tsx

import Hero from './components/home/Hero'
import Features from './components/home/Features'
import Stats from './components/home/Stats'
import Categories from './components/home/Categories'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="relative">
      {/* Fondo del camión para toda la página */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/images/camion-hero.png"
          alt="Camión de carga"
          fill
          sizes="100vw"
          style={{ objectFit: 'cover' }}
          quality={90}
          priority
          className="filter brightness-[0.4] contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
      </div>
      
      {/* Contenido con z-index superior */}
      <div className="relative z-10">
        <Hero />
        <Features />
        <Stats />
        <Categories />
      </div>
    </main>
  )
}