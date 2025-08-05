import type { Movie } from '@/core/models/movie';
import type { MovieRepository } from '@/core/models/repository';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createGetMovieOfTheDayUseCase } from './getMovieOfTheDay';

describe('GetMovieOfTheDayUseCase', () => {
  let mockRepository: MovieRepository;
  let useCase: ReturnType<typeof createGetMovieOfTheDayUseCase>;

  const mockMovies: Movie[] = [
    {
      id: '1',
      title: 'Favorite Movie 1',
      releaseYear: 2020,
      genre: 'Drama',
      director: 'Director 1',
      rating: 8.5,
      favorite: true,
    },
    {
      id: '2',
      title: 'Regular Movie',
      releaseYear: 2021,
      genre: 'Action',
      director: 'Director 2',
      rating: 7.0,
      favorite: false,
    },
    {
      id: '3',
      title: 'Favorite Movie 2',
      releaseYear: 2022,
      genre: 'Comedy',
      director: 'Director 3',
      rating: 9.0,
      favorite: true,
    },
  ];

  beforeEach(() => {
    mockRepository = {
      findAll: vi.fn(),
      findById: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };

    useCase = createGetMovieOfTheDayUseCase(mockRepository);
  });

  it('should return a random favorite movie based on day of year', async () => {
    mockRepository.findAll = vi.fn().mockResolvedValue(mockMovies);

    const result = await useCase();

    expect(result).toBeTruthy();
    expect(result?.favorite).toBe(true);
    expect(mockRepository.findAll).toHaveBeenCalledOnce();
  });

  it('should return null when no favorite movies exist', async () => {
    const nonFavoriteMovies = mockMovies.map((movie) => ({
      ...movie,
      favorite: false,
    }));
    mockRepository.findAll = vi.fn().mockResolvedValue(nonFavoriteMovies);

    const result = await useCase();

    expect(result).toBeNull();
  });

  it('should return null when no movies exist', async () => {
    mockRepository.findAll = vi.fn().mockResolvedValue([]);

    const result = await useCase();

    expect(result).toBeNull();
  });

  it('should handle repository errors gracefully', async () => {
    mockRepository.findAll = vi
      .fn()
      .mockRejectedValue(new Error('Database error'));

    const result = await useCase();

    expect(result).toBeNull();
  });

  it('should return same movie for same day', async () => {
    mockRepository.findAll = vi.fn().mockResolvedValue(mockMovies);

    const result1 = await useCase();
    const result2 = await useCase();

    expect(result1).toEqual(result2);
  });
});
