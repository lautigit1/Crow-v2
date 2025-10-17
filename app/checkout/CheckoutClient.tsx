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
    await new Promise((r) => setTimeout(r, 1200));
    const orderId = 'ord_' + Math.random().toString(36).slice(2, 10);
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
  };

  if (!user) return null;

  return (
    <main className="min-h-screen text-white bg-gradient-to-b from-[#0b1020] via-[#0a0f1a] to-black pt-28 pb-16">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Columna principal */}
        <div className="lg:col-span-2 space-y-8">
          {/* Stepper */}
          <div className="flex items-center gap-4 text-sm">
            {[1,2,3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold ${step >= s ? 'bg-azul-electrico text-black' : 'bg-zinc-700 text-gray-300'}`}>{s}</div>
                {s < 3 && <div className={`w-12 h-[2px] ${step > s ? 'bg-azul-electrico' : 'bg-zinc-700'}`} />}
              </div>
            ))}
          </div>

          {/* Paso 1 */}
          {step === 1 && (
            <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0f172a]/60 border border-white/10 rounded-2xl p-6 space-y-6">
              <h2 className="text-xl font-bold">Información de contacto y envío</h2>
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
                <button className="px-5 py-2 rounded-lg bg-azul-electrico text-black font-bold disabled:opacity-50" disabled={!canContinueStep1} onClick={()=>setStep(2)}>Continuar</button>
              </div>
            </motion.section>
          )}

          {/* Paso 2 */}
          {step === 2 && (
            <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0f172a]/60 border border-white/10 rounded-2xl p-6 space-y-6">
              <h2 className="text-xl font-bold">Método de envío</h2>
              <div className="space-y-3">
                {SHIPPING_OPTIONS.map(opt => (
                  <label key={opt.code} className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer ${shipping.code===opt.code? 'border-azul-electrico bg-azul-electrico/10' : 'border-white/10 hover:bg-white/5'}`}>
                    <div className="flex items-center gap-3">
                      <input type="radio" checked={shipping.code===opt.code} onChange={()=>setShipping(opt)} />
                      <div>
                        <div className="font-semibold">{opt.label}</div>
                        <div className="text-sm text-gray-400">Entrega estimada: {opt.eta}</div>
                      </div>
                    </div>
                    <div className="font-bold">{opt.cost === 0 ? 'Gratis' : `$${opt.cost.toLocaleString('es-AR')}`}</div>
                  </label>
                ))}
              </div>
              <div className="flex gap-3 justify-between">
                <button className="px-5 py-2 rounded-lg bg-zinc-700 text-white" onClick={()=>setStep(1)}>Volver</button>
                <button className="px-5 py-2 rounded-lg bg-azul-electrico text-black font-bold" onClick={()=>setStep(3)}>Continuar</button>
              </div>
            </motion.section>
          )}

          {/* Paso 3 */}
          {step === 3 && (
            <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0f172a]/60 border border-white/10 rounded-2xl p-6 space-y-6">
              <h2 className="text-xl font-bold">Pago</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input className="md:col-span-2" placeholder="Número de tarjeta" value={card.number} onChange={(e)=>setCard({...card, number:e.target.value})} />
                <Input placeholder="Nombre del titular" value={card.name} onChange={(e)=>setCard({...card, name:e.target.value})} />
                <Input placeholder="MM/AA" value={card.expiry} onChange={(e)=>setCard({...card, expiry:e.target.value})} />
                <Input placeholder="CVC" value={card.cvc} onChange={(e)=>setCard({...card, cvc:e.target.value})} />
              </div>
              <div className="flex gap-3 justify-between">
                <button className="px-5 py-2 rounded-lg bg-zinc-700 text-white" onClick={()=>setStep(2)}>Volver</button>
                <button disabled={processing} className="px-5 py-2 rounded-lg bg-rojo-potente text-white font-bold disabled:opacity-50" onClick={onPay}>{processing ? 'Procesando…' : 'Pagar'}</button>
              </div>
            </motion.section>
          )}
        </div>

        {/* Resumen */}
        <aside className="bg-[#0f172a]/60 border border-white/10 rounded-2xl p-6 h-fit sticky top-28 space-y-4">
          <h3 className="text-lg font-bold">Resumen</h3>
          <ul className="divide-y divide-white/10">
            {items.map(ci => (
              <li key={ci.product.id} className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-300">{ci.product.nombre} x{ci.quantity}</span>
                <span className="font-semibold">${(ci.product.precio * ci.quantity).toLocaleString('es-AR')}</span>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between text-sm text-gray-300">
            <span>Subtotal</span>
            <span>${subtotal.toLocaleString('es-AR')}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-300">
            <span>Envío</span>
            <span>{shipping.cost === 0 ? 'Gratis' : `$${shipping.cost.toLocaleString('es-AR')}`}</span>
          </div>
          <div className="flex items-center justify-between text-lg font-extrabold">
            <span>Total</span>
            <span>${total.toLocaleString('es-AR')}</span>
          </div>
        </aside>
      </div>
    </main>
  );
}

// util tailwind simple
// Nota: estas clases pueden vivir en globals.css en el futuro si querés.
// Para mantenerlo local, usamos className input repetida.