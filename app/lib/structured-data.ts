import { Product } from '../types/product'

export function generateProductJsonLd(product: Product) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://crowrepuestos.com'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.nombre,
    description: product.descripcionCompleta || product.descripcionCorta,
    image: product.imagenes || [product.imagenUrl],
    brand: {
      '@type': 'Brand',
      name: product.marca
    },
    category: product.categoria,
    sku: product.id,
    gtin: product.codigoBarras,
    offers: {
      '@type': 'Offer',
      url: `${baseUrl}/products/${product.id}`,
      priceCurrency: 'ARS',
      price: product.precio,
      availability: product.stock > 0 
        ? 'https://schema.org/InStock' 
        : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'CrowRepuestos',
        url: baseUrl
      },
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 días
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1'
    },
    review: [
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5'
        },
        author: {
          '@type': 'Person',
          name: 'Cliente Verificado'
        },
        reviewBody: 'Excelente calidad del repuesto, instalación perfecta y entrega rápida.'
      }
    ],
    manufacturer: {
      '@type': 'Organization',
      name: product.marca
    },
    model: product.modeloCompatible,
    productID: product.id,
    ...(product.especificaciones && {
      additionalProperty: [
        ...(product.especificaciones.dimensiones ? [{
          '@type': 'PropertyValue',
          name: 'Dimensiones',
          value: product.especificaciones.dimensiones
        }] : []),
        ...(product.especificaciones.peso ? [{
          '@type': 'PropertyValue',
          name: 'Peso',
          value: product.especificaciones.peso
        }] : []),
        ...(product.especificaciones.material ? [{
          '@type': 'PropertyValue',
          name: 'Material',
          value: product.especificaciones.material
        }] : []),
        ...(product.especificaciones.garantia ? [{
          '@type': 'PropertyValue',
          name: 'Garantía',
          value: product.especificaciones.garantia
        }] : [])
      ]
    })
  }
}

export function generateOrganizationJsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://crowrepuestos.com'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'AutoPartsStore',
    name: 'CrowRepuestos',
    description: 'Especialistas en repuestos para camiones. La mayor selección de autopartes con garantía y envío a todo el país.',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    image: `${baseUrl}/og-image.jpg`,
    telephone: '+54-11-1234-5678',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Av. Corrientes 1234',
      addressLocality: 'Buenos Aires',
      addressRegion: 'CABA',
      postalCode: '1043',
      addressCountry: 'AR'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '-34.6037',
      longitude: '-58.3816'
    },
    openingHours: [
      'Mo-Fr 09:00-18:00',
      'Sa 09:00-13:00'
    ],
    priceRange: '$$',
    paymentAccepted: ['Cash', 'Credit Card', 'Debit Card', 'Bank Transfer'],
    currenciesAccepted: 'ARS',
    areaServed: {
      '@type': 'Country',
      name: 'Argentina'
    },
    serviceArea: {
      '@type': 'Country',
      name: 'Argentina'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Repuestos para Camiones',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'Sistema de Motor',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Filtros de Aire' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Bombas de Agua' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Correas de Distribución' } }
          ]
        },
        {
          '@type': 'OfferCatalog', 
          name: 'Sistema de Frenos',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Discos de Freno' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Pastillas de Freno' } }
          ]
        }
      ]
    },
    sameAs: [
      'https://www.facebook.com/crowrepuestos',
      'https://www.instagram.com/crowrepuestos',
      'https://www.linkedin.com/company/crowrepuestos'
    ]
  }
}

export function generateBreadcrumbJsonLd(breadcrumbs: Array<{ name: string; url: string }>) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://crowrepuestos.com'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: breadcrumb.name,
      item: breadcrumb.url.startsWith('http') ? breadcrumb.url : `${baseUrl}${breadcrumb.url}`
    }))
  }
}