import type { Movie } from '@/core/models/movie';
import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useMovieOfTheDay } from './useMovieOfTheDay';
import * as movieServiceModule from './useMovieService';

vi.mock('./useMovieService');

const mockMovie: Movie = {
  id: '1',
  title: 'Test Favorite Movie',
  releaseYear: 2020,
  genre: 'Drama',
  director: 'Test Director',
  rating: 8.5,
  favorite: true,
};

describe('useMovieOfTheDay', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.resetAllMocks();
  });

  it('should return loading state initially', () => {
    const mockMovieService = {
      getMovieOfTheDay: vi.fn().mockResolvedValue(mockMovie),
      getAllMovies: vi.fn(),
      getMovieById: vi.fn(),
      createMovie: vi.fn(),
      updateMovie: vi.fn(),
      deleteMovie: vi.fn(),
      toggleMovieFavorite: vi.fn(),
    };

    vi.mocked(movieServiceModule.useMovieService).mockReturnValue(
      mockMovieService
    );

    const { result } = renderHook(() => useMovieOfTheDay());

    expect(result.current.loading).toBe(true);
    expect(result.current.movieOfTheDay).toBe(null);
    expect(result.current.error).toBe(null);
  });

  it('should load movie of the day successfully', async () => {
    const mockMovieService = {
      getMovieOfTheDay: vi.fn().mockResolvedValue(mockMovie),
      getAllMovies: vi.fn(),
      getMovieById: vi.fn(),
      createMovie: vi.fn(),
      updateMovie: vi.fn(),
      deleteMovie: vi.fn(),
      toggleMovieFavorite: vi.fn(),
    };

    vi.mocked(movieServiceModule.useMovieService).mockReturnValue(
      mockMovieService
    );

    const { result } = renderHook(() => useMovieOfTheDay());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.movieOfTheDay).toEqual(mockMovie);
    expect(result.current.error).toBe(null);
    expect(mockMovieService.getMovieOfTheDay).toHaveBeenCalledOnce();
  });

  it('should handle error when no favorite movies available', async () => {
    const mockMovieService = {
      getMovieOfTheDay: vi.fn().mockResolvedValue(null),
      getAllMovies: vi.fn(),
      getMovieById: vi.fn(),
      createMovie: vi.fn(),
      updateMovie: vi.fn(),
      deleteMovie: vi.fn(),
      toggleMovieFavorite: vi.fn(),
    };

    vi.mocked(movieServiceModule.useMovieService).mockReturnValue(
      mockMovieService
    );

    const { result } = renderHook(() => useMovieOfTheDay());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.movieOfTheDay).toBe(null);
    expect(result.current.error).toBe('No hay películas favoritas disponibles');
  });

  it('should handle service errors gracefully', async () => {
    const mockMovieService = {
      getMovieOfTheDay: vi.fn().mockRejectedValue(new Error('Service error')),
      getAllMovies: vi.fn(),
      getMovieById: vi.fn(),
      createMovie: vi.fn(),
      updateMovie: vi.fn(),
      deleteMovie: vi.fn(),
      toggleMovieFavorite: vi.fn(),
    };

    vi.mocked(movieServiceModule.useMovieService).mockReturnValue(
      mockMovieService
    );

    const { result } = renderHook(() => useMovieOfTheDay());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.movieOfTheDay).toBe(null);
    expect(result.current.error).toBe('Error al cargar la película del día');
  });

  it('should store movie data after successful load', async () => {
    const mockMovieService = {
      getMovieOfTheDay: vi.fn().mockResolvedValue(mockMovie),
      getAllMovies: vi.fn(),
      getMovieById: vi.fn(),
      createMovie: vi.fn(),
      updateMovie: vi.fn(),
      deleteMovie: vi.fn(),
      toggleMovieFavorite: vi.fn(),
    };

    vi.mocked(movieServiceModule.useMovieService).mockReturnValue(
      mockMovieService
    );

    const { result } = renderHook(() => useMovieOfTheDay());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.movieOfTheDay).toEqual(mockMovie);
    expect(result.current.error).toBe(null);
    expect(mockMovieService.getMovieOfTheDay).toHaveBeenCalledOnce();
  });

  it('should fetch new movie when cached data is from previous day', async () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    localStorage.setItem('movie-of-the-day', JSON.stringify(mockMovie));
    localStorage.setItem('movie-of-the-day-date', yesterday.toISOString());

    const newMockMovie = { ...mockMovie, title: 'New Movie of the Day' };
    const mockMovieService = {
      getMovieOfTheDay: vi.fn().mockResolvedValue(newMockMovie),
      getAllMovies: vi.fn(),
      getMovieById: vi.fn(),
      createMovie: vi.fn(),
      updateMovie: vi.fn(),
      deleteMovie: vi.fn(),
      toggleMovieFavorite: vi.fn(),
    };

    vi.mocked(movieServiceModule.useMovieService).mockReturnValue(
      mockMovieService
    );

    const { result } = renderHook(() => useMovieOfTheDay());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.movieOfTheDay).toEqual(newMockMovie);
    expect(mockMovieService.getMovieOfTheDay).toHaveBeenCalledOnce();
  });
});
