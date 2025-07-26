import { render, renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MoviesProvider, useMovies } from './MoviesContext';
import { Movie } from '../models/movie';

// Mock de las películas de ejemplo
vi.mock('../../../sample', () => ({
  sampleMovies: [
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
  ],
}));

describe('MoviesContext', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <MoviesProvider>{children}</MoviesProvider>
  );

  it('should provide initial state correctly', () => {
    const { result } = renderHook(() => useMovies(), { wrapper });

    expect(result.current.movies).toHaveLength(3);
    expect(result.current.filteredMovies).toHaveLength(3);
    expect(result.current.loading).toBe(false);
    expect(result.current.showOnlyFavorites).toBe(false);
    expect(result.current.searchQuery).toBe('');
    expect(result.current.searchCriteria).toBe('byTitle');
    expect(result.current.selectedGenre).toBe('All Genres');
    expect(result.current.sortBy).toBe('');
  });

  it('should filter by favorites', () => {
    const { result } = renderHook(() => useMovies(), { wrapper });

    act(() => {
      result.current.setShowOnlyFavorites(true);
    });

    expect(result.current.showOnlyFavorites).toBe(true);
    expect(result.current.filteredMovies).toHaveLength(2);
    expect(result.current.filteredMovies.every((movie) => movie.favorite)).toBe(
      true
    );
  });

  it('should filter by search query with title criteria', () => {
    const { result } = renderHook(() => useMovies(), { wrapper });

    act(() => {
      result.current.setSearchQuery('Matrix');
      result.current.setSearchCriteria('byTitle');
    });

    expect(result.current.filteredMovies).toHaveLength(1);
    expect(result.current.filteredMovies[0].title).toBe('The Matrix');
  });

  it('should filter by search query with director criteria', () => {
    const { result } = renderHook(() => useMovies(), { wrapper });

    act(() => {
      result.current.setSearchQuery('Nolan');
      result.current.setSearchCriteria('byDirector');
    });

    expect(result.current.filteredMovies).toHaveLength(1);
    expect(result.current.filteredMovies[0].director).toBe('Christopher Nolan');
  });

  it('should filter by genre', () => {
    const { result } = renderHook(() => useMovies(), { wrapper });

    act(() => {
      result.current.setSelectedGenre('Sci-Fi');
    });

    expect(result.current.filteredMovies).toHaveLength(2);
    expect(
      result.current.filteredMovies.every((movie) => movie.genre === 'Sci-Fi')
    ).toBe(true);
  });

  it('should sort by title', () => {
    const { result } = renderHook(() => useMovies(), { wrapper });

    act(() => {
      result.current.setSortBy('Por Título');
    });

    const titles = result.current.filteredMovies.map((movie) => movie.title);
    expect(titles).toEqual(['Inception', 'The Godfather', 'The Matrix']);
  });

  it('should sort by rating', () => {
    const { result } = renderHook(() => useMovies(), { wrapper });

    act(() => {
      result.current.setSortBy('Por Calificación');
    });

    const ratings = result.current.filteredMovies.map((movie) => movie.rating);
    expect(ratings).toEqual([9.2, 8.8, 8.7]); // Descendente
  });

  it('should toggle favorite status', () => {
    const { result } = renderHook(() => useMovies(), { wrapper });

    const initialFavoriteStatus = result.current.movies[1].favorite; // Inception (false)

    act(() => {
      result.current.toggleFavorite('2');
    });

    expect(result.current.movies[1].favorite).toBe(!initialFavoriteStatus);
  });

  it('should combine multiple filters', () => {
    const { result } = renderHook(() => useMovies(), { wrapper });

    act(() => {
      result.current.setShowOnlyFavorites(true);
      result.current.setSelectedGenre('Sci-Fi');
    });

    expect(result.current.filteredMovies).toHaveLength(1);
    expect(result.current.filteredMovies[0].title).toBe('The Matrix');
    expect(result.current.filteredMovies[0].favorite).toBe(true);
    expect(result.current.filteredMovies[0].genre).toBe('Sci-Fi');
  });
});
