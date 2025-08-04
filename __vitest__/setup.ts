import '@testing-library/jest-dom';
import { vi } from 'vitest';

process.env.NEXT_PUBLIC_MOVIES_API_URL =
  'https://67582a7f60576a194d12bc50.mockapi.io/movies';
process.env.NEXT_PUBLIC_STORAGE_FILTERS_KEY = 'test-movie-filters';
process.env.NEXT_PUBLIC_STORAGE_FAVORITES_KEY = 'test-movie-favorites';

// Mock localStorage para que no interfiera con los tests
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

vi.mock('*.module.css', () => ({
  default: new Proxy(
    {},
    {
      get: (target, prop) => prop.toString(),
    }
  ),
}));

vi.mock('*.css', () => ({}));
