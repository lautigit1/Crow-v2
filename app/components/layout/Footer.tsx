// app/components/layout/Footer.tsx
'use client'

import Link from 'next/link'

const SocialIcon = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 transition-all duration-300 hover:text-white hover:scale-110">
    {children}
  </a>
);

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative z-20 bg-zinc-950 text-gray-300 border-t border-white/10 pt-20 pb-8">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Columna 1: Logo y Descripción */}
          <div className="lg:col-span-2">
            <Link href="/" className="text-4xl font-black mb-6 inline-block transition-all duration-300 hover:opacity-80">
              <span className="text-white">Crow</span>
              <span className="text-gray-400">Repuestos</span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed max-w-md">
              Líderes en distribución de repuestos para vehículos pesados. 
              Calidad garantizada, entrega rápida y asesoramiento experto para mantener 
              tu flota en perfectas condiciones.
            </p>
            <div className="flex space-x-4">
              <SocialIcon href="https://instagram.com">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44c0-.795-.645-1.44-1.441-1.44z"></path></svg>
              </SocialIcon>
              <SocialIcon href="https://facebook.com">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg>
              </SocialIcon>
              <SocialIcon href="https://wa.me/542611234567">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.267.655 4.398 1.803 6.166l-1.335 4.881 4.881-1.335z"></path></svg>
              </SocialIcon>
              <SocialIcon href="https://linkedin.com">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"></path></svg>
              </SocialIcon>
            </div>
          </div>

          {/* Columna 2: Navegación */}
          <div>
            <h3 className="font-bold text-white mb-6 tracking-wide uppercase text-sm">Navegación</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">Inicio</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">Catálogo</Link></li>
              <li><Link href="/favoritos" className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">Favoritos</Link></li>
              <li><Link href="/cart" className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">Carrito</Link></li>
              <li><Link href="/perfil" className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">Mi Cuenta</Link></li>
            </ul>
          </div>

          {/* Columna 3: Ayuda */}
          <div>
            <h3 className="font-bold text-white mb-6 tracking-wide uppercase text-sm">Ayuda</h3>
            <ul className="space-y-3">
              <li><Link href="/terminos" className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">Términos y Condiciones</Link></li>
              <li><Link href="/privacidad" className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">Política de Privacidad</Link></li>
              <li><Link href="/cookies" className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">Política de Cookies</Link></li>
              <li><Link href="/envios" className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">Envíos y Devoluciones</Link></li>
              <li><Link href="/garantias" className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">Garantías</Link></li>
              <li><Link href="/licencias" className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">Licencias</Link></li>
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div>
            <h3 className="font-bold text-white mb-6 tracking-wide uppercase text-sm">Contacto</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-white mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                <span>Av. San Martín 1234<br />Mendoza, Argentina</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                <a href="mailto:contacto@crowrepuestos.com" className="hover:text-white transition-colors duration-300">contacto@crowrepuestos.com</a>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>
                <a href="tel:+542611234567" className="hover:text-white transition-colors duration-300">+54 261 123-4567</a>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path></svg>
                <span>Lun - Vie: 8:00 - 18:00<br />Sáb: 9:00 - 13:00</span>
              </li>
            </ul>
          </div>

        </div>
        
        {/* Métodos de Pago */}
        <div className="border-t border-white/10 pt-8 pb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-white font-bold mb-3 text-sm uppercase tracking-wide">Métodos de Pago</h4>
              <div className="flex gap-3 flex-wrap">
                <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm">💳 Tarjetas</div>
                <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm">💰 Efectivo</div>
                <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm">🏦 Transferencia</div>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-3 text-sm uppercase tracking-wide text-center md:text-right">Envíos</h4>
              <div className="flex gap-3 flex-wrap justify-center md:justify-end">
                <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm">🚚 Todo el país</div>
                <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm">📦 Retiro en local</div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-gray-500 text-sm mb-3">
            &copy; {currentYear} CrowRepuestos. Todos los derechos reservados.
          </p>
          <p className="text-gray-600 text-xs">
            Desarrollado en Mendoza, Argentina
          </p>
        </div>

      </div>
    </footer>
  )
}