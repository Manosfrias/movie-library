import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MoviesProvider, useMovies } from './MoviesContext';

// Mock del servicio de aplicación de películas
vi.mock('../hooks/useMovieService', () => {
  const createMockMovies = () => [
    {
      id: '1',
      title: 'The Matrix',
      releaseYear: 1999,
      director: 'The Wachowskis',
      rating: 8.7,
      genre: 'Sci-Fi',
      favorite: true,
    },
    {
      id: '2',
      title: 'Inception',
      releaseYear: 2010,
      director: 'Christopher Nolan',
      rating: 8.8,
      genre: 'Sci-Fi',
      favorite: false,
    },
    {
      id: '3',
      title: 'The Godfather',
      releaseYear: 1972,
      director: 'Francis Ford Coppola',
      rating: 9.2,
      genre: 'Crime',
      favorite: true,
    },
  ];

  const mockServiceInstance = () => {
    let mockMovies = createMockMovies(); // Crear una nueva instancia para cada test

    return {
      getAllMovies: vi.fn().mockImplementation(() => {
        mockMovies = createMockMovies(); // Reset para cada llamada
        return Promise.resolve(mockMovies);
      }),
      getMovieById: vi
        .fn()
        .mockImplementation((id: string) =>
          Promise.resolve(mockMovies.find((movie) => movie.id === id) || null)
        ),
      createMovie: vi
        .fn()
        .mockImplementation((movie) =>
          Promise.resolve({ ...movie, id: Date.now().toString() })
        ),
      updateMovie: vi.fn().mockImplementation((id: string, data) => {
        const movieIndex = mockMovies.findIndex((m) => m.id === id);
        if (movieIndex >= 0) {
          mockMovies[movieIndex] = { ...mockMovies[movieIndex], ...data };
          return Promise.resolve(mockMovies[movieIndex]);
        }
        return Promise.resolve(null);
      }),
      deleteMovie: vi.fn().mockResolvedValue(true),
      toggleMovieFavorite: vi.fn().mockImplementation((id: string) => {
        const movie = mockMovies.find((m) => m.id === id);
        if (movie) {
          movie.favorite = !movie.favorite;
          return Promise.resolve(movie);
        }
        return Promise.resolve(null);
      }),
    };
  };

  return {
    getMovieApplicationService: mockServiceInstance,
    createMovieApplicationService: mockServiceInstance,
    useMovieService: () => mockServiceInstance(),
  };
});

describe('MoviesContext', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <MoviesProvider>{children}</MoviesProvider>
  );

  // Helper function to wait for initial data load
  const waitForInitialLoad = async () => {
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
  };

  it('should provide initial state correctly', async () => {
    const { result } = renderHook(() => useMovies(), { wrapper });

    // Initially should be loading
    expect(result.current.loading).toBe(true);
    expect(result.current.movies).toHaveLength(0);

    // Wait for movies to load
    await waitForInitialLoad();

    expect(result.current.loading).toBe(false);
    expect(result.current.movies).toHaveLength(3);
    expect(result.current.filteredMovies).toHaveLength(3);
    expect(result.current.showOnlyFavorites).toBe(false);
    expect(result.current.searchQuery).toBe('');
    expect(result.current.searchCriteria).toBe('byTitle');
    expect(result.current.selectedGenre).toBe('Todos los Géneros');
    expect(result.current.sortBy).toBe('');
  });

  it('should filter by favorites', async () => {
    const { result } = renderHook(() => useMovies(), { wrapper });

    // Wait for initial load
    await waitForInitialLoad();

    act(() => {
      result.current.setShowOnlyFavorites(true);
    });

    expect(result.current.showOnlyFavorites).toBe(true);
    expect(result.current.filteredMovies).toHaveLength(2);
    expect(result.current.filteredMovies.every((movie) => movie.favorite)).toBe(
      true
    );
  });

  it('should filter by search query with title criteria', async () => {
    const { result } = renderHook(() => useMovies(), { wrapper });

    // Wait for initial load
    await waitForInitialLoad();

    act(() => {
      result.current.setSearchQuery('Matrix');
      result.current.setSearchCriteria('byTitle');
    });

    expect(result.current.filteredMovies).toHaveLength(1);
    expect(result.current.filteredMovies[0].title).toBe('The Matrix');
  });

  it('should filter by search query with director criteria', async () => {
    const { result } = renderHook(() => useMovies(), { wrapper });
    await waitForInitialLoad();

    act(() => {
      result.current.setSearchQuery('Nolan');
      result.current.setSearchCriteria('byDirector');
    });

    expect(result.current.filteredMovies).toHaveLength(1);
    expect(result.current.filteredMovies[0].director).toBe('Christopher Nolan');
  });

  it('should filter by search query with release date criteria', async () => {
    const { result } = renderHook(() => useMovies(), { wrapper });
    await waitForInitialLoad();

    act(() => {
      result.current.setSearchQuery('1999');
      result.current.setSearchCriteria('byReleaseDate');
    });

    expect(result.current.filteredMovies).toHaveLength(1);
    expect(result.current.filteredMovies[0].title).toBe('The Matrix');
  });

  it('should filter by search query with rating criteria', async () => {
    const { result } = renderHook(() => useMovies(), { wrapper });
    await waitForInitialLoad();

    act(() => {
      result.current.setSearchQuery('9.2');
      result.current.setSearchCriteria('byRating');
    });

    expect(result.current.filteredMovies).toHaveLength(1);
    expect(result.current.filteredMovies[0].title).toBe('The Godfather');
  });

  it('should filter by genre', async () => {
    const { result } = renderHook(() => useMovies(), { wrapper });
    await waitForInitialLoad();

    act(() => {
      result.current.setSelectedGenre('Sci-Fi');
    });

    expect(result.current.filteredMovies).toHaveLength(2);
    expect(
      result.current.filteredMovies.every((movie) => movie.genre === 'Sci-Fi')
    ).toBe(true);
  });

  it('should sort by title', async () => {
    const { result } = renderHook(() => useMovies(), { wrapper });
    await waitForInitialLoad();

    act(() => {
      result.current.setSortBy('Por Título');
    });

    const titles = result.current.filteredMovies.map((movie) => movie.title);
    expect(titles).toEqual(['Inception', 'The Godfather', 'The Matrix']);
  });

  it('should sort by rating', async () => {
    const { result } = renderHook(() => useMovies(), { wrapper });
    await waitForInitialLoad();

    act(() => {
      result.current.setSortBy('Por Calificación');
    });

    const ratings = result.current.filteredMovies.map((movie) => movie.rating);
    expect(ratings).toEqual([9.2, 8.8, 8.7]); // Descendente
  });

  it('should toggle favorite status', async () => {
    const { result } = renderHook(() => useMovies(), { wrapper });
    await waitForInitialLoad();

    const initialFavoriteStatus = result.current.movies[1].favorite; // Inception (false)

    await act(async () => {
      await result.current.toggleFavorite('2');
    });

    expect(result.current.movies[1].favorite).toBe(!initialFavoriteStatus);
  });

  it('should combine multiple filters', async () => {
    const { result } = renderHook(() => useMovies(), { wrapper });
    await waitForInitialLoad();

    act(() => {
      result.current.setShowOnlyFavorites(true);
      result.current.setSelectedGenre('Sci-Fi');
    });

    // Should only show favorite Sci-Fi movies
    expect(result.current.filteredMovies).toHaveLength(1);
    expect(result.current.filteredMovies[0].title).toBe('The Matrix');
    expect(result.current.filteredMovies[0].favorite).toBe(true);
    expect(result.current.filteredMovies[0].genre).toBe('Sci-Fi');
  });

  it('should combine search with other filters', async () => {
    const { result } = renderHook(() => useMovies(), { wrapper });
    await waitForInitialLoad();

    act(() => {
      result.current.setSearchQuery('Matrix');
      result.current.setSearchCriteria('byTitle');
      result.current.setShowOnlyFavorites(true);
    });

    // Solo debería encontrar "The Matrix" porque es favorita y tiene "Matrix" en el título
    expect(result.current.filteredMovies).toHaveLength(1);
    expect(result.current.filteredMovies[0].title).toBe('The Matrix');
  });
});
