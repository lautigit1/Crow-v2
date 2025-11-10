export const metadata = {
  title: 'Envíos y Devoluciones | CrowRepuestos',
  description: 'Información sobre envíos, entregas y devoluciones de CrowRepuestos'
}

export default function EnviosPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-950 text-white py-20 px-4 relative overflow-hidden">
      {/* Efectos visuales de fondo */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
          <h1 className="text-5xl font-black mb-8 bg-gradient-to-r from-white via-indigo-100 to-white bg-clip-text text-transparent">
            Envíos y Devoluciones
          </h1>
          <p className="text-gray-400 mb-12">Toda la información sobre entregas y devoluciones</p>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          
          {/* ENVÍOS */}
          <div className="bg-gradient-to-br from-zinc-900/90 to-black/90 border border-white/10 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-6">📦 Envíos</h2>
            
            <section className="mb-8">
              <h3 className="text-2xl font-semibold text-white mb-4">Cobertura</h3>
              <p className="mb-4">
                Realizamos envíos a todo el territorio argentino a través de nuestros socios logísticos:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Andreani</li>
                <li>OCA</li>
                <li>Correo Argentino</li>
                <li>Transporte propio (Mendoza y zona)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-semibold text-white mb-4">Tiempos de Entrega</h3>
              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="font-semibold text-white">Gran Mendoza</p>
                  <p className="text-sm mt-1">24-48 horas hábiles</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="font-semibold text-white">Provincia de Mendoza</p>
                  <p className="text-sm mt-1">2-4 días hábiles</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="font-semibold text-white">CABA y GBA</p>
                  <p className="text-sm mt-1">3-5 días hábiles</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="font-semibold text-white">Resto del País</p>
                  <p className="text-sm mt-1">5-10 días hábiles</p>
                </div>
              </div>
              <p className="text-sm text-gray-400 mt-4">
                * Los tiempos son estimados y pueden variar según disponibilidad y zona.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-semibold text-white mb-4">Costos de Envío</h3>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold text-white mb-2">Envío Estándar</p>
                    <p>Calculado según peso y destino</p>
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-2">Envío Express</p>
                    <p>Consultar en el checkout</p>
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-2">🎁 Envío GRATIS</p>
                    <p>En compras superiores a $100,000</p>
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-2">Retiro en Local</p>
                    <p className="text-emerald-400">Siempre GRATIS</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-semibold text-white mb-4">Seguimiento de Pedidos</h3>
              <p className="mb-4">
                Una vez despachado su pedido, recibirá:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Email con número de seguimiento</li>
                <li>SMS con link de rastreo</li>
                <li>Actualizaciones en tiempo real en su cuenta</li>
              </ul>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-white mb-4">Retiro en Local</h3>
              <p className="mb-4">
                Puede retirar su pedido sin costo en nuestro local:
              </p>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <p className="font-semibold text-white mb-3">📍 Dirección</p>
                <p>Av. San Martín 1234, Mendoza Capital</p>
                <p className="mt-4 font-semibold text-white mb-3">🕐 Horarios</p>
                <p>Lunes a Viernes: 8:00 - 18:00</p>
                <p>Sábados: 9:00 - 13:00</p>
                <p className="mt-4 text-sm text-gray-400">
                  * Su pedido estará listo para retiro en 2-24 horas según disponibilidad
                </p>
              </div>
            </section>
          </div>

          {/* DEVOLUCIONES */}
          <div className="bg-gradient-to-br from-zinc-900/90 to-black/90 border border-white/10 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-6">🔄 Devoluciones y Cambios</h2>
            
            <section className="mb-8">
              <h3 className="text-2xl font-semibold text-white mb-4">Política de Devoluciones</h3>
              <p className="mb-4">
                Aceptamos devoluciones dentro de los <strong className="text-white">30 días</strong> posteriores 
                a la recepción del producto bajo las siguientes condiciones:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>El producto debe estar sin usar y en su embalaje original</li>
                <li>Debe incluir todos los accesorios y documentación</li>
                <li>No debe presentar signos de instalación o uso</li>
                <li>Debe contar con el comprobante de compra</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-semibold text-white mb-4">Productos No Retornables</h3>
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6">
                <p className="mb-3 font-semibold text-amber-400">Los siguientes productos NO pueden devolverse:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Productos bajo pedido o personalizados</li>
                  <li>Líquidos y lubricantes (salvo defecto de fábrica)</li>
                  <li>Productos eléctricos con sellos rotos</li>
                  <li>Kits de reparación abiertos</li>
                  <li>Productos en liquidación o clearance</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-semibold text-white mb-4">Cómo Realizar una Devolución</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-white text-black rounded-full flex items-center justify-center font-bold">1</div>
                  <div>
                    <p className="font-semibold text-white mb-1">Contactar Atención al Cliente</p>
                    <p className="text-sm">Envíe un email a devoluciones@crowrepuestos.com con su número de pedido</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-white text-black rounded-full flex items-center justify-center font-bold">2</div>
                  <div>
                    <p className="font-semibold text-white mb-1">Autorización de Devolución</p>
                    <p className="text-sm">Recibirá un código RMA (Return Merchandise Authorization)</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-white text-black rounded-full flex items-center justify-center font-bold">3</div>
                  <div>
                    <p className="font-semibold text-white mb-1">Enviar el Producto</p>
                    <p className="text-sm">Embale el producto correctamente e incluya el código RMA</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-white text-black rounded-full flex items-center justify-center font-bold">4</div>
                  <div>
                    <p className="font-semibold text-white mb-1">Inspección y Reembolso</p>
                    <p className="text-sm">Una vez recibido, procesaremos su reembolso en 5-7 días hábiles</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-semibold text-white mb-4">Cambios por Talla o Modelo</h3>
              <p className="mb-4">
                Si necesita cambiar un producto por otro:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Debe estar dentro del período de 30 días</li>
                <li>El nuevo producto debe tener el mismo valor o superior</li>
                <li>Las diferencias de precio se cobrarán/reembolsarán según corresponda</li>
                <li>El cambio está sujeto a disponibilidad de stock</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-semibold text-white mb-4">Costos de Devolución</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
                  <p className="font-semibold text-emerald-400 mb-2">Producto Defectuoso</p>
                  <p className="text-sm">Corremos con todos los gastos de envío</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="font-semibold text-white mb-2">Arrepentimiento</p>
                  <p className="text-sm">Los gastos de envío corren por cuenta del cliente</p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-white mb-4">Reembolsos</h3>
              <p className="mb-4">
                Los reembolsos se procesarán mediante el mismo método de pago utilizado en la compra:
              </p>
              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="font-semibold text-white">Tarjeta de Crédito/Débito</p>
                  <p className="text-sm mt-1">7-14 días hábiles (según entidad bancaria)</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="font-semibold text-white">Transferencia Bancaria</p>
                  <p className="text-sm mt-1">3-5 días hábiles</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="font-semibold text-white">Crédito en Tienda</p>
                  <p className="text-sm mt-1">Inmediato (válido por 12 meses)</p>
                </div>
              </div>
            </section>
          </div>

          {/* CONTACTO */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">¿Necesita Ayuda?</h2>
            <p className="mb-6">
              Nuestro equipo está disponible para asistirle con cualquier consulta sobre envíos o devoluciones:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  📧
                </div>
                <p className="font-semibold text-white mb-1">Email</p>
                <a href="mailto:envios@crowrepuestos.com" className="text-sm hover:text-white transition-colors">
                  envios@crowrepuestos.com
                </a>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  📞
                </div>
                <p className="font-semibold text-white mb-1">Teléfono</p>
                <a href="tel:+542611234567" className="text-sm hover:text-white transition-colors">
                  +54 261 123-4567
                </a>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  💬
                </div>
                <p className="font-semibold text-white mb-1">WhatsApp</p>
                <a href="https://wa.me/542611234567" className="text-sm hover:text-white transition-colors">
                  Chatear ahora
                </a>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-center text-gray-500">
          <p>Información actualizada el 7 de noviembre de 2025</p>
        </div>
        </div>
      </div>
    </main>
  )
}
