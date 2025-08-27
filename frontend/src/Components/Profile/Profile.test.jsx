import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Profile from './Profile'

// Mock de Header (para no probarlo aquí)
vi.mock('../Header', () => ({
  default: ({ titulo }) => <h2 data-testid="header">{titulo}</h2>,
}))

// Mock de formatoFecha
vi.mock('../../Utils/format', () => ({
  formatoFecha: vi.fn(() => '01/01/2000'),
}))

describe('Profile Component', () => {
  const datos = {
    owner: {
      name: 'Juan Pérez',
      address: 'Calle Falsa 123',
      birthday: '2000-01-01',
      photo: 'uploads/photo.jpg',
    },
  }

  it('renderiza el encabezado con el título Propietario', () => {
    render(<Profile datos={datos} />)
    expect(screen.getByTestId('header')).toHaveTextContent('Propietario')
  })

  it('renderiza la imagen con src y alt correctos', () => {
    render(<Profile datos={datos} />)
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('src', `http://localhost:5227/${datos.owner.photo}`)
    expect(img).toHaveAttribute('alt', datos.owner.name)
  })

  it('muestra el nombre, dirección y fecha del propietario', () => {
    render(<Profile datos={datos} />)

    expect(screen.getByText(/Nombre:/i)).toBeInTheDocument()
    expect(screen.getByText(datos.owner.name)).toBeInTheDocument()

    expect(screen.getByText(/Dirección:/i)).toBeInTheDocument()
    expect(screen.getByText(datos.owner.address)).toBeInTheDocument()

    expect(screen.getByText(/Fecha:/i)).toBeInTheDocument()
    expect(screen.getByText('01/01/2000')).toBeInTheDocument() // valor mockeado
  })
})
