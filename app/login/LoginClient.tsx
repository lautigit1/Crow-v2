'use client';

import React, { useState } from 'react';
import { useAuthStore } from '../stores/useAuthStore';
import { useSearchParams, useRouter } from 'next/navigation';
import Input from '../components/ui/Input';

export default function LoginClient() {
  const login = useAuthStore((state) => state.login);
  const sp = useSearchParams();
  const router = useRouter();
  const redirect = sp.get('redirect') || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await login(email, password);
    router.push(redirect);
  };

  return (
    <main className="min-h-screen text-white bg-gradient-to-b from-[#0b1020] via-[#0a0f1a] to-black pt-28 pb-16">
      <div className="container mx-auto px-4 max-w-md">
        <form onSubmit={onSubmit} className="bg-[#0f172a]/60 border border-white/10 rounded-2xl p-6 space-y-4">
          <h1 className="text-2xl font-extrabold">Iniciar sesión</h1>
          <Input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
          <Input type="password" placeholder="Contraseña" value={password} onChange={(e)=>setPassword(e.target.value)} required />
          <button disabled={loading} className="w-full px-4 py-2 rounded-lg bg-azul-electrico text-black font-bold disabled:opacity-60" type="submit">{loading? 'Ingresando…' : 'Ingresar'}</button>
        </form>
      </div>
    </main>
  );
}
