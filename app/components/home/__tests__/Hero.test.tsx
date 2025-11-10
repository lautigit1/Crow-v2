import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Hero from '../Hero'

describe('Hero', () => {
  it('renderiza el CTA Explorar catálogo', () => {
    render(<Hero />)
    expect(screen.getByText(/EXPLORAR CATÁLOGO/i)).toBeInTheDocument()
  })
})
