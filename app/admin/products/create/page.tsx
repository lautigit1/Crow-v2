'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import type { Product } from '@/app/types/product';

type FormData = {
  nombre: string;
  marca: string;
  modeloCompatible: string;
  precio: number;
  stock: number;
  etiqueta: string | null;
  imagenUrl: string;
  descripcionCorta: string;
  descripcionCompleta: string;
  categoria: string;
  subcategoria: string;
  especificaciones: {
    dimensiones: string;
    peso: string;
    material: string;
    garantia: string;
  };
  codigoBarras: string;
  fechaIngreso: string;
};

export default function CreateProductPage() {
  const router = useRouter();
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting }
  } = useForm<FormData>({
    defaultValues: {
      nombre: '',
      marca: '',
      modeloCompatible: '',
      precio: 0,
      stock: 0,
      etiqueta: null,
      imagenUrl: '/images/camion-hero.png',
      descripcionCorta: '',
      descripcionCompleta: '',
      categoria: '',
      subcategoria: '',
      especificaciones: {
        dimensiones: '',
        peso: '',
        material: '',
        garantia: ''
      },
      codigoBarras: '',
      fechaIngreso: new Date().toISOString().split('T')[0]
    }
  });

  const etiquetaOptions = [
    { value: null, label: 'Sin etiqueta' },
    { value: 'Oferta', label: 'Oferta' },
    { value: 'Más Vendido', label: 'Más Vendido' },
    { value: 'Novedad', label: 'Novedad' },
    { value: 'Pocas Unidades', label: 'Pocas Unidades' }
  ];

  // const watchedData = watch();

  const generateProductId = (data: FormData) => {
    const prefix = data.categoria?.substring(0, 3).toUpperCase() || 'PRD';
    const marca = data.marca?.substring(0, 3).toUpperCase() || 'XXX';
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `${prefix}-${marca}-${random}`;
  };

  const onSubmit = async (data: FormData) => {
    try {
      // Simular delay de creación
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Crear el nuevo producto con ID generado
      const newProduct: Product = {
        ...data,
        id: generateProductId(data),
        especificaciones: {
          ...data.especificaciones,
          numerosParte: []
        }
      } as Product;

      console.log('Producto creado:', newProduct);
      
      // Redirigir a la lista de productos
      router.push('/admin/products');
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Link
            href="/admin/products"
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            ← Volver a productos
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Crear Nuevo Producto</h1>
        <p className="text-gray-600 mt-2">Completa la información del repuesto</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow p-6 space-y-6">
        {/* Información Básica */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Información Básica</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre del Producto *
              </label>
              <input
                {...register("nombre", { 
                  required: "El nombre es requerido",
                  minLength: { value: 3, message: "Mínimo 3 caracteres" }
                })}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.nombre && (
                <p className="text-sm text-red-600 mt-1">{errors.nombre.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Marca *
              </label>
              <input
                {...register("marca", { 
                  required: "La marca es requerida",
                  minLength: { value: 2, message: "Mínimo 2 caracteres" }
                })}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.marca && (
                <p className="text-sm text-red-600 mt-1">{errors.marca.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Modelo Compatible *
              </label>
              <input
                {...register("modeloCompatible", { 
                  required: "El modelo compatible es requerido",
                  minLength: { value: 2, message: "Mínimo 2 caracteres" }
                })}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ej: Serie 4 / R113 / P113"
              />
              {errors.modeloCompatible && (
                <p className="text-sm text-red-600 mt-1">{errors.modeloCompatible.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Etiqueta
              </label>
              <select
                {...register("etiqueta")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {etiquetaOptions.map((option) => (
                  <option key={option.label} value={option.value || 'null'}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Precio y Stock */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Precio y Stock</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Precio (ARS) *
              </label>
              <input
                {...register("precio", { 
                  required: "El precio es requerido",
                  min: { value: 0, message: "El precio debe ser mayor a 0" },
                  valueAsNumber: true
                })}
                type="number"
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.precio && (
                <p className="text-sm text-red-600 mt-1">{errors.precio.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock Inicial *
              </label>
              <input
                type="number"
                {...register("stock", { 
                  required: "El stock es requerido",
                  min: { value: 0, message: "El stock debe ser mayor o igual a 0" },
                  valueAsNumber: true
                })}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              {errors.stock && <p className="mt-1 text-sm text-red-600">{errors.stock.message}</p>}
            </div>
          </div>
        </div>

        {/* Categorización */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Categorización</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoría
              </label>
              <input
                type="text"
                {...register("categoria", { 
                  required: "La categoría es requerida" 
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ej: Motor, Sistema de Frenos"
              />
              {errors.categoria && <p className="mt-1 text-sm text-red-600">{errors.categoria.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subcategoría
              </label>
              <input
                type="text"
                {...register("subcategoria")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ej: Filtros, Discos"
              />
            </div>
          </div>
        </div>

        {/* Descripciones */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Descripciones</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción Corta *
              </label>
              <textarea
                {...register("descripcionCorta", {
                  required: "La descripción corta es requerida"
                })}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Descripción breve del producto"
                required
              />
              {errors.descripcionCorta && <p className="mt-1 text-sm text-red-600">{errors.descripcionCorta.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción Completa
              </label>
              <textarea
                {...register("descripcionCompleta")}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Descripción detallada del producto"
              />
            </div>
          </div>
        </div>

        {/* Especificaciones */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Especificaciones Técnicas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dimensiones
              </label>
              <input
                type="text"
                {...register("especificaciones.dimensiones")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ej: 320mm x 180mm x 85mm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Peso
              </label>
              <input
                type="text"
                {...register("especificaciones.peso")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ej: 1.2kg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Material
              </label>
              <input
                type="text"
                {...register("especificaciones.material")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ej: Hierro fundido, Papel plisado"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Garantía
              </label>
              <input
                type="text"
                {...register("especificaciones.garantia")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ej: 12 meses, 24 meses"
              />
            </div>
          </div>
        </div>

        {/* Información Adicional */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Información Adicional</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL de Imagen
              </label>
              <input
                type="text"
                {...register("imagenUrl")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="/images/producto.png"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Código de Barras
              </label>
              <input
                type="text"
                {...register("codigoBarras")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="7891234567890"
              />
            </div>
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="flex gap-4 pt-6 border-t border-gray-200">
          <Link
            href="/admin/products"
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin">⭐</span>
                Creando...
              </>
            ) : (
              <>
                <span>💾</span>
                Crear Producto
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}