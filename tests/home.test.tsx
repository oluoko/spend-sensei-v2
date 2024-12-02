import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import Home from '../app/page'

vi.mock('@clerk/nextjs', () => ({
  useAuth: () => ({
    userId: 'user_2NNEqL2nrIRdJ194ndJqAHwEfxC',
  }),
  ClerkProvider: ({ children }) => <div>{children}</div>,
}))

test('Home', () => {
  render(<Home />)
  expect(screen.getByText('get started')).toBeTruthy()
})
