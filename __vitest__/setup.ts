import '@testing-library/jest-dom';
import { vi } from 'vitest';

process.env.NEXT_PUBLIC_MOVIES_API_URL =
  'https://67582a7f60576a194d12bc50.mockapi.io/movies';

vi.mock('*.module.css', () => ({
  default: new Proxy(
    {},
    {
      get: (target, prop) => prop.toString(),
    }
  ),
}));

vi.mock('*.css', () => ({}));
