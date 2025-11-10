// app/lib/admin-api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const tokens = localStorage.getItem('authTokens');
    if (!tokens) return null;
    const parsed = JSON.parse(tokens);
    return parsed.accessToken || null;
  } catch {
    return null;
  }
}

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = getToken();
  
  // Si no hay token, no hacer la petición
  if (!token) {
    // Redirigir silenciosamente sin lanzar error
    if (typeof window !== 'undefined') {
      window.location.href = '/login?redirect=/admin/dashboard';
    }
    throw new Error('No authentication token');
  }
  
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    ...options.headers,
  };

  const res = await fetch(url, { ...options, headers });
  
  if (res.status === 401) {
    // Token expirado, redirigir a login
    if (typeof window !== 'undefined') {
      window.location.href = '/login?redirect=/admin/dashboard';
    }
    throw new Error('Unauthorized');
  }
  
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Request failed: ${res.status} ${errorText}`);
  }
  
  return res;
}

// ============================================
// USERS MANAGEMENT
// ============================================
export async function getAllUsers() {
  const res = await fetchWithAuth(`${API_URL}/users`);
  return res.json();
}

export async function getUserById(id: string) {
  const res = await fetchWithAuth(`${API_URL}/users/${id}`);
  return res.json();
}

export async function updateUserRole(id: string, role: 'authenticated' | 'admin') {
  const res = await fetchWithAuth(`${API_URL}/users/${id}/role`, {
    method: 'PATCH',
    body: JSON.stringify({ role }),
  });
  return res.json();
}

export async function disableUser(id: string) {
  await fetchWithAuth(`${API_URL}/users/${id}`, {
    method: 'DELETE',
  });
  return { ok: true };
}

// ============================================
// PRODUCTS MANAGEMENT
// ============================================

interface ProductInput {
  name: string;
  description?: string;
  price: number;
  stock: number;
  brand_id?: string;
  category_id?: string;
  image_url?: string;
  sku?: string;
}

export async function getAllProductsAdmin() {
  const res = await fetchWithAuth(`${API_URL}/products`);
  return res.json();
}

export async function getProductByIdAdmin(id: string) {
  const res = await fetchWithAuth(`${API_URL}/products/${id}`);
  return res.json();
}

export async function createProduct(data: ProductInput) {
  const res = await fetchWithAuth(`${API_URL}/products`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateProduct(id: string, data: Partial<ProductInput>) {
  const res = await fetchWithAuth(`${API_URL}/products/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteProduct(id: string) {
  await fetchWithAuth(`${API_URL}/products/${id}`, {
    method: 'DELETE',
  });
  return { ok: true };
}

// ============================================
// ORDERS MANAGEMENT
// ============================================
export async function getAllOrders() {
  const res = await fetchWithAuth(`${API_URL}/orders`);
  return res.json();
}

// ============================================
// STATS
// ============================================

interface User {
  id: string;
  email: string;
  role: string;
}

interface Product {
  id: string;
  name?: string;
  stock: number;
}

interface Order {
  id: string;
  status: string;
}

export async function getStats() {
  const [users, products, orders] = await Promise.all([
    getAllUsers() as Promise<User[]>,
    getAllProductsAdmin() as Promise<Product[]>,
    getAllOrders().catch(() => []) as Promise<Order[]>, // Por si no está implementado aún
  ]);

  return {
    totalUsers: users.length,
    totalProducts: products.length,
    totalOrders: orders.length,
    outOfStock: products.filter((p) => p.stock === 0).length,
    lowStock: products.filter((p) => p.stock > 0 && p.stock <= 15).length,
    adminUsers: users.filter((u) => u.role === 'admin').length,
  };
}

// ============================================
// BRANDS & CATEGORIES
// ============================================
export async function getAllBrands() {
  const res = await fetchWithAuth(`${API_URL}/brands`);
  if (!res.ok) throw new Error('Failed to fetch brands');
  return res.json();
}

export async function createBrand(name: string) {
  const res = await fetchWithAuth(`${API_URL}/brands`, {
    method: 'POST',
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error('Failed to create brand');
  return res.json();
}

export async function deleteBrand(id: string) {
  const res = await fetchWithAuth(`${API_URL}/brands/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete brand');
  return { ok: true };
}

export async function getAllCategories() {
  const res = await fetchWithAuth(`${API_URL}/categories`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

export async function createCategory(data: { name: string; slug: string; parent_id?: string }) {
  const res = await fetchWithAuth(`${API_URL}/categories`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create category');
  return res.json();
}

export async function deleteCategory(id: string) {
  const res = await fetchWithAuth(`${API_URL}/categories/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete category');
  return { ok: true };
}
