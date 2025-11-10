export const metadata = {
  title: 'Política de Privacidad | CrowRepuestos',
  description: 'Política de privacidad y protección de datos de CrowRepuestos'
}

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-950 text-white py-20 px-4 relative overflow-hidden">
      {/* Efectos visuales de fondo */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
          <h1 className="text-5xl font-black mb-8 bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent">
            Política de Privacidad
          </h1>
          <p className="text-gray-400 mb-12">Última actualización: Noviembre 2025</p>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-3xl font-bold text-white mb-4">1. Introducción</h2>
            <p>
              En CrowRepuestos, valoramos y respetamos su privacidad. Esta Política de Privacidad describe 
              cómo recopilamos, utilizamos, almacenamos y protegemos su información personal cuando utiliza 
              nuestro sitio web y servicios.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-4">2. Información que Recopilamos</h2>
            <p className="mb-4">Recopilamos diferentes tipos de información:</p>
            
            <h3 className="text-xl font-semibold text-white mt-6 mb-3">Información Personal</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Nombre completo</li>
              <li>Dirección de correo electrónico</li>
              <li>Número de teléfono</li>
              <li>Dirección de envío y facturación</li>
              <li>Información de pago (procesada de forma segura)</li>
              <li>Información fiscal (CUIT/CUIL para facturas)</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">Información Técnica</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Dirección IP</li>
              <li>Tipo de navegador y versión</li>
              <li>Sistema operativo</li>
              <li>Páginas visitadas y tiempo de permanencia</li>
              <li>Fuente de referencia</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-4">3. Cómo Utilizamos su Información</h2>
            <p className="mb-4">Utilizamos su información para:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Procesar y gestionar sus pedidos</li>
              <li>Comunicarnos con usted sobre sus compras</li>
              <li>Mejorar nuestros productos y servicios</li>
              <li>Personalizar su experiencia en el sitio</li>
              <li>Enviar boletines y ofertas promocionales (con su consentimiento)</li>
              <li>Prevenir fraudes y garantizar la seguridad</li>
              <li>Cumplir con obligaciones legales y fiscales</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-4">4. Base Legal para el Procesamiento</h2>
            <p className="mb-4">
              Procesamos su información personal bajo las siguientes bases legales:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Ejecución de contrato:</strong> Para procesar sus pedidos y entregas</li>
              <li><strong>Consentimiento:</strong> Para marketing y comunicaciones promocionales</li>
              <li><strong>Interés legítimo:</strong> Para mejorar nuestros servicios y prevenir fraudes</li>
              <li><strong>Obligación legal:</strong> Para cumplir con requisitos fiscales y legales</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-4">5. Compartir Información</h2>
            <p className="mb-4">
              Podemos compartir su información con terceros en las siguientes circunstancias:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Proveedores de servicios:</strong> Empresas de envío, procesadores de pagos, proveedores de hosting</li>
              <li><strong>Cumplimiento legal:</strong> Cuando sea requerido por ley o para proteger nuestros derechos</li>
              <li><strong>Transferencias comerciales:</strong> En caso de fusión, adquisición o venta de activos</li>
            </ul>
            <p className="mt-4">
              <strong>Nunca vendemos su información personal a terceros con fines de marketing.</strong>
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-4">6. Cookies y Tecnologías Similares</h2>
            <p className="mb-4">
              Utilizamos cookies y tecnologías similares para:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Recordar sus preferencias y configuraciones</li>
              <li>Mantener su sesión activa</li>
              <li>Analizar el tráfico y el comportamiento del usuario</li>
              <li>Mejorar la funcionalidad del sitio</li>
            </ul>
            <p className="mt-4">
              Puede controlar el uso de cookies a través de la configuración de su navegador. 
              Para más información, consulte nuestra <a href="/cookies" className="text-white hover:underline">Política de Cookies</a>.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-4">7. Seguridad de los Datos</h2>
            <p className="mb-4">
              Implementamos medidas de seguridad técnicas y organizativas para proteger su información:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Encriptación SSL/TLS para transmisión de datos</li>
              <li>Almacenamiento seguro de datos con cifrado</li>
              <li>Acceso restringido a información personal</li>
              <li>Auditorías de seguridad regulares</li>
              <li>Capacitación del personal en protección de datos</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-4">8. Retención de Datos</h2>
            <p>
              Conservamos su información personal solo durante el tiempo necesario para cumplir con 
              los propósitos descritos en esta política, salvo que la ley requiera o permita un período 
              de retención más largo. Los datos de transacciones se conservan según los requisitos 
              fiscales argentinos (mínimo 10 años).
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-4">9. Sus Derechos</h2>
            <p className="mb-4">
              De acuerdo con la Ley de Protección de Datos Personales de Argentina (Ley 25.326), 
              usted tiene derecho a:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Acceso:</strong> Solicitar una copia de sus datos personales</li>
              <li><strong>Rectificación:</strong> Corregir datos inexactos o incompletos</li>
              <li><strong>Supresión:</strong> Solicitar la eliminación de sus datos</li>
              <li><strong>Oposición:</strong> Oponerse al procesamiento de sus datos</li>
              <li><strong>Portabilidad:</strong> Recibir sus datos en un formato estructurado</li>
              <li><strong>Retirar consentimiento:</strong> Revocar el consentimiento en cualquier momento</li>
            </ul>
            <p className="mt-4">
              Para ejercer estos derechos, contáctenos en <a href="mailto:privacidad@crowrepuestos.com" className="text-white hover:underline">privacidad@crowrepuestos.com</a>
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-4">10. Menores de Edad</h2>
            <p>
              Nuestro sitio web no está dirigido a menores de 18 años. No recopilamos intencionalmente 
              información personal de menores. Si descubrimos que hemos recopilado datos de un menor, 
              tomaremos medidas para eliminarlos inmediatamente.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-4">11. Transferencias Internacionales</h2>
            <p>
              Sus datos pueden ser transferidos y procesados en servidores ubicados fuera de Argentina. 
              Nos aseguramos de que estas transferencias cumplan con las leyes de protección de datos 
              aplicables y que sus datos estén adecuadamente protegidos.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-4">12. Modificaciones a esta Política</h2>
            <p>
              Podemos actualizar esta Política de Privacidad periódicamente. Le notificaremos sobre 
              cambios significativos publicando la nueva política en nuestro sitio web y actualizando 
              la fecha de &quot;Última actualización&quot; en la parte superior.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-4">13. Contacto</h2>
            <p className="mb-4">
              Para preguntas o inquietudes sobre esta Política de Privacidad:
            </p>
            <div className="space-y-2 ml-4">
              <p><strong>Responsable de Datos:</strong> CrowRepuestos</p>
              <p>📧 Email: <a href="mailto:privacidad@crowrepuestos.com" className="text-white hover:underline">privacidad@crowrepuestos.com</a></p>
              <p>📞 Teléfono: <a href="tel:+542611234567" className="text-white hover:underline">+54 261 123-4567</a></p>
              <p>📍 Dirección: Av. San Martín 1234, Mendoza, Argentina</p>
            </div>
            <p className="mt-4">
              También puede presentar una queja ante la Agencia de Acceso a la Información Pública (AAIP), 
              la autoridad de protección de datos de Argentina.
            </p>
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
