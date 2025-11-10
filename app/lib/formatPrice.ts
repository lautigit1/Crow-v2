// Función de formateo de precios que evita problemas de hidratación SSR
export const formatPrice = (price: number): string => {
  // Formateo simple que es consistente entre servidor y cliente
  const formatted = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `$${formatted}`;
};

// Versión alternativa con más control
export const formatPriceDetailed = (price: number): string => {
  const parts = price.toFixed(2).split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `$${parts.join(".")}`;
};