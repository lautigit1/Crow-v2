import '@testing-library/jest-dom'
import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import type { AnchorHTMLAttributes, ImgHTMLAttributes } from 'react'

// Limpia el DOM después de cada test
afterEach(() => {
  cleanup()
})

// Mock básicos de Next.js para pruebas de componentes
vi.mock('next/link', () => ({
  default: ({ children, href, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement> & { children: React.ReactNode; href?: string }) => (
    <a href={typeof href === 'string' ? href : '#'} {...rest}>{children}</a>
  )
}))

vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: ImgHTMLAttributes<HTMLImageElement> & { src: string | { src?: string } }) => {
    const { src, alt = '', ...rest } = props
    // Renderiza un img estándar para tests
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={typeof src === 'string' ? src : (src?.src ?? '')} alt={alt} {...rest} />
  },
}))

