// app/components/layout/Footer.tsx
import Link from 'next/link'

// Un componente chiquito para los íconos de redes, para no repetir código
const SocialIcon = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 transition-all duration-300 hover:text-azul-electrico hover:scale-110">
    {children}
  </a>
);

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-gray-300 border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Columna 1: Logo y Slogan */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="text-3xl font-bold transition-all duration-300 hover:drop-shadow-[0_0_5px_rgba(0,191,255,0.8)]">
              <span className="text-white">Crow</span>
              <span className="text-azul-electrico">Repuestos</span>
            </Link>
            <p className="mt-4 text-sm text-gray-400 max-w-xs">
              Potencia y tecnología en cada repuesto. La solución que tu flota necesita.
            </p>
          </div>

          {/* Columna 2: Navegación */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 tracking-wider">Navegación</h3>
            <ul className="space-y-3">
              <li><Link href="/categorias/motor" className="hover:text-white transition-colors duration-300">Motor</Link></li>
              <li><Link href="/categorias/frenos" className="hover:text-white transition-colors duration-300">Frenos</Link></li>
              <li><Link href="/categorias/filtros" className="hover:text-white transition-colors duration-300">Filtros</Link></li>
              <li><Link href="/contacto" className="hover:text-white transition-colors duration-300">Contacto</Link></li>
            </ul>
          </div>

          {/* Columna 3: Contacto */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 tracking-wider">Contacto</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-azul-electrico" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                <span>Mendoza, Argentina</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-azul-electrico" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                <a href="mailto:contacto@crowrepuestos.com" className="hover:text-white transition-colors duration-300">contacto@crowrepuestos.com</a>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-azul-electrico" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>
                <a href="tel:+542611234567" className="hover:text-white transition-colors duration-300">+54 261 123-4567</a>
              </li>
            </ul>
          </div>

          {/* Columna 4: Redes Sociales */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 tracking-wider">Seguinos</h3>
            <div className="flex space-x-6">
              <SocialIcon href="https://instagram.com">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44c0-.795-.645-1.44-1.441-1.44z"></path></svg>
              </SocialIcon>
              <SocialIcon href="https://facebook.com">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg>
              </SocialIcon>
              <SocialIcon href="https://wa.me/542611234567">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.267.655 4.398 1.803 6.166l-1.335 4.881 4.881-1.335z"></path></svg>
              </SocialIcon>
            </div>
          </div>

        </div>
        
        {/* Barra de Copyright */}
        <div className="border-t border-white/10 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} CrowRepuestos. Todos los derechos reservados.</p>
          <p className="mt-2">
            <Link href="/terminos" className="hover:text-white transition-colors duration-300">Términos y Condiciones</Link>
            <span className="mx-2">|</span>
            <Link href="/privacidad" className="hover:text-white transition-colors duration-300">Política de Privacidad</Link>
          </p>
        </div>

      </div>
    </footer>
  )
}