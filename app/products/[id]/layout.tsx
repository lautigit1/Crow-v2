import { Metadata } from 'next'
import { products } from '../../data/product'

type Params = { id: string }

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { id } = await params
  const product = products.find(p => p.id === id)

  if (!product) {
    return {
      title: 'Producto no encontrado - CrowRepuestos',
      description: 'El producto que buscas no se encuentra disponible.',
    }
  }

  const title = `${product.nombre} ${product.marca} - CrowRepuestos`
  const description = `${product.descripcionCompleta || product.descripcionCorta} ✓ Stock disponible ✓ Garantía incluida ✓ Envío a todo el país. Precio: $${product.precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
  const keywords = [
    product.nombre,
    product.marca,
    product.categoria,
    'repuestos',
    'camiones',
    product.modeloCompatible,
    'autopartes',
    'repuestos camión'
  ].filter(Boolean).join(', ')

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      images: [
        {
          url: product.imagenUrl,
          width: 800,
          height: 600,
          alt: product.nombre,
        }
      ],
      type: 'website',
      siteName: 'CrowRepuestos',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [product.imagenUrl],
    },
    alternates: {
      canonical: `/products/${product.id}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}