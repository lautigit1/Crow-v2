'use client'

import { useEffect } from 'react'

interface StructuredDataProps {
  data: object
}

export default function StructuredData({ data }: StructuredDataProps) {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(data)
    
    // Insertar en el head
    document.head.appendChild(script)
    
    // Cleanup al desmontar
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [data])

  return null // Este componente no renderiza nada visible
}