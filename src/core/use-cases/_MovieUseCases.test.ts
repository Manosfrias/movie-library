import { describe, it, expect, vi } from 'vitest';
import { createMovieUseCases } from './MovieUseCases';
import type { MovieRepository } from '@/core/models/repository';

describe('MovieUseCases Integration', () => {
  const mockRepository: MovieRepository = {
    findAll: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  };

  it('should include all use cases including toggleFavorite', () => {
    const useCases = createMovieUseCases(mockRepository);

    expect(useCases).toHaveProperty('getAllMovies');
    expect(useCases).toHaveProperty('getMovieById');
    expect(useCases).toHaveProperty('createMovie');
    expect(useCases).toHaveProperty('updateMovie');
    expect(useCases).toHaveProperty('deleteMovie');
    expect(useCases).toHaveProperty('toggleFavorite');
  });

  it('should have executable use cases', () => {
    const useCases = createMovieUseCases(mockRepository);

    expect(typeof useCases.getAllMovies.execute).toBe('function');
    expect(typeof useCases.getMovieById.execute).toBe('function');
    expect(typeof useCases.createMovie.execute).toBe('function');
    expect(typeof useCases.updateMovie.execute).toBe('function');
    expect(typeof useCases.deleteMovie.execute).toBe('function');
    expect(typeof useCases.toggleFavorite.execute).toBe('function');
  });

  it('should create toggleFavorite use case with proper interface', () => {
    const useCases = createMovieUseCases(mockRepository);

    expect(useCases.toggleFavorite).toEqual({
      execute: expect.any(Function)
    });
  });
});
