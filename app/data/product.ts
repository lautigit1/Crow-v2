// app/data/product.ts

import { Product } from '@/app/types/product';

// ¡Nuestra base de datos de repuestos de mentirita!
export const products: Product[] = [
  {
    id: 'FIL-AIR-SC113',
    nombre: 'Filtro de Aire Competición',
    marca: 'Scania',
    modeloCompatible: 'Serie 4 / R113 / P113',
    precio: 85000.00,
    stock: 120,
    etiqueta: 'Más Vendido',
    imagenUrl: '/images/camion-hero.png',
    imagenes: ['/images/camion-hero.png', '/images/camion-hero.jpg.png'],
    descripcionCorta: 'Optimiza el rendimiento del motor con máxima filtración.',
    descripcionCompleta: 'Este filtro de aire de competición está diseñado específicamente para motores Scania de alta performance. Fabricado con materiales de primera calidad que garantizan una filtración superior, prolongando la vida útil del motor y mejorando su rendimiento. Compatible con múltiples modelos de la Serie 4.',
    categoria: 'Motor',
    subcategoria: 'Filtros',
    especificaciones: {
      dimensiones: '320mm x 180mm x 85mm',
      peso: '1.2kg',
      material: 'Papel plisado de alta densidad',
      numerosParte: ['1873018', '1873019', 'AF27840'],
      garantia: '12 meses'
    },
    codigoBarras: '7891234567890',
    fechaIngreso: '2024-10-01'
  },
  {
    id: 'DISC-FRE-VOLFH',
    nombre: 'Kit Discos de Freno Ventilados (Eje Delantero)',
    marca: 'Volvo',
    modeloCompatible: 'FH16 / FH12 / FM',
    precio: 250000.00,
    stock: 35,
    etiqueta: 'Oferta',
    imagenUrl: '/images/camion-hero.png',
    imagenes: ['/images/camion-hero.png', '/images/camion-hero.jpg.png'],
    descripcionCorta: 'Máxima seguridad y durabilidad para tu sistema de frenos.',
    descripcionCompleta: 'Kit completo de discos de freno ventilados para eje delantero, diseñados específicamente para camiones Volvo FH y FM. Fabricados en hierro fundido de alta calidad con tecnología de ventilación avanzada que garantiza una disipación óptima del calor. Incluye todos los componentes necesarios para una instalación profesional.',
    categoria: 'Sistema de Frenos',
    subcategoria: 'Discos',
    especificaciones: {
      dimensiones: '430mm de diámetro x 45mm de grosor',
      peso: '18kg (por disco)',
      material: 'Hierro fundido G3000',
      numerosParte: ['85103803', '85103804', '20569131'],
      garantia: '24 meses'
    },
    codigoBarras: '7891234567891',
    fechaIngreso: '2024-09-15'
  },
  {
    id: 'BOM-AGUA-CUMISX',
    nombre: 'Bomba de Agua Reforzada',
    marca: 'Cummins',
    modeloCompatible: 'ISX15 / ISX12',
    precio: 140000.00,
    stock: 80,
    etiqueta: 'Novedad',
    imagenUrl: '/images/camion-hero.png',
    descripcionCorta: 'Mantiene la temperatura ideal del motor bajo cualquier condición.',
  },
  {
    id: 'AMOR-TRAS-MBAXR',
    nombre: 'Amortiguador Trasero de Gas',
    marca: 'Mercedes-Benz',
    modeloCompatible: 'Actros / Axor',
    precio: 98000.00,
    stock: 50,
    etiqueta: null,
    imagenUrl: '/images/camion-hero.png',
    descripcionCorta: 'Confort y estabilidad en los terrenos más exigentes.',
  },
  {
    id: 'CORREA-ALT-IVECO',
    nombre: 'Correa de Distribución Reforzada',
    marca: 'Iveco',
    modeloCompatible: 'Stralis / Trakker',
    precio: 45000.00,
    stock: 15,
    etiqueta: 'Pocas Unidades',
    imagenUrl: '/images/camion-hero.png',
    descripcionCorta: 'Componente esencial para el correcto funcionamiento del motor.',
  },
  {
    id: 'TURBO-MAN-SCA4',
    nombre: 'Turbo Compresor de Alto Rendimiento',
    marca: 'Garrett',
    modeloCompatible: 'Scania Serie 4 / R124',
    precio: 450000.00,
    stock: 5,
    etiqueta: 'Oferta',
    imagenUrl: '/images/camion-hero.png',
    descripcionCorta: 'Incrementa la potencia y eficiencia de tu motor.',
  },
  // Puedes agregar más productos aquí siguiendo la misma estructura
];