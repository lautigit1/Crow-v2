import React, { Suspense } from 'react';
import LoginClient from './LoginClient';

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-28 text-white flex items-center justify-center">Cargando…</div>}>
      <LoginClient />
    </Suspense>
  );
}
