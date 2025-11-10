import { API_URL } from './config';

const API_BASE_URL = API_URL;

export interface CartItem {
  product_id: number;
  quantity: number;
  product?: {
    id: number;
    name: string;
    price: number;
    image_url: string;
    stock: number;
  };
}

export interface Cart {
  items: CartItem[];
  total: number;
}

/**
 * Obtener el carrito del usuario autenticado
 */
export async function getCart(token: string): Promise<Cart> {
  const response = await fetch(`${API_BASE_URL}/cart`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Error al obtener el carrito');
  }

  return response.json();
}

/**
 * Agregar un producto al carrito
 */
export async function addToCart(
  token: string,
  productId: number,
  quantity: number = 1
): Promise<Cart> {
  const response = await fetch(`${API_BASE_URL}/cart/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      product_id: productId,
      quantity,
    }),
  });

  if (!response.ok) {
    throw new Error('Error al agregar producto al carrito');
  }

  return response.json();
}

/**
 * Actualizar cantidad de un producto en el carrito
 */
export async function updateCartItem(
  token: string,
  productId: number,
  quantity: number
): Promise<Cart> {
  const response = await fetch(`${API_BASE_URL}/cart/items/${productId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ quantity }),
  });

  if (!response.ok) {
    throw new Error('Error al actualizar producto del carrito');
  }

  return response.json();
}

/**
 * Eliminar un producto del carrito
 */
export async function removeFromCart(
  token: string,
  productId: number
): Promise<Cart> {
  const response = await fetch(`${API_BASE_URL}/cart/items/${productId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Error al eliminar producto del carrito');
  }

  return response.json();
}

/**
 * Limpiar todo el carrito
 */
export async function clearCart(token: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/cart`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Error al limpiar el carrito');
  }
}
