// app/ClientLayout.tsx
'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useCartStore } from './stores/useCartStore';
import { useAuthInit } from './hooks/useAuthInit';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CartDrawer from './components/cart/CartDrawer';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  useAuthInit(); // Inicializar auth store
  const { isOpen: isCartOpen, closeCart } = useCartStore();
  const pathname = usePathname();
  
  // Check if we're in the admin section
  const isAdminRoute = pathname?.startsWith('/admin');

  // Lock scroll and enforce black background while cart is open to avoid edge artifacts
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const body = document.body;
    if (isCartOpen) {
      body.classList.add('overflow-hidden');
      body.style.backgroundColor = '#000';
    } else {
      body.classList.remove('overflow-hidden');
      body.style.backgroundColor = '';
    }
    return () => {
      body.classList.remove('overflow-hidden');
      body.style.backgroundColor = '';
    };
  }, [isCartOpen]);

  // If it's an admin route, render only the children (admin layout will handle its own structure)
  if (isAdminRoute) {
    return <>{children}</>;
  }

  // For non-admin routes, render the normal layout with navbar and footer
  return (
    <>
      <Navbar />
      <div 
        className={`transition-all duration-300 ease-in-out ${
          isCartOpen ? 'pointer-events-none' : ''
        }`}
      >
        <main>{children}</main>
        <Footer />
      </div>
      {/* Drawer global, independiente de la Navbar */}
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
    </>
  );
}