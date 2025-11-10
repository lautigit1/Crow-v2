// app/layout.tsx

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import ClientLayout from './ClientLayout'
import QueryProvider from './components/providers/QueryProvider'

const inter = Inter({ subsets: ['latin'] })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const metadata: Metadata = {
  title: 'CrowRepuestos - Repuestos para Camiones',
  description: 'La mejor tienda de repuestos para camiones.',
  // `metadataBase` ayuda a Next a resolver URLs absolutas para Open Graph y Twitter
  // Imprime una URL base (ej: https://example.com). Se recomienda establecerla
  // mediante NEXT_PUBLIC_SITE_URL en producción.
  metadataBase: new URL(siteUrl),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <QueryProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#1f2937',
                color: '#ffffff',
                border: '1px solid #374151'
              }
            }}
          />
        </QueryProvider>
      </body>
    </html>
  )
}