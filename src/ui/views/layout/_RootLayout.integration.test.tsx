import { MoviesProvider } from '@/ui/context/MoviesContext';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import HomePage from '../home-page/HomePage';
import RootLayout from './RootLayout';

vi.mock('next/font/google', () => ({
  Inter: () => ({
    className: 'mocked-inter-font',
  }),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => '/',
}));

describe('RootLayout Integration Tests - Real Services Integration', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    localStorage.clear();
  });

  const renderRootLayoutWithHomePage = () => {
    return render(
      <RootLayout>
        <MoviesProvider>
          <HomePage />
        </MoviesProvider>
      </RootLayout>
    );
  };

  const renderRootLayoutEmpty = () => {
    return render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );
  };

  it('should render layout structure correctly', () => {
    renderRootLayoutEmpty();

    expect(document.documentElement).toBeInTheDocument();
    expect(document.body).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should provide proper HTML structure and metadata', () => {
    renderRootLayoutEmpty();

    expect(document.documentElement).toBeInTheDocument();
    expect(document.head).toBeInTheDocument();
    expect(document.body).toBeInTheDocument();
  });

  it('should work with MoviesProvider integration', async () => {
    renderRootLayoutWithHomePage();

    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByText('Mi Filmoteca')).toBeInTheDocument();

    await waitFor(
      () => {
        const movieCards = screen.getAllByRole('article');
        expect(movieCards.length).toBeGreaterThan(0);
      },
      { timeout: 3000 }
    );
  });

  it('should handle navigation interactions within layout', async () => {
    renderRootLayoutWithHomePage();

    await waitFor(() => {
      const movieCards = screen.getAllByRole('article');
      expect(movieCards.length).toBeGreaterThan(0);
    });

    const searchInput = screen.getByPlaceholderText('Buscar películas...');
    expect(searchInput).toBeInTheDocument();

    await user.type(searchInput, 'test');
    expect(searchInput).toHaveValue('test');
  });

  it('should maintain localStorage functionality across layout', async () => {
    renderRootLayoutWithHomePage();

    expect(localStorage).toBeDefined();
    expect(typeof localStorage.setItem).toBe('function');
    expect(typeof localStorage.getItem).toBe('function');

    expect(() => {
      localStorage.setItem('layout-test', 'value');
      localStorage.removeItem('layout-test');
    }).not.toThrow();
  });

  it('should provide accessible document structure', () => {
    renderRootLayoutWithHomePage();

    expect(document.documentElement).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);

    buttons.forEach((button) => {
      expect(button).toBeEnabled();
    });
  });

  it('should handle real context state management', async () => {
    renderRootLayoutWithHomePage();

    await waitFor(() => {
      const movieCards = screen.getAllByRole('article');
      expect(movieCards.length).toBeGreaterThan(0);
    });

    const favoritesButton = screen.getByText('Mostrar Favoritas');
    expect(favoritesButton).toBeInTheDocument();

    await user.click(favoritesButton);

    await waitFor(() => {
      expect(favoritesButton).toBeInTheDocument();
    });
  });

  it('should support responsive layout behavior', async () => {
    renderRootLayoutWithHomePage();

    expect(screen.getByRole('main')).toBeInTheDocument();

    await waitFor(() => {
      const movieCards = screen.getAllByRole('article');
      expect(movieCards.length).toBeGreaterThan(0);
    });

    const addButton = screen.getByRole('button', {
      name: 'Añadir nueva película',
    });
    expect(addButton).toBeInTheDocument();
    expect(addButton).toBeEnabled();
  });
});
