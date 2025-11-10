export const metadata = {
  title: 'Política de Cookies | CrowRepuestos',
  description: 'Información sobre el uso de cookies en CrowRepuestos'
}

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-950 text-white py-20 px-4 relative overflow-hidden">
      {/* Efectos visuales de fondo */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
          <h1 className="text-5xl font-black mb-8 bg-gradient-to-r from-white via-orange-100 to-white bg-clip-text text-transparent">
            Política de Cookies
          </h1>
          <p className="text-gray-400 mb-12">Última actualización: Noviembre 2025</p>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-3xl font-bold text-white mb-4">¿Qué son las Cookies?</h2>
            <p>
              Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando 
              visita un sitio web. Se utilizan ampliamente para hacer que los sitios web funcionen de 
              manera más eficiente, así como para proporcionar información a los propietarios del sitio.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-4">Tipos de Cookies que Utilizamos</h2>
            
            <h3 className="text-xl font-semibold text-white mt-6 mb-3">1. Cookies Estrictamente Necesarias</h3>
            <p className="mb-3">
              Estas cookies son esenciales para que pueda navegar por el sitio web y utilizar sus funciones.
            </p>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <ul className="space-y-2">
                <li>• <strong>session_id:</strong> Mantiene su sesión activa (24 horas)</li>
                <li>• <strong>csrf_token:</strong> Protege contra ataques de falsificación (Sesión)</li>
                <li>• <strong>cart_data:</strong> Almacena el contenido de su carrito (7 días)</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">2. Cookies de Rendimiento</h3>
            <p className="mb-3">
              Recopilan información sobre cómo usa nuestro sitio web para ayudarnos a mejorarlo.
            </p>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <ul className="space-y-2">
                <li>• <strong>_ga:</strong> Google Analytics - Identificador único (2 años)</li>
                <li>• <strong>_gid:</strong> Google Analytics - Sesión de usuario (24 horas)</li>
                <li>• <strong>_gat:</strong> Google Analytics - Tasa de solicitudes (1 minuto)</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">3. Cookies de Funcionalidad</h3>
            <p className="mb-3">
              Permiten que el sitio web recuerde sus preferencias.
            </p>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <ul className="space-y-2">
                <li>• <strong>user_preferences:</strong> Idioma y moneda preferidos (30 días)</li>
                <li>• <strong>theme:</strong> Tema oscuro/claro (365 días)</li>
                <li>• <strong>cookie_consent:</strong> Preferencias de cookies (365 días)</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">4. Cookies de Marketing</h3>
            <p className="mb-3">
              Se utilizan para mostrar anuncios relevantes y medir la efectividad de campañas.
            </p>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <ul className="space-y-2">
                <li>• <strong>_fbp:</strong> Facebook Pixel (90 días)</li>
                <li>• <strong>_gcl_au:</strong> Google AdWords (90 días)</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-4">Cookies de Terceros</h2>
            <p className="mb-4">
              Algunos de nuestros socios pueden establecer cookies en su dispositivo:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Google Analytics:</strong> Para análisis de tráfico y comportamiento</li>
              <li><strong>Facebook:</strong> Para remarketing y medición de conversiones</li>
              <li><strong>Mercado Pago:</strong> Para procesamiento seguro de pagos</li>
              <li><strong>YouTube:</strong> Si reproducimos videos incrustados</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-4">Cómo Gestionar las Cookies</h2>
            <p className="mb-4">
              Puede controlar y/o eliminar las cookies como desee:
            </p>
            
            <h3 className="text-xl font-semibold text-white mt-6 mb-3">En su Navegador</h3>
            <div className="space-y-3">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-white mb-2">Chrome</p>
                <p className="text-sm">Configuración → Privacidad y seguridad → Cookies y otros datos de sitios</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-white mb-2">Firefox</p>
                <p className="text-sm">Opciones → Privacidad y seguridad → Cookies y datos del sitio</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-white mb-2">Safari</p>
                <p className="text-sm">Preferencias → Privacidad → Administrar datos de sitios web</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-white mb-2">Edge</p>
                <p className="text-sm">Configuración → Cookies y permisos del sitio → Cookies y datos almacenados</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">Herramientas de Exclusión</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">Google Analytics Opt-out</a></li>
              <li><a href="https://www.facebook.com/settings?tab=ads" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">Facebook Ad Preferences</a></li>
              <li><a href="http://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">Your Online Choices</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-4">Consecuencias de Deshabilitar Cookies</h2>
            <p className="mb-4">
              Si deshabilita ciertas cookies, algunas funciones del sitio pueden no funcionar correctamente:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>No podrá mantener productos en su carrito entre sesiones</li>
              <li>Tendrá que iniciar sesión cada vez que visite el sitio</li>
              <li>Sus preferencias no se guardarán</li>
              <li>Es posible que algunas páginas no se carguen correctamente</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-4">Actualizaciones de esta Política</h2>
            <p>
              Podemos actualizar esta Política de Cookies ocasionalmente para reflejar cambios en 
              las cookies que utilizamos o por razones operativas, legales o reglamentarias. 
              Revise esta página periódicamente para mantenerse informado.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-4">Más Información</h2>
            <p className="mb-4">
              Para obtener más información sobre cómo protegemos su privacidad, consulte nuestra 
              <a href="/privacidad" className="text-white hover:underline ml-1">Política de Privacidad</a>.
            </p>
            <p>
              Si tiene preguntas sobre el uso de cookies, contáctenos en:
            </p>
            <div className="mt-4 space-y-2 ml-4">
              <p>📧 Email: <a href="mailto:privacidad@crowrepuestos.com" className="text-white hover:underline">privacidad@crowrepuestos.com</a></p>
              <p>📞 Teléfono: <a href="tel:+542611234567" className="text-white hover:underline">+54 261 123-4567</a></p>
            </div>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-center text-gray-500">
          <p>Esta política fue actualizada por última vez el 7 de noviembre de 2025</p>
        </div>
        </div>
      </div>
    </main>
  )
}
