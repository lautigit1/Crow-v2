// app/lib/orders-api.ts (real backend integration)

import type { Order } from '../types/auth';
import { API_URL } from './config';

function getToken(): string | null {
  try {
    const raw = localStorage.getItem('authTokens');
    if (!raw) return null;
    const tokens = JSON.parse(raw) as { accessToken?: string };
    return tokens.accessToken || null;
  } catch {
    return null;
  }
}

async function fetchWithAuth(input: string, init: RequestInit = {}): Promise<Response> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(init.headers as Record<string, string> | undefined),
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  return fetch(input, { ...init, headers });
}

export async function createOrder(orderData: {
  items: { productId: string; qty: number }[];
  shippingAddressId?: string;
}): Promise<{ orderId: string }> {
  const res = await fetchWithAuth(`${API_URL}/orders`, {
    method: 'POST',
    body: JSON.stringify(orderData),
  });
  if (!res.ok) throw new Error('No se pudo crear la orden');
  return res.json();
}

export async function fetchMyOrders(): Promise<Order[]> {
  const res = await fetchWithAuth(`${API_URL}/orders`);
  if (!res.ok) return [];
  const data = await res.json();
  // Map backend orders to Order type if needed
  return data as Order[];
}
