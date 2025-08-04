import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Configure environment variables for testing
process.env.NEXT_PUBLIC_MOVIES_API_URL =
  'https://67582a7f60576a194d12bc50.mockapi.io/movies';

// Mock para CSS modules
vi.mock('*.module.css', () => ({
  default: new Proxy(
    {},
    {
      get: (target, prop) => {
        return prop.toString();
      },
    }
  ),
}));

// Mock para archivos CSS regulares
vi.mock('*.css', () => ({}));
