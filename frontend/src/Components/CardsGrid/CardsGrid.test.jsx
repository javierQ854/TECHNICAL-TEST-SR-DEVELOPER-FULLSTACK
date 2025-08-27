// src/components/CardsGrid/CardsGrid.test.jsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CardsGrid from './CardsGrid'

// Mock de los componentes hijos (para no testear Loader/Card aquí)
vi.mock('../../Components/Loader', () => ({
  default: () => <div data-testid="loader">Cargando...</div>,
}))
vi.mock('../../Components/Card', () => ({
  default: ({ usuario }) => <div data-testid="card">{usuario}</div>,
}))

describe('CardsGrid Component', () => {
  it('muestra Loader cuando isLoading es true', () => {
    render(<CardsGrid isLoading={true} error={null} data={[]} />)
    expect(screen.getByTestId('loader')).toBeInTheDocument()
  })

  it('muestra mensaje de error si hay error', () => {
    const error = { message: 'Error al cargar' }
    render(<CardsGrid isLoading={false} error={error} data={[]} />)
    expect(screen.getByText(/Hay un error Error al cargar/i)).toBeInTheDocument()
  })

  it('renderiza tarjetas cuando hay datos', () => {
    const data = [
      { id: 1, name: 'Propiedad 1', address: 'Calle 123', year: 2020, price: 1000, owner: { name: 'Juan' } },
      { id: 2, name: 'Propiedad 2', address: 'Calle 456', year: 2021, price: 2000, owner: { name: 'Ana' } },
    ]
    render(<CardsGrid isLoading={false} error={null} data={data} />)

    expect(screen.getAllByTestId('card')).toHaveLength(2)
    expect(screen.getByText('Propiedad 1')).toBeInTheDocument()
    expect(screen.getByText('Propiedad 2')).toBeInTheDocument()
  })

  it('muestra mensaje cuando no hay datos', () => {
    render(<CardsGrid isLoading={false} error={null} data={[]} />)
    expect(screen.getByText(/No hay datos disponibles/i)).toBeInTheDocument()
  })
})
