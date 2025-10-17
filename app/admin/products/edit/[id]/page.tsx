'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useAdmin } from '../../../context/AdminContext';
import type { Product } from '@/app/types/product';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;
  const { getProduct, updateProduct } = useAdmin();
  
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({});

  const etiquetaOptions = [
    { value: null, label: 'Sin etiqueta' },
    { value: 'Oferta', label: 'Oferta' },
    { value: 'Más Vendido', label: 'Más Vendido' },
    { value: 'Novedad', label: 'Novedad' },
    { value: 'Pocas Unidades', label: 'Pocas Unidades' }
  ];

  useEffect(() => {
    // Buscar el producto por ID usando el contexto
    const foundProduct = getProduct(productId);
    if (foundProduct) {
      setProduct(foundProduct);
      setFormData(foundProduct);
    } else {
      // Si no se encuentra, redirigir a la lista
      router.push('/admin/products');
    }
  }, [productId, router, getProduct]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof Product] as object || {}),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: name === 'precio' || name === 'stock' 
          ? parseFloat(value) || 0 
          : name === 'etiqueta' && value === 'null' 
          ? null 
          : value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    
    setIsLoading(true);

    // Simular delay de actualización
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Crear el producto actualizado
    const updatedProduct: Product = {
      ...product,
      ...formData,
      id: product.id, // Mantener el ID original
      precio: formData.precio || 0,
      stock: formData.stock || 0,
      nombre: formData.nombre || '',
      marca: formData.marca || '',
      modeloCompatible: formData.modeloCompatible || '',
      imagenUrl: formData.imagenUrl || '/images/camion-hero.png',
      descripcionCorta: formData.descripcionCorta || '',
    };

    // Actualizar producto usando el contexto
    updateProduct(updatedProduct);

    // Redirigir a la lista de productos
    router.push('/admin/products');
  };

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12">
          <span className="text-6xl mb-4 block">❓</span>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Producto no encontrado</h2>
          <p className="text-gray-600 mb-6">El producto que intentas editar no existe</p>
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← Volver a productos
          </Link>
        </div>
      </div>
    );
  }

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
        <h1 className="text-3xl font-bold text-gray-900">Editar Producto</h1>
        <p className="text-gray-600 mt-2">ID: {product.id}</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
        {/* Información Básica */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Información Básica</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre del Producto *
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Marca *
              </label>
              <input
                type="text"
                name="marca"
                value={formData.marca || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Modelo Compatible *
              </label>
              <input
                type="text"
                name="modeloCompatible"
                value={formData.modeloCompatible || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ej: Serie 4 / R113 / P113"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Etiqueta
              </label>
              <select
                name="etiqueta"
                value={formData.etiqueta || 'null'}
                onChange={handleInputChange}
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
                type="number"
                name="precio"
                value={formData.precio || 0}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock *
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock || 0}
                onChange={handleInputChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
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
                name="categoria"
                value={formData.categoria || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ej: Motor, Sistema de Frenos"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subcategoría
              </label>
              <input
                type="text"
                name="subcategoria"
                value={formData.subcategoria || ''}
                onChange={handleInputChange}
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
                name="descripcionCorta"
                value={formData.descripcionCorta || ''}
                onChange={handleInputChange}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Descripción breve del producto"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción Completa
              </label>
              <textarea
                name="descripcionCompleta"
                value={formData.descripcionCompleta || ''}
                onChange={handleInputChange}
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
                name="especificaciones.dimensiones"
                value={formData.especificaciones?.dimensiones || ''}
                onChange={handleInputChange}
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
                name="especificaciones.peso"
                value={formData.especificaciones?.peso || ''}
                onChange={handleInputChange}
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
                name="especificaciones.material"
                value={formData.especificaciones?.material || ''}
                onChange={handleInputChange}
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
                name="especificaciones.garantia"
                value={formData.especificaciones?.garantia || ''}
                onChange={handleInputChange}
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
                name="imagenUrl"
                value={formData.imagenUrl || ''}
                onChange={handleInputChange}
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
                name="codigoBarras"
                value={formData.codigoBarras || ''}
                onChange={handleInputChange}
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
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="animate-spin">⭐</span>
                Guardando...
              </>
            ) : (
              <>
                <span>💾</span>
                Guardar Cambios
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}