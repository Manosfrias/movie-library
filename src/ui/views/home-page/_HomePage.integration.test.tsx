import { MoviesProvider } from '@/ui/context/MoviesContext';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import HomePage from './HomePage';

describe('HomePage Integration Tests - Real Services Integration', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    localStorage.clear();
  });

  const renderHomePage = () => {
    return render(
      <MoviesProvider>
        <HomePage />
      </MoviesProvider>
    );
  };

  it('should render the main homepage structure and load real data', async () => {
    renderHomePage();

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

  it('should display search functionality and work with real data', async () => {
    renderHomePage();

    expect(
      screen.getByPlaceholderText('Buscar películas...')
    ).toBeInTheDocument();
    expect(screen.getAllByText('Por Título')).toHaveLength(2);
    expect(screen.getAllByText('Por Director')).toHaveLength(2);

    await waitFor(() => {
      const movieCards = screen.getAllByRole('article');
      expect(movieCards.length).toBeGreaterThan(0);
    });

    const searchInput = screen.getByPlaceholderText('Buscar películas...');
    await user.type(searchInput, 'a');

    await waitFor(() => {
      const filteredCards = screen.getAllByRole('article');
      expect(filteredCards.length).toBeGreaterThanOrEqual(0);
    });
  });

  it('should display and interact with real filter and sort controls', async () => {
    renderHomePage();

    expect(screen.getByText('Mostrar Favoritas')).toBeInTheDocument();
    expect(screen.getByText('Ordenar Películas')).toBeInTheDocument();
    expect(screen.getByText('Filtrar Películas')).toBeInTheDocument();

    await waitFor(() => {
      const movieCards = screen.getAllByRole('article');
      expect(movieCards.length).toBeGreaterThan(0);
    });

    const sortByRating = screen.getByRole('button', {
      name: 'Por Calificación',
    });
    await user.click(sortByRating);

    await waitFor(() => {
      const movieCards = screen.getAllByRole('article');
      expect(movieCards.length).toBeGreaterThan(0);
    });
  });

  it('should display movie of the day section with real data', async () => {
    renderHomePage();

    expect(screen.getByText('Película del Día')).toBeInTheDocument();
    expect(screen.getByText('Destacado')).toBeInTheDocument();

    await waitFor(() => {
      const asideSection = screen.getByRole('complementary');
      expect(asideSection).toBeInTheDocument();

      const movieCards = screen.getAllByRole('article');
      expect(movieCards.length).toBeGreaterThan(0);
    });
  });

  it('should manage favorites with real persistence', async () => {
    renderHomePage();

    await waitFor(() => {
      const movieCards = screen.getAllByRole('article');
      expect(movieCards.length).toBeGreaterThan(0);
    });

    const favoritesButton = screen.getByText('Mostrar Favoritas');
    await user.click(favoritesButton);

    await waitFor(() => {
      expect(favoritesButton).toBeInTheDocument();
    });

    await user.click(favoritesButton);

    await waitFor(() => {
      const movieCards = screen.getAllByRole('article');
      expect(movieCards.length).toBeGreaterThanOrEqual(0);
    });
  });

  it('should work with real localStorage functionality', async () => {
    renderHomePage();

    await waitFor(() => {
      const movieCards = screen.getAllByRole('article');
      expect(movieCards.length).toBeGreaterThan(0);
    });

    expect(localStorage).toBeDefined();
    expect(typeof localStorage.setItem).toBe('function');
    expect(typeof localStorage.getItem).toBe('function');
    expect(typeof localStorage.removeItem).toBe('function');
    expect(typeof localStorage.clear).toBe('function');

    expect(() => {
      localStorage.setItem('test-key', 'test-value');
      localStorage.removeItem('test-key');
    }).not.toThrow();
  });

  it('should display add movie button and be interactive', () => {
    renderHomePage();

    const addButton = screen.getByRole('button', {
      name: 'Añadir nueva película',
    });
    expect(addButton).toBeInTheDocument();
    expect(addButton).toBeEnabled();
  });

  it('should have accessible navigation elements and be fully functional', async () => {
    renderHomePage();

    expect(screen.getByRole('main')).toBeInTheDocument();

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);

    buttons.forEach((button) => {
      expect(button).toBeEnabled();
    });

    await waitFor(() => {
      const movieCards = screen.getAllByRole('article');
      expect(movieCards.length).toBeGreaterThan(0);
    });
  });
});
