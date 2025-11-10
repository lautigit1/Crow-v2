export const metadata = {
  title: 'Términos y Condiciones | CrowRepuestos',
  description: 'Términos y condiciones de uso de CrowRepuestos'
}

export default function TerminosPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-950 text-white py-20 px-4 relative overflow-hidden">
      {/* Efectos visuales de fondo */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
          <h1 className="text-5xl font-black mb-8 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
            Términos y Condiciones
          </h1>
          <p className="text-gray-400 mb-12">Última actualización: Noviembre 2025</p>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-3xl font-bold text-white mb-4">1. Aceptación de los Términos</h2>
            <p>
              Al acceder y utilizar el sitio web de CrowRepuestos, usted acepta estar sujeto a estos 
              términos y condiciones de uso. Si no está de acuerdo con alguna parte de estos términos, 
              no debe utilizar nuestro sitio web.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-4">2. Uso del Sitio</h2>
            <p className="mb-4">
              Nuestro sitio web está destinado únicamente para uso comercial y profesional. Al utilizar 
              este sitio, usted garantiza que:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Tiene al menos 18 años de edad</li>
              <li>Posee autoridad legal para crear obligaciones vinculantes</li>
              <li>Utilizará el sitio de conformidad con todas las leyes aplicables</li>
              <li>No utilizará el sitio para fines fraudulentos o ilegales</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-4">3. Productos y Precios</h2>
            <p className="mb-4">
              Nos esforzamos por garantizar que toda la información del producto sea precisa. Sin embargo:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Los precios están sujetos a cambios sin previo aviso</li>
              <li>Las imágenes son referenciales y pueden diferir del producto real</li>
              <li>Nos reservamos el derecho de modificar o discontinuar productos</li>
              <li>La disponibilidad está sujeta a existencias</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-4">4. Pedidos y Pagos</h2>
            <p className="mb-4">
              Al realizar un pedido en nuestro sitio:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Usted se compromete a pagar el precio total del pedido</li>
              <li>Nos reservamos el derecho de rechazar o cancelar pedidos</li>
              <li>Los métodos de pago aceptados se especifican en el proceso de compra</li>
              <li>Se requiere verificación de identidad para pedidos de alto valor</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-4">5. Envíos y Entregas</h2>
            <p>
              Los tiempos de entrega son estimados y pueden variar según la ubicación y disponibilidad. 
              CrowRepuestos no se hace responsable por retrasos causados por circunstancias fuera de 
              nuestro control, incluyendo pero no limitado a desastres naturales, huelgas o problemas 
              con transportistas.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-4">6. Devoluciones y Garantías</h2>
            <p className="mb-4">
              Aceptamos devoluciones bajo las siguientes condiciones:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>El producto debe estar en su embalaje original y sin usar</li>
              <li>La solicitud debe realizarse dentro de los 30 días posteriores a la compra</li>
              <li>Se requiere comprobante de compra</li>
              <li>Los productos defectuosos están cubiertos por la garantía del fabricante</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-4">7. Propiedad Intelectual</h2>
            <p>
              Todo el contenido de este sitio web, incluyendo textos, gráficos, logos, imágenes y 
              software, es propiedad de CrowRepuestos y está protegido por las leyes de propiedad 
              intelectual. Está prohibida la reproducción sin autorización expresa.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-4">8. Limitación de Responsabilidad</h2>
            <p>
              CrowRepuestos no será responsable por daños indirectos, incidentales, especiales o 
              consecuentes que resulten del uso o la imposibilidad de usar nuestros productos o 
              servicios, incluso si hemos sido advertidos de la posibilidad de tales daños.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-4">9. Modificaciones</h2>
            <p>
              Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. 
              Las modificaciones entrarán en vigencia inmediatamente después de su publicación en el 
              sitio web. Es su responsabilidad revisar periódicamente estos términos.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-4">10. Ley Aplicable</h2>
            <p>
              Estos términos y condiciones se regirán e interpretarán de acuerdo con las leyes de la 
              República Argentina. Cualquier disputa será sometida a la jurisdicción exclusiva de los 
              tribunales de Mendoza, Argentina.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-4">11. Contacto</h2>
            <p>
              Si tiene preguntas sobre estos términos y condiciones, puede contactarnos en:
            </p>
            <div className="mt-4 space-y-2 ml-4">
              <p>📧 Email: <a href="mailto:legal@crowrepuestos.com" className="text-white hover:underline">legal@crowrepuestos.com</a></p>
              <p>📞 Teléfono: <a href="tel:+542611234567" className="text-white hover:underline">+54 261 123-4567</a></p>
              <p>📍 Dirección: Av. San Martín 1234, Mendoza, Argentina</p>
            </div>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-center text-gray-500">
          <p>Estos términos fueron actualizados por última vez el 7 de noviembre de 2025</p>
        </div>
        </div>
      </div>
    </main>
  )
}
