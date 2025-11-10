'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useAuthStore } from '../stores/useAuthStore';
import { useCartStore } from '../stores/useCartStore';
import type { Address, ShippingMethod, Order } from '../types/auth';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Input from '../components/ui/Input';
import { SHIPPING_OPTIONS } from '../data/constants';

export default function CheckoutClient() {
  const { user, loading, addOrder } = useAuthStore();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const router = useRouter();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [contact, setContact] = useState({ name: '', surname: '', email: '', phone: '' });
  const [address, setAddress] = useState<Address>({ id: 'addr_checkout', fullName: '', phone: '', street: '', city: '', postalCode: '', country: 'Argentina' });
  const [shipping, setShipping] = useState<ShippingMethod>(SHIPPING_OPTIONS[0]);
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvc: '' });
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    // Require login (Epica 2). For ahora, si no hay user, lo redirigimos a /login
    if (!loading && !user) {
      router.push('/login?redirect=/checkout');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!loading && user && items.length === 0 && !processing) {
      router.push('/products');
    }
  }, [items.length, loading, user, processing, router]);

  useEffect(() => {
    if (user) {
      setContact((c) => ({ ...c, name: user.name, email: user.email }));
      if (user.defaultAddressId) {
        const def = user.addresses.find((a) => a.id === user.defaultAddressId);
        if (def) setAddress(def);
      }
    }
  }, [user]);

  const subtotal = useMemo(() => getTotalPrice(), [getTotalPrice]);
  const total = subtotal + shipping.cost;

  const canContinueStep1 = contact.name && contact.email && address.street && address.city && address.postalCode;

  const onPay = async () => {
    setProcessing(true);
    try {
      // Call backend to create the order
      const { createOrder } = await import('../lib/orders-api');
      const result = await createOrder({
        items: items.map((ci) => ({ productId: ci.product.id, qty: ci.quantity })),
      });
      const orderId = result.orderId;
      // Build local Order structure for context (can be removed if we fetch from backend)
      const order: Order = {
        id: orderId,
        date: new Date().toISOString(),
        items: items.map((ci) => ({ productId: ci.product.id, nombre: ci.product.nombre, imagenUrl: ci.product.imagenUrl, precio: ci.product.precio, quantity: ci.quantity })),
        subtotal,
        shipping,
        shippingAddress: address,
        total,
        status: 'paid',
      };
      addOrder(order);
      clearCart();
      router.push(`/pedido/confirmacion/${orderId}`);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'No se pudo procesar el pago';
      alert(msg);
    } finally {
      setProcessing(false);
    }
  };

  if (!user) return null;

  return (
    <main className="min-h-screen text-white bg-gradient-to-br from-zinc-900 via-black to-zinc-950 pt-28 pb-16 relative overflow-hidden">
      {/* Efectos visuales de fondo */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        {/* Columna principal */}
        <div className="lg:col-span-2 space-y-8">
          {/* Título */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-black mb-2 bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent">
              Finalizar Compra
            </h1>
            <p className="text-gray-400">Complete los datos para procesar su pedido</p>
          </motion.div>

          {/* Stepper */}
          <div className="flex items-center gap-2 text-sm">
            {[
              { num: 1, label: 'Datos' },
              { num: 2, label: 'Envío' },
              { num: 3, label: 'Pago' }
            ].map((s, idx) => (
              <React.Fragment key={s.num}>
                <div className="flex items-center gap-2">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold transition-all duration-300 ${
                    step >= s.num 
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg' 
                      : 'bg-white/5 border border-white/10 text-gray-400'
                  }`}>
                    {s.num}
                  </div>
                  <span className={`hidden md:inline ${step >= s.num ? 'text-white font-semibold' : 'text-gray-500'}`}>
                    {s.label}
                  </span>
                </div>
                {idx < 2 && <div className={`flex-1 h-[2px] transition-all duration-300 ${step > s.num ? 'bg-gradient-to-r from-emerald-600 to-teal-600' : 'bg-white/10'}`} />}
              </React.Fragment>
            ))}
          </div>

          {/* Paso 1 */}
          {step === 1 && (
            <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-600/20 to-teal-600/20 rounded-xl flex items-center justify-center border border-emerald-500/20">
                  <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold">Información de Contacto y Envío</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="Nombre" value={contact.name} onChange={(e)=>setContact({...contact, name:e.target.value})} />
                <Input placeholder="Apellido" value={contact.surname} onChange={(e)=>setContact({...contact, surname:e.target.value})} />
                <Input className="md:col-span-2" placeholder="Email" value={contact.email} onChange={(e)=>setContact({...contact, email:e.target.value})} />
                <Input className="md:col-span-2" placeholder="Teléfono" value={contact.phone} onChange={(e)=>setContact({...contact, phone:e.target.value})} />
              </div>
              <h3 className="font-semibold">Dirección de envío</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input className="md:col-span-2" placeholder="Calle y número" value={address.street} onChange={(e)=>setAddress({...address, street:e.target.value})} />
                <Input placeholder="Ciudad" value={address.city} onChange={(e)=>setAddress({...address, city:e.target.value})} />
                <Input placeholder="Código Postal" value={address.postalCode} onChange={(e)=>setAddress({...address, postalCode:e.target.value})} />
                <Input placeholder="Provincia" value={address.state || ''} onChange={(e)=>setAddress({...address, state:e.target.value})} />
                <Input placeholder="País" value={address.country} onChange={(e)=>setAddress({...address, country:e.target.value})} />
              </div>
              <div className="flex gap-3 justify-end">
                <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold disabled:opacity-50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/50 disabled:hover:scale-100" disabled={!canContinueStep1} onClick={()=>setStep(2)}>
                  Continuar
                  <svg className="w-5 h-5 inline ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </motion.section>
          )}

          {/* Paso 2 */}
          {step === 2 && (
            <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-xl flex items-center justify-center border border-blue-500/20">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold">Método de Envío</h2>
              </div>
              <div className="space-y-3">
                {SHIPPING_OPTIONS.map(opt => (
                  <label key={opt.code} className={`flex items-center justify-between p-5 rounded-xl border cursor-pointer transition-all duration-300 ${
                    shipping.code===opt.code
                      ? 'border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/20' 
                      : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'
                  }`}>
                    <div className="flex items-center gap-4">
                      <input 
                        type="radio" 
                        checked={shipping.code===opt.code} 
                        onChange={()=>setShipping(opt)}
                        className="w-5 h-5 text-emerald-600"
                      />
                      <div>
                        <div className="font-bold text-lg">{opt.label}</div>
                        <div className="text-sm text-gray-400 flex items-center gap-1 mt-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Entrega estimada: {opt.eta}
                        </div>
                      </div>
                    </div>
                    <div className={`font-black text-xl ${shipping.code===opt.code ? 'text-emerald-400' : 'text-white'}`}>
                      {opt.cost === 0 ? 'GRATIS' : `$${opt.cost.toLocaleString('es-AR')}`}
                    </div>
                  </label>
                ))}
              </div>
              <div className="flex gap-3 justify-between">
                <button className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-colors" onClick={()=>setStep(1)}>
                  <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Volver
                </button>
                <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/50" onClick={()=>setStep(3)}>
                  Continuar
                  <svg className="w-5 h-5 inline ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </motion.section>
          )}

          {/* Paso 3 */}
          {step === 3 && (
            <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-600/20 to-orange-600/20 rounded-xl flex items-center justify-center border border-amber-500/20">
                  <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold">Información de Pago</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input className="md:col-span-2" placeholder="Número de tarjeta" value={card.number} onChange={(e)=>setCard({...card, number:e.target.value})} />
                <Input placeholder="Nombre del titular" value={card.name} onChange={(e)=>setCard({...card, name:e.target.value})} />
                <Input placeholder="MM/AA" value={card.expiry} onChange={(e)=>setCard({...card, expiry:e.target.value})} />
                <Input placeholder="CVC" value={card.cvc} onChange={(e)=>setCard({...card, cvc:e.target.value})} />
              </div>
              <div className="flex gap-3 justify-between">
                <button className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-colors" onClick={()=>setStep(2)}>
                  <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Volver
                </button>
                <button disabled={processing} className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold text-lg disabled:opacity-50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-500/50 disabled:hover:scale-100 flex items-center gap-2" onClick={onPay}>
                  {processing ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Procesando...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Confirmar Pago
                    </>
                  )}
                </button>
              </div>
            </motion.section>
          )}
        </div>

        {/* Resumen */}
        <aside className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6 h-fit sticky top-28 space-y-4 shadow-2xl">
          <h3 className="text-2xl font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
            Resumen del Pedido
          </h3>
          <div className="max-h-64 overflow-y-auto custom-scrollbar">
            <ul className="divide-y divide-white/10">
              {items.map(ci => (
                <li key={ci.product.id} className="flex items-center justify-between py-3 gap-3">
                  <div className="flex-1 min-w-0">
                    <span className="text-sm text-gray-300 block truncate">{ci.product.nombre}</span>
                    <span className="text-xs text-gray-500">x{ci.quantity}</span>
                  </div>
                  <span className="font-bold text-white whitespace-nowrap">${(ci.product.precio * ci.quantity).toLocaleString('es-AR')}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="pt-4 border-t border-white/10 space-y-3">
            <div className="flex items-center justify-between text-gray-300">
              <span>Subtotal</span>
              <span className="font-semibold">${subtotal.toLocaleString('es-AR')}</span>
            </div>
            <div className="flex items-center justify-between text-gray-300">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                Envío
              </span>
              <span className={`font-semibold ${shipping.cost === 0 ? 'text-emerald-400' : ''}`}>
                {shipping.cost === 0 ? 'GRATIS' : `$${shipping.cost.toLocaleString('es-AR')}`}
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10">
            <div className="flex items-center justify-between text-2xl font-black">
              <span>Total</span>
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                ${total.toLocaleString('es-AR')}
              </span>
            </div>
          </div>

          {/* Seguridad */}
          <div className="pt-4 border-t border-white/10">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Pago seguro y encriptado</span>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}

// util tailwind simple
// Nota: estas clases pueden vivir en globals.css en el futuro si querés.
// Para mantenerlo local, usamos className input repetida.