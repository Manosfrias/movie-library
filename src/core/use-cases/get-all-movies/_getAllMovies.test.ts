import type { Movie } from '@/core/models/movie';
import type { MovieRepository } from '@/core/models/repository';
import { describe, expect, it, vi } from 'vitest';
import { createGetAllMoviesUseCase } from './getAllMovies';

const mockMovies: Movie[] = [
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
];

describe('GetAllMoviesUseCase', () => {
  it('should return all movies successfully', async () => {
    const mockRepository: MovieRepository = {
      findAll: vi.fn().mockResolvedValue(mockMovies),
      findById: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };

    const useCase = createGetAllMoviesUseCase(mockRepository);
    const result = await useCase.execute();

    expect(result).toEqual(mockMovies);
    expect(mockRepository.findAll).toHaveBeenCalledOnce();
  });

  it('should handle repository errors', async () => {
    const mockRepository: MovieRepository = {
      findAll: vi.fn().mockRejectedValue(new Error('Database error')),
      findById: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };

    const useCase = createGetAllMoviesUseCase(mockRepository);

    await expect(useCase.execute()).rejects.toThrow(
      'Failed to retrieve movies'
    );
    expect(mockRepository.findAll).toHaveBeenCalledOnce();
  });
});
