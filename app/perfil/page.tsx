import React, { Suspense } from 'react';
import ProfileClient from './ProfileClient';

export default function ProfilePage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-28 text-white flex items-center justify-center">Cargando perfil…</div>}>
      <ProfileClient />
    </Suspense>
  );
}
