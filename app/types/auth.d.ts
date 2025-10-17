export type Address = {
  id: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
};

export type OrderItem = {
  productId: string;
  nombre: string;
  imagenUrl: string;
  precio: number;
  quantity: number;
};

export type ShippingMethod = {
  code: 'home' | 'pickup';
  label: string;
  cost: number;
  eta: string;
};

export type Order = {
  id: string;
  date: string; // ISO
  items: OrderItem[];
  subtotal: number;
  shipping: ShippingMethod;
  shippingAddress: Address;
  total: number;
  status: 'paid' | 'pending' | 'cancelled';
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  addresses: Address[];
  defaultAddressId?: string;
  orders: Order[];
};

export type Review = {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number; // 1..5
  comment: string;
  date: string; // ISO
};
