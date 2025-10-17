// app/lib/auth-api.ts

import type { User, Order } from '../types/auth';

// Simulación de delay de red
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface LoginCredentials {
  email: string;
  password: string;
}

// Tipo interno para usuarios con password (solo para localStorage)
interface StoredUser extends User {
  password: string;
}

export interface AuthUser extends User {
  orders: Order[];
}

// Simulación de API de login
export async function apiLogin(credentials: LoginCredentials): Promise<AuthUser> {
  await delay(800); // Simula latencia de red

  // Simulación de validación básica
  if (!credentials.email || !credentials.password) {
    throw new Error('Email y contraseña requeridos');
  }

  if (credentials.password.length < 3) {
    throw new Error('Contraseña inválida');
  }

  // Buscar usuario en localStorage
  const users: StoredUser[] = JSON.parse(localStorage.getItem('users') || '[]');
  let storedUser = users.find((u: StoredUser) => u.email === credentials.email && u.password === credentials.password);

  if (!storedUser) {
    // Usuario por defecto si no existe
    storedUser = {
      id: Date.now().toString(),
      name: credentials.email.split('@')[0],
      email: credentials.email,
      password: credentials.password,
      addresses: [],
      orders: []
    };
    
    users.push(storedUser);
    localStorage.setItem('users', JSON.stringify(users));
  }

  // Convertir a AuthUser (sin password)
  const user: AuthUser = {
    id: storedUser.id,
    name: storedUser.name,
    email: storedUser.email,
    avatarUrl: storedUser.avatarUrl,
    addresses: storedUser.addresses,
    defaultAddressId: storedUser.defaultAddressId,
    orders: storedUser.orders
  };

  // Almacenar sesión actual
  localStorage.setItem('currentUser', JSON.stringify(user));
  
  return user;
}

// Simulación de API de logout
export async function apiLogout(): Promise<void> {
  await delay(300);
  localStorage.removeItem('currentUser');
}

// Simulación de verificación de sesión
export async function apiCheckSession(): Promise<AuthUser | null> {
  await delay(200);
  
  const userData = localStorage.getItem('currentUser');
  if (!userData) return null;
  
  try {
    return JSON.parse(userData);
  } catch {
    return null;
  }
}

// Simulación de agregar orden
export async function apiAddOrder(order: Order): Promise<void> {
  await delay(500);
  
  const currentUserData = localStorage.getItem('currentUser');
  if (!currentUserData) throw new Error('Usuario no autenticado');
  
  const currentUser = JSON.parse(currentUserData);
  
  // Actualizar usuario actual
  currentUser.orders = currentUser.orders || [];
  currentUser.orders.push(order);
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  
  // Actualizar en la lista de usuarios
  const users: StoredUser[] = JSON.parse(localStorage.getItem('users') || '[]');
  const userIndex = users.findIndex((u: StoredUser) => u.id === currentUser.id);
  if (userIndex >= 0) {
    users[userIndex] = currentUser;
    localStorage.setItem('users', JSON.stringify(users));
  }
}