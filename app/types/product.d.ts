// app/types/product.d.ts

// Definimos la estructura (o "forma") que tendrá cada repuesto.
export type Product = {
  id: string; // SKU único del producto
  nombre: string;
  marca: string;
  modeloCompatible: string; // Ej: "Serie 4 / 113", "Cummins ISX"
  precio: number; // Siempre en número, para poder hacer cálculos
  stock: number;
  etiqueta?: 'Oferta' | 'Más Vendido' | 'Novedad' | 'Pocas Unidades' | null; // Opcional, para destacar
  imagenUrl: string; // Ruta a la imagen del repuesto
  descripcionCorta: string; // Un resumen de 1-2 líneas
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