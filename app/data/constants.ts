// app/data/constants.ts

import type { ShippingMethod } from '../types/auth';

export const SHIPPING_OPTIONS: ShippingMethod[] = [
  { code: 'home', label: 'Envío a Domicilio', cost: 4500, eta: '3-5 días' },
  { code: 'pickup', label: 'Retiro en Sucursal', cost: 0, eta: '24-48 horas' },
];

export const ORDER_STATUSES = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed', 
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
} as const;

export const PRODUCT_CATEGORIES = [
  'Motor',
  'Frenos',
  'Transmisión',
  'Suspensión',
  'Sistema Eléctrico',
  'Carrocería',
  'Neumáticos',
  'Filtros',
  'Aceites y Fluidos',
  'Herramientas'
];

export const PRODUCT_BRANDS = [
  'Volvo',
  'Scania', 
  'Mercedes-Benz',
  'MAN',
  'Iveco',
  'DAF',
  'Renault',
  'Ford',
  'Chevrolet',
  'Internacional'
];