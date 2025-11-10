export const metadata = {
  title: 'Garantías | CrowRepuestos',
  description: 'Información sobre garantías de productos en CrowRepuestos'
}

export default function GarantiasPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-950 text-white py-20 px-4 relative overflow-hidden">
      {/* Efectos visuales de fondo */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
          <h1 className="text-5xl font-black mb-8 bg-gradient-to-r from-white via-rose-100 to-white bg-clip-text text-transparent">
            Garantías
          </h1>
          <p className="text-gray-400 mb-12">Protección y tranquilidad en cada compra</p>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          
          <section className="bg-gradient-to-br from-zinc-900/90 to-black/90 border border-white/10 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-6">🛡️ Nuestra Garantía</h2>
            <p className="mb-6 text-lg">
              En CrowRepuestos respaldamos la calidad de todos nuestros productos. Trabajamos exclusivamente 
              con marcas reconocidas y ofrecemos garantías que cubren defectos de fabricación.
            </p>
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6">
              <p className="font-bold text-emerald-400 text-xl mb-2">✓ 100% Productos Originales</p>
              <p>Garantizamos la autenticidad de todos nuestros repuestos</p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-6">Períodos de Garantía</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="text-4xl mb-3">⚙️</div>
                <h3 className="font-bold text-white text-xl mb-2">Piezas de Motor</h3>
                <p className="text-2xl font-black text-white mb-2">12 meses</p>
                <p className="text-sm">O 20,000 km (lo que ocurra primero)</p>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="text-4xl mb-3">🔧</div>
                <h3 className="font-bold text-white text-xl mb-2">Sistema de Frenos</h3>
                <p className="text-2xl font-black text-white mb-2">12 meses</p>
                <p className="text-sm">O 15,000 km (lo que ocurra primero)</p>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="text-4xl mb-3">⚡</div>
                <h3 className="font-bold text-white text-xl mb-2">Sistema Eléctrico</h3>
                <p className="text-2xl font-black text-white mb-2">6 meses</p>
                <p className="text-sm">Contra defectos de fabricación</p>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="text-4xl mb-3">🔩</div>
                <h3 className="font-bold text-white text-xl mb-2">Suspensión</h3>
                <p className="text-2xl font-black text-white mb-2">12 meses</p>
                <p className="text-sm">O 25,000 km (lo que ocurra primero)</p>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="text-4xl mb-3">💧</div>
                <h3 className="font-bold text-white text-xl mb-2">Filtros y Lubricantes</h3>
                <p className="text-2xl font-black text-white mb-2">3 meses</p>
                <p className="text-sm">Solo defectos de fabricación</p>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="font-bold text-white text-xl mb-2">Otros Repuestos</h3>
                <p className="text-2xl font-black text-white mb-2">6 meses</p>
                <p className="text-sm">Según especificación del producto</p>
              </div>
            </div>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Qué Cubre la Garantía</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="text-2xl">✓</div>
                <div>
                  <p className="font-semibold text-white mb-1">Defectos de Fabricación</p>
                  <p className="text-sm">Fallas en materiales o proceso de manufactura</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-2xl">✓</div>
                <div>
                  <p className="font-semibold text-white mb-1">Fallas Funcionales</p>
                  <p className="text-sm">Cuando el producto no cumple su función específica</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-2xl">✓</div>
                <div>
                  <p className="font-semibold text-white mb-1">Reemplazo o Reparación</p>
                  <p className="text-sm">A criterio de CrowRepuestos según disponibilidad</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-2xl">✓</div>
                <div>
                  <p className="font-semibold text-white mb-1">Mano de Obra Incluida</p>
                  <p className="text-sm">Para productos que requieran reparación en taller autorizado</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-red-500/10 border border-red-500/30 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Qué NO Cubre la Garantía</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="text-2xl">✗</div>
                <div>
                  <p className="font-semibold text-white mb-1">Desgaste Normal</p>
                  <p className="text-sm">Deterioro por uso regular del producto</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-2xl">✗</div>
                <div>
                  <p className="font-semibold text-white mb-1">Instalación Incorrecta</p>
                  <p className="text-sm">Daños causados por montaje inadecuado</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-2xl">✗</div>
                <div>
                  <p className="font-semibold text-white mb-1">Uso Indebido</p>
                  <p className="text-sm">Utilización fuera de especificaciones técnicas</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-2xl">✗</div>
                <div>
                  <p className="font-semibold text-white mb-1">Modificaciones</p>
                  <p className="text-sm">Alteraciones o reparaciones no autorizadas</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-2xl">✗</div>
                <div>
                  <p className="font-semibold text-white mb-1">Accidentes o Negligencia</p>
                  <p className="text-sm">Daños por colisiones, golpes o mal mantenimiento</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-2xl">✗</div>
                <div>
                  <p className="font-semibold text-white mb-1">Productos de Desgaste</p>
                  <p className="text-sm">Pastillas de freno, embragues, neumáticos (salvo defecto)</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-br from-zinc-900/90 to-black/90 border border-white/10 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Cómo Hacer Válida su Garantía</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white text-black rounded-full flex items-center justify-center font-bold text-xl">1</div>
                <div>
                  <p className="font-semibold text-white text-lg mb-2">Conserve su Comprobante</p>
                  <p>Guarde la factura o ticket de compra. Es indispensable para cualquier reclamo de garantía.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white text-black rounded-full flex items-center justify-center font-bold text-xl">2</div>
                <div>
                  <p className="font-semibold text-white text-lg mb-2">Contacte Atención al Cliente</p>
                  <p>Envíe un email a <a href="mailto:garantias@crowrepuestos.com" className="text-white hover:underline">garantias@crowrepuestos.com</a> con:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1 ml-4 text-sm">
                    <li>Número de orden o factura</li>
                    <li>Fotos del producto y el defecto</li>
                    <li>Descripción detallada del problema</li>
                    <li>Kilometraje actual (si aplica)</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white text-black rounded-full flex items-center justify-center font-bold text-xl">3</div>
                <div>
                  <p className="font-semibold text-white text-lg mb-2">Evaluación Técnica</p>
                  <p>Nuestro equipo técnico evaluará su caso en 24-48 horas hábiles y le informará sobre los próximos pasos.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white text-black rounded-full flex items-center justify-center font-bold text-xl">4</div>
                <div>
                  <p className="font-semibold text-white text-lg mb-2">Resolución</p>
                  <p>Según el caso, procederemos a:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1 ml-4 text-sm">
                    <li>Reemplazo del producto</li>
                    <li>Reparación en taller autorizado</li>
                    <li>Reembolso (si no hay stock disponible)</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-6">Garantía Extendida</h2>
            <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-2xl p-8">
              <div className="flex items-start gap-6">
                <div className="text-6xl">🌟</div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">Protección Premium</h3>
                  <p className="mb-4">
                    Extienda la garantía de sus productos hasta <strong className="text-white">24 meses</strong> con 
                    nuestra Protección Premium. Disponible al momento de la compra.
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 mb-6">
                    <li>Cobertura extendida por 12 meses adicionales</li>
                    <li>Atención prioritaria</li>
                    <li>Reemplazo express sin esperas</li>
                    <li>Cobertura contra daños accidentales*</li>
                  </ul>
                  <p className="text-sm text-gray-400">
                    * Sujeto a términos y condiciones específicos del plan Premium
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Preguntas Frecuentes</h2>
            
            <div className="space-y-6">
              <div>
                <p className="font-semibold text-white mb-2">¿Qué debo hacer si pierdo mi factura?</p>
                <p className="text-sm">
                  Contáctenos con su número de orden o email de confirmación. Podemos recuperar su 
                  comprobante de nuestro sistema.
                </p>
              </div>
              
              <div>
                <p className="font-semibold text-white mb-2">¿Puedo usar la garantía si instalé el repuesto yo mismo?</p>
                <p className="text-sm">
                  Sí, siempre que la instalación se haya realizado correctamente según las especificaciones 
                  del fabricante. Recomendamos instalación profesional para garantizar óptimo funcionamiento.
                </p>
              </div>
              
              <div>
                <p className="font-semibold text-white mb-2">¿Cubre la garantía los gastos de envío?</p>
                <p className="text-sm">
                  Sí, si el producto está cubierto por garantía, corremos con todos los gastos de envío 
                  para devolución y reenvío del producto reparado/reemplazado.
                </p>
              </div>
              
              <div>
                <p className="font-semibold text-white mb-2">¿Qué sucede si el producto está discontinuado?</p>
                <p className="text-sm">
                  Ofreceremos un reemplazo equivalente de igual o superior calidad, o un reembolso completo 
                  a elección del cliente.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-br from-zinc-900/90 to-black/90 border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">¿Necesita Asistencia?</h2>
            <p className="mb-6">
              Nuestro equipo de garantías está disponible para ayudarle:
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-3">
                  📧
                </div>
                <p className="font-semibold text-white mb-1">Email</p>
                <a href="mailto:garantias@crowrepuestos.com" className="text-sm hover:text-white transition-colors">
                  garantias@crowrepuestos.com
                </a>
              </div>
              <div>
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-3">
                  📞
                </div>
                <p className="font-semibold text-white mb-1">Teléfono</p>
                <a href="tel:+542611234567" className="text-sm hover:text-white transition-colors">
                  +54 261 123-4567
                </a>
                <p className="text-xs text-gray-400 mt-1">Lun-Vie 9:00-17:00</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-3">
                  💬
                </div>
                <p className="font-semibold text-white mb-1">WhatsApp</p>
                <a href="https://wa.me/542611234567" className="text-sm hover:text-white transition-colors">
                  Chat directo
                </a>
                <p className="text-xs text-gray-400 mt-1">Respuesta inmediata</p>
              </div>
            </div>
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
