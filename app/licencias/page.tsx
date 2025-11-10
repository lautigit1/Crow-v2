export const metadata = {
  title: 'Licencias y Atribuciones | CrowRepuestos',
  description: 'Licencias de software y atribuciones de terceros utilizados en CrowRepuestos'
}

export default function LicenciasPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-950 text-white py-20 px-4 relative overflow-hidden">
      {/* Efectos visuales de fondo */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
          <h1 className="text-5xl font-black mb-8 bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
            Licencias y Atribuciones
          </h1>
          <p className="text-gray-400 mb-12">Software de código abierto y recursos utilizados</p>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          
          <section className="bg-gradient-to-br from-zinc-900/90 to-black/90 border border-white/10 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Open Source Software</h2>
            <p className="mb-6">
              CrowRepuestos está construido sobre tecnologías de código abierto. Agradecemos a las 
              comunidades de desarrolladores que hacen posible este proyecto.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-6">Framework y Librerías Principales</h2>
            
            <div className="space-y-6">
              {/* Next.js */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-white">Next.js</h3>
                  <span className="text-sm bg-white/10 px-3 py-1 rounded-full">v15.5.4</span>
                </div>
                <p className="text-gray-400 mb-3">
                  Framework de React para aplicaciones web modernas
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-gray-500">Licencia: MIT</span>
                  <a 
                    href="https://github.com/vercel/next.js" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white hover:underline flex items-center gap-1"
                  >
                    GitHub
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* React */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-white">React</h3>
                  <span className="text-sm bg-white/10 px-3 py-1 rounded-full">v19.0.0</span>
                </div>
                <p className="text-gray-400 mb-3">
                  Biblioteca JavaScript para construir interfaces de usuario
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-gray-500">Licencia: MIT</span>
                  <a 
                    href="https://github.com/facebook/react" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white hover:underline flex items-center gap-1"
                  >
                    GitHub
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* TypeScript */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-white">TypeScript</h3>
                  <span className="text-sm bg-white/10 px-3 py-1 rounded-full">v5</span>
                </div>
                <p className="text-gray-400 mb-3">
                  Superset tipado de JavaScript
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-gray-500">Licencia: Apache 2.0</span>
                  <a 
                    href="https://github.com/microsoft/TypeScript" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white hover:underline flex items-center gap-1"
                  >
                    GitHub
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Tailwind CSS */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-white">Tailwind CSS</h3>
                  <span className="text-sm bg-white/10 px-3 py-1 rounded-full">v3</span>
                </div>
                <p className="text-gray-400 mb-3">
                  Framework CSS utility-first para diseño rápido
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-gray-500">Licencia: MIT</span>
                  <a 
                    href="https://github.com/tailwindlabs/tailwindcss" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white hover:underline flex items-center gap-1"
                  >
                    GitHub
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-6">Librerías de UI y Animación</h2>
            
            <div className="space-y-6">
              {/* Framer Motion */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-white">Framer Motion</h3>
                  <span className="text-sm bg-white/10 px-3 py-1 rounded-full">v11</span>
                </div>
                <p className="text-gray-400 mb-3">
                  Biblioteca de animaciones para React
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-gray-500">Licencia: MIT</span>
                  <a 
                    href="https://github.com/framer/motion" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white hover:underline flex items-center gap-1"
                  >
                    GitHub
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* React Query */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-white">TanStack Query (React Query)</h3>
                  <span className="text-sm bg-white/10 px-3 py-1 rounded-full">v5</span>
                </div>
                <p className="text-gray-400 mb-3">
                  Gestión de estado del servidor y caché para React
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-gray-500">Licencia: MIT</span>
                  <a 
                    href="https://github.com/TanStack/query" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white hover:underline flex items-center gap-1"
                  >
                    GitHub
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Zustand */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-white">Zustand</h3>
                  <span className="text-sm bg-white/10 px-3 py-1 rounded-full">v5</span>
                </div>
                <p className="text-gray-400 mb-3">
                  Gestión de estado simple y escalable
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-gray-500">Licencia: MIT</span>
                  <a 
                    href="https://github.com/pmndrs/zustand" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white hover:underline flex items-center gap-1"
                  >
                    GitHub
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-6">Herramientas de Desarrollo</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="font-bold text-white mb-1">ESLint</h3>
                <p className="text-sm text-gray-400 mb-2">Linter para JavaScript/TypeScript</p>
                <span className="text-xs text-gray-500">Licencia: MIT</span>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="font-bold text-white mb-1">PostCSS</h3>
                <p className="text-sm text-gray-400 mb-2">Procesador CSS con plugins</p>
                <span className="text-xs text-gray-500">Licencia: MIT</span>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="font-bold text-white mb-1">Vitest</h3>
                <p className="text-sm text-gray-400 mb-2">Framework de testing</p>
                <span className="text-xs text-gray-500">Licencia: MIT</span>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="font-bold text-white mb-1">Testing Library</h3>
                <p className="text-sm text-gray-400 mb-2">Testing de componentes React</p>
                <span className="text-xs text-gray-500">Licencia: MIT</span>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-br from-zinc-900/90 to-black/90 border border-white/10 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Recursos y Atribuciones</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-white mb-2">Imágenes</h3>
                <p className="text-sm">
                  Las imágenes de productos y camiones utilizadas en este sitio son propiedad 
                  de sus respectivos fabricantes y se utilizan únicamente con fines ilustrativos 
                  y comerciales legítimos.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold text-white mb-2">Iconos</h3>
                <p className="text-sm">
                  Los iconos SVG utilizados provienen de{' '}
                  <a href="https://heroicons.com" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">
                    Heroicons
                  </a>{' '}
                  (MIT License) desarrollados por el equipo de Tailwind Labs.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold text-white mb-2">Fuentes</h3>
                <p className="text-sm">
                  Este sitio utiliza fuentes del sistema y fuentes web optimizadas para 
                  garantizar la mejor experiencia de lectura.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Licencia del Proyecto</h2>
            <p className="mb-4">
              El código fuente de CrowRepuestos es propiedad de CrowRepuestos y está protegido 
              por las leyes de derechos de autor aplicables. El uso, distribución o modificación 
              no autorizada del código está prohibida.
            </p>
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} CrowRepuestos. Todos los derechos reservados.
            </p>
          </section>

          <section className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Aviso de Terceros</h2>
            <p className="text-sm">
              Este sitio puede contener enlaces a sitios web de terceros o hacer referencia a 
              productos y servicios de terceros. No somos responsables del contenido, la 
              privacidad o las prácticas de estos sitios externos.
            </p>
          </section>

          <section className="text-center bg-white/5 border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Agradecimientos</h2>
            <p className="mb-6">
              Agradecemos a todos los desarrolladores y contribuidores de código abierto cuyo 
              trabajo ha hecho posible este proyecto. La comunidad open source es fundamental 
              para el progreso de la tecnología.
            </p>
            <p className="text-sm text-gray-400">
            Construido con tecnologías open source
            </p>
          </section>

        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-center text-gray-500">
          <p>Información actualizada el 7 de noviembre de 2025</p>
        </div>
        </div>
      </div>
    </main>
  )
}
