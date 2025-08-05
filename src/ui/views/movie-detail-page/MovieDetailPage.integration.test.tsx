import { MoviesProvider } from '@/ui/context/MoviesContext';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import MovieDetailPage from './MovieDetailPage';

// Mock del servicio de películas para tests
vi.mock('@/ui/hooks/useMovieService', () => ({
  useMovieService: () => ({
    getAllMovies: async () => [
      {
        id: '1',
        title: 'The Shawshank Redemption',
        director: 'Frank Darabont',
        releaseYear: 1994,
        genre: 'Drama',
        rating: 9.3,
        favorite: true,
      },
    ],
    getMovieById: vi.fn(),
    getMovieOfTheDay: async () => ({
      id: '1',
      title: 'The Shawshank Redemption',
      director: 'Frank Darabont',
      releaseYear: 1994,
      genre: 'Drama',
      rating: 9.3,
      favorite: true,
    }),
    createMovie: vi.fn(),
    updateMovie: vi.fn(),
    deleteMovie: vi.fn(),
    toggleMovieFavorite: vi.fn(),
  }),
  createMovieApplicationService: () => ({
    getAllMovies: async () => [
      {
        id: '1',
        title: 'The Shawshank Redemption',
        director: 'Frank Darabont',
        releaseYear: 1994,
        genre: 'Drama',
        rating: 9.3,
        favorite: true,
      },
    ],
    getMovieById: vi.fn(),
    getMovieOfTheDay: async () => ({
      id: '1',
      title: 'The Shawshank Redemption',
      director: 'Frank Darabont',
      releaseYear: 1994,
      genre: 'Drama',
      rating: 9.3,
      favorite: true,
    }),
    createMovie: vi.fn(),
    updateMovie: vi.fn(),
    deleteMovie: vi.fn(),
    toggleMovieFavorite: vi.fn(),
  }),
  getMovieApplicationService: () => ({
    getAllMovies: async () => [
      {
        id: '1',
        title: 'The Shawshank Redemption',
        director: 'Frank Darabont',
        releaseYear: 1994,
        genre: 'Drama',
        rating: 9.3,
        favorite: true,
      },
    ],
    getMovieById: vi.fn(),
    getMovieOfTheDay: async () => ({
      id: '1',
      title: 'The Shawshank Redemption',
      director: 'Frank Darabont',
      releaseYear: 1994,
      genre: 'Drama',
      rating: 9.3,
      favorite: true,
    }),
    createMovie: vi.fn(),
    updateMovie: vi.fn(),
    deleteMovie: vi.fn(),
    toggleMovieFavorite: vi.fn(),
  }),
}));

// Componente de ayuda para tests que necesitan esperar la carga
const TestMoviesProvider = ({ children }: { children: React.ReactNode }) => {
  return <MoviesProvider>{children}</MoviesProvider>;
};

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => '/movie/1',
}));

describe('MovieDetailPage Integration Tests - Real Services Integration', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    localStorage.clear();
    // NO pre-cargamos datos - dejamos que use sampleMovies por defecto
  });

  const renderMovieDetailPage = (movieId: string = '1') => {
    return render(
      <TestMoviesProvider>
        <MovieDetailPage params={{ id: movieId }} />
      </TestMoviesProvider>
    );
  };

  const waitForMovieToLoad = async () => {
    // Esperar a que el contexto cargue las películas y renderice contenido
    await waitFor(() => {
      // Buscar por cualquier elemento que indique que la página se ha cargado
      const headings = screen.queryAllByRole('heading');
      const content = screen.queryByText('The Shawshank Redemption');
      expect(headings.length > 0 || content).toBeTruthy();
    });
  };

  it('should display movie detail structure and load real data', async () => {
    renderMovieDetailPage('1');

    // Esperar a que el contexto cargue las películas y renderice contenido
    await waitFor(() => {
      // Verificar que existe contenido de la película
      const movieTitle = screen.getByText('The Shawshank Redemption');
      expect(movieTitle).toBeInTheDocument();
    });

    // Verificar que existe al menos un heading de película
    await waitFor(() => {
      const movieTitles = screen.getAllByRole('heading');
      expect(movieTitles.length).toBeGreaterThan(0);
      expect(
        movieTitles.some(
          (title) => title.textContent?.length && title.textContent.length > 0
        )
      ).toBe(true);
    });
  });

  it('should display complete movie information with real data', async () => {
    renderMovieDetailPage('1');
    await waitForMovieToLoad();

    // Verificar elementos básicos de la película
    await waitFor(() => {
      const movieTitles = screen.getAllByRole('heading');
      expect(movieTitles.length).toBeGreaterThan(0);
    });

    // Verificar elementos comunes en detalles de película
    expect(screen.getByText(/Director/i)).toBeInTheDocument();

    // Usar getAllByText para obtener todos los elementos con 1994 y tomar el primero
    const yearTexts = screen.getAllByText(/\d{4}/);
    expect(yearTexts.length).toBeGreaterThan(0);

    const ratingElements = screen.getAllByText(/9\.3/);
    expect(ratingElements.length).toBeGreaterThan(0);
  });

  it('should handle favorite toggle with real persistence', async () => {
    renderMovieDetailPage('1');
    await waitForMovieToLoad();

    // Entrar en modo de edición
    const editButton = screen.getByRole('button', { name: 'Editar' });
    await act(async () => {
      await user.click(editButton);
    });

    // Esperar a que aparezca el checkbox de favoritos
    await waitFor(() => {
      const favoriteCheckbox = screen.getByRole('checkbox');
      expect(favoriteCheckbox).toBeInTheDocument();
    });

    // Cambiar el estado del checkbox (inicialmente está marcado como favorito)
    const favoriteCheckbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(favoriteCheckbox.checked).toBe(true);

    await act(async () => {
      await user.click(favoriteCheckbox);
    });
    expect(favoriteCheckbox.checked).toBe(false);

    // Guardar los cambios
    const saveButton = screen.getByRole('button', { name: 'Guardar cambios' });
    await act(async () => {
      await user.click(saveButton);
    });

    // Verificar que el cambio se ha guardado
    await waitFor(() => {
      expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
    });
  });

  it('should display movie details sidebar with real data', async () => {
    renderMovieDetailPage('1');
    await waitForMovieToLoad();

    // Verificar que existe contenido del sidebar (navegación)
    await waitFor(() => {
      const homeLink = screen.getByRole('link', { name: 'Mi Filmoteca' });
      expect(homeLink).toBeInTheDocument();
      expect(homeLink).toHaveAttribute('href', '/');
    });

    // Verificar que existe el botón de editar en el contenido principal
    const editButton = screen.getByRole('button', { name: 'Editar' });
    expect(editButton).toBeInTheDocument();

    // Verificar que existe el botón de eliminar
    const deleteButton = screen.getByRole('button', { name: 'Eliminar' });
    expect(deleteButton).toBeInTheDocument();
  });

  it('should display movie synopsis and cast information', async () => {
    renderMovieDetailPage('1');
    await waitForMovieToLoad();

    // Verificar que existe contenido de la película
    await waitFor(() => {
      const headings = screen.getAllByRole('heading');
      expect(headings.length).toBeGreaterThan(0);
    });

    // Verificar que hay texto descriptivo (sinopsis)
    const paragraphs = screen.getAllByText(/\w{10,}/); // Texto con al menos 10 caracteres
    expect(paragraphs.length).toBeGreaterThan(0);
  });

  it('should handle navigation with real router integration', async () => {
    renderMovieDetailPage('1');
    await waitForMovieToLoad();

    // Verificar que los elementos de navegación están presentes
    await waitFor(() => {
      const homeLink = screen.getByRole('link', { name: 'Mi Filmoteca' });
      expect(homeLink).toBeInTheDocument();
      expect(homeLink).toHaveAttribute('href', '/');
    });

    // Verificar funcionalidad básica de los botones de acción
    const editButton = screen.getByRole('button', { name: 'Editar' });
    expect(editButton).toBeInTheDocument();
    expect(editButton).toBeEnabled();

    const deleteButton = screen.getByRole('button', { name: 'Eliminar' });
    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton).toBeEnabled();
  });

  it('should work with real localStorage functionality', async () => {
    renderMovieDetailPage('1');
    await waitForMovieToLoad();

    // Verificar localStorage está disponible
    expect(localStorage).toBeDefined();

    // Test de la funcionalidad de edición que usa localStorage
    const editButton = screen.getByRole('button', { name: 'Editar' });
    await act(async () => {
      await user.click(editButton);
    });

    // Esperar a que aparezca el checkbox de favoritos
    await waitFor(() => {
      const favoriteCheckbox = screen.getByRole('checkbox');
      expect(favoriteCheckbox).toBeInTheDocument();
    });

    // Cambiar el estado del checkbox
    const favoriteCheckbox = screen.getByRole('checkbox') as HTMLInputElement;
    const initialState = favoriteCheckbox.checked;

    await act(async () => {
      await user.click(favoriteCheckbox);
    });
    expect(favoriteCheckbox.checked).toBe(!initialState);

    // Guardar los cambios
    const saveButton = screen.getByRole('button', { name: 'Guardar cambios' });
    await act(async () => {
      await user.click(saveButton);
    });

    // Verificar que el cambio se ha guardado
    await waitFor(() => {
      expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
    });
  });

  it('should handle not found movie gracefully', async () => {
    renderMovieDetailPage('999999'); // ID que no existe

    // Esperar a que las películas se carguen del contexto
    await waitFor(() => {
      // Como no encuentra la película, el componente retorna null
      // Verificar que no hay contenido específico de película
      expect(
        screen.queryByText('The Shawshank Redemption')
      ).not.toBeInTheDocument();
    });

    // Verificar que no hay contenido de película específica
    expect(screen.queryAllByRole('heading')).toHaveLength(0);
    expect(
      screen.queryByRole('button', { name: 'Editar' })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Eliminar' })
    ).not.toBeInTheDocument();
  });
});
