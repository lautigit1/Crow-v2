import { API_URL } from './config';

const API_BASE_URL = API_URL;

export interface WishlistItem {
  product_id: number;
  added_at: string;
  product?: {
    id: number;
    name: string;
    price: number;
    image_url: string;
    stock: number;
  };
}

export interface Wishlist {
  items: WishlistItem[];
}

/**
 * Obtener la wishlist del usuario autenticado
 */
export async function getWishlist(token: string): Promise<Wishlist> {
  const response = await fetch(`${API_BASE_URL}/wishlist`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Error al obtener la wishlist');
  }

  return response.json();
}

/**
 * Agregar un producto a la wishlist
 */
export async function addToWishlist(
  token: string,
  productId: number
): Promise<Wishlist> {
  const response = await fetch(`${API_BASE_URL}/wishlist/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      product_id: productId,
    }),
  });

  if (!response.ok) {
    throw new Error('Error al agregar producto a favoritos');
  }

  return response.json();
}

/**
 * Eliminar un producto de la wishlist
 */
export async function removeFromWishlist(
  token: string,
  productId: number
): Promise<Wishlist> {
  const response = await fetch(`${API_BASE_URL}/wishlist/items/${productId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Error al eliminar producto de favoritos');
  }

  return response.json();
}

/**
 * Limpiar toda la wishlist
 */
export async function clearWishlist(token: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/wishlist`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Error al limpiar favoritos');
  }
}
