import { MetadataRoute } from 'next'
import { products } from './data/product'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://crowrepuestos.com'
  
  // URLs estáticas
  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cart`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    },
  ]

  // URLs dinámicas de productos
  const productUrls = products.map((product) => ({
    url: `${baseUrl}/products/${product.id}`,
    lastModified: product.fechaIngreso ? new Date(product.fechaIngreso) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // URLs de categorías (basadas en las categorías existentes)
  const categories = Array.from(new Set(products.map(p => p.categoria).filter(Boolean)))
  const categoryUrls = categories.map((category) => ({
    url: `${baseUrl}/categories/${encodeURIComponent(category!.toLowerCase().replace(/\s+/g, '-'))}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // URLs de marcas
  const brands = Array.from(new Set(products.map(p => p.marca)))
  const brandUrls = brands.map((brand) => ({
    url: `${baseUrl}/brands/${encodeURIComponent(brand.toLowerCase().replace(/\s+/g, '-'))}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...staticUrls, ...productUrls, ...categoryUrls, ...brandUrls]
}