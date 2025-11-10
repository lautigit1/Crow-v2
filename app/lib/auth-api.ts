// app/lib/auth-api.ts (conexión real al backend Nest)

import type { User, Order } from '../types/auth';
import { API_URL } from './config';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface AuthUser extends User {
  orders: Order[];
}

type Tokens = { accessToken: string; refreshToken: string };

const TOKENS_KEY = 'authTokens';
const SESSION_KEY = 'currentUser';

export function getTokens(): Tokens | null {
  try {
    const raw = localStorage.getItem(TOKENS_KEY);
    return raw ? (JSON.parse(raw) as Tokens) : null;
  } catch {
    return null;
  }
}

function setTokens(tokens: Tokens) {
  localStorage.setItem(TOKENS_KEY, JSON.stringify(tokens));
}

function clearTokens() {
  localStorage.removeItem(TOKENS_KEY);
}

async function refreshAccessToken(): Promise<string | null> {
  const tokens = getTokens();
  if (!tokens?.refreshToken) return null;
  const res = await fetch(`${API_URL}/auth/refresh-token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken: tokens.refreshToken }),
  });
  if (!res.ok) return null;
  const data = (await res.json()) as Tokens;
  setTokens(data);
  return data.accessToken;
}

async function fetchWithAuth(input: string, init: RequestInit = {}, retry = true): Promise<Response> {
  const tokens = getTokens();
  const headers: Record<string, string> = {
    ...(init.headers as Record<string, string> | undefined),
  };
  if (tokens?.accessToken) headers.Authorization = `Bearer ${tokens.accessToken}`;
  const res = await fetch(input, { ...init, headers });
  if (res.status === 401 && retry) {
    const newAccess = await refreshAccessToken();
    if (newAccess) {
      const headers2: Record<string, string> = {
        ...(init.headers as Record<string, string> | undefined),
        Authorization: `Bearer ${newAccess}`,
      };
      return fetch(input, { ...init, headers: headers2 });
    }
  }
  return res;
}

async function getProfile(): Promise<AuthUser> {
  const res = await fetchWithAuth(`${API_URL}/users/me`);
  if (!res.ok) throw new Error('No se pudo obtener el perfil');
  const data = await res.json();
  // Mapear a tipo del front
  const user: AuthUser = {
    id: data.id ?? data.user_id ?? data.uid ?? 'me',
    name: data.name ?? data.full_name ?? 'Usuario',
    email: data.email ?? '',
    role: data.role ?? 'authenticated',
    avatarUrl: undefined,
    addresses: [],
    orders: [],
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  return user;
}

export async function apiRegister(input: RegisterInput): Promise<AuthUser> {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const msg = await safeErrorMessage(res);
    throw new Error(msg ?? 'Registro falló');
  }
  const tokens = (await res.json()) as Tokens;
  setTokens(tokens);
  return getProfile();
}

export async function apiLogin(credentials: LoginCredentials): Promise<AuthUser> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) {
    const msg = await safeErrorMessage(res);
    throw new Error(msg ?? 'Login inválido');
  }
  const tokens = (await res.json()) as Tokens;
  setTokens(tokens);
  return getProfile();
}

export async function apiLogout(): Promise<void> {
  clearTokens();
  localStorage.removeItem(SESSION_KEY);
  // Limpiar también el storage de Zustand
  localStorage.removeItem('auth-storage');
}

export async function apiCheckSession(): Promise<AuthUser | null> {
  const tokens = getTokens();
  if (!tokens?.accessToken) {
    // No hay token, no hacer ninguna llamada al backend
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
  try {
    return await getProfile();
  } catch {
    // Si falla la llamada (401, etc), limpiar tokens
    clearTokens();
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
}

// Mantener local por ahora; podemos integrar con backend /orders más adelante
export async function apiAddOrder(order: Order): Promise<void> {
  // Placeholder: en el futuro se enviará al backend.
  // Se valida mínima estructura para evitar silencios.
  if (!order || !Array.isArray(order.items)) {
    throw new Error('Orden inválida');
  }
  return Promise.resolve();
}

async function safeErrorMessage(res: Response): Promise<string | null> {
  try {
    const body = await res.json();
    return body?.message || body?.error || null;
  } catch {
    return null;
  }
}