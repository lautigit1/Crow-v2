// app/types/product.d.ts

// Definimos la estructura (o "forma") que tendrá cada repuesto.
export type Product = {
  id: string; // SKU único del producto
  nombre: string;
  name?: string; // Alias para backend
  marca: string;
  brand?: { name: string }; // Alias para backend
  modeloCompatible: string; // Ej: "Serie 4 / 113", "Cummins ISX"
  precio: number; // Siempre en número, para poder hacer cálculos
  price?: number; // Alias para backend
  stock: number;
  etiqueta?: 'Oferta' | 'Más Vendido' | 'Novedad' | 'Pocas Unidades' | null; // Opcional, para destacar
  imagenUrl: string; // Ruta a la imagen del repuesto
  image_url?: string; // Alias para backend
  descripcionCorta: string; // Un resumen de 1-2 líneas
  description?: string; // Alias para backend
  sku?: string; // SKU del backend
  // Nuevos campos para página de detalle
  imagenes?: string[]; // Múltiples imágenes para galería
  descripcionCompleta?: string; // Descripción detallada
  especificaciones?: {
    dimensiones?: string;
    peso?: string;
    material?: string;
    numerosParte?: string[];
    garantia?: string;
  };
  categoria?: string;
  subcategoria?: string;
  codigoBarras?: string;
  fechaIngreso?: string;
};

// Tipo para el carrito
export type CartItem = {
  product: Product;
  quantity: number;
};

// Tipo para el contexto del carrito
export type CartContextType = {
  items: CartItem[];
  isCartOpen: boolean; // <--- AÑADIDO
  openCart: () => void; // <--- AÑADIDO
  closeCart: () => void; // <--- AÑADIDO
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
};