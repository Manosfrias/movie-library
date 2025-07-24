import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock para CSS modules
vi.mock('*.module.css', () => ({
  default: new Proxy({}, {
    get: (target, prop) => {
      return prop.toString()
    }
  })
}))

// Mock para archivos CSS regulares
vi.mock('*.css', () => ({}));
