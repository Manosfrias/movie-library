import type { Movie } from '@/core/models/movie';
import type { MovieRepository } from '@/core/models/repository';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createGetMovieByIdUseCase } from './GetMovieById';

describe('GetMovieByIdUseCase', () => {
  let mockRepository: MovieRepository;
  let getMovieByIdUseCase: ReturnType<typeof createGetMovieByIdUseCase>;

  const existingMovie: Movie = {
    id: '1',
    title: 'The Matrix',
    director: 'The Wachowskis',
    genre: 'Sci-Fi',
    releaseYear: 1999,
    rating: 8.7,
    favorite: false,
  };

  beforeEach(() => {
    mockRepository = {
      findById: vi.fn(),
      update: vi.fn(),
      create: vi.fn(),
      delete: vi.fn(),
      findAll: vi.fn(),
    };

    getMovieByIdUseCase = createGetMovieByIdUseCase(mockRepository);
  });

  describe('successful retrieval', () => {
    it('should return movie when found', async () => {
      vi.mocked(mockRepository.findById).mockResolvedValue(existingMovie);

      const result = await getMovieByIdUseCase.execute('1');

      expect(mockRepository.findById).toHaveBeenCalledWith('1');
      expect(result).toEqual(existingMovie);
    });

    it('should return null when movie not found', async () => {
      vi.mocked(mockRepository.findById).mockResolvedValue(null);

      const result = await getMovieByIdUseCase.execute('nonexistent');

      expect(mockRepository.findById).toHaveBeenCalledWith('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle different ID formats', async () => {
      const uuidId = '550e8400-e29b-41d4-a716-446655440000';
      vi.mocked(mockRepository.findById).mockResolvedValue(existingMovie);

      const result = await getMovieByIdUseCase.execute(uuidId);

      expect(mockRepository.findById).toHaveBeenCalledWith(uuidId);
      expect(result).toEqual(existingMovie);
    });

    it('should handle numeric ID passed as string', async () => {
      vi.mocked(mockRepository.findById).mockResolvedValue(existingMovie);

      const result = await getMovieByIdUseCase.execute('123');

      expect(mockRepository.findById).toHaveBeenCalledWith('123');
      expect(result).toEqual(existingMovie);
    });
  });

  describe('validation errors', () => {
    it('should throw error when movie ID is empty', async () => {
      await expect(getMovieByIdUseCase.execute('')).rejects.toThrow(
        'Movie ID is required'
      );

      expect(mockRepository.findById).not.toHaveBeenCalled();
    });

    it('should throw error when movie ID is only whitespace', async () => {
      await expect(getMovieByIdUseCase.execute('   ')).rejects.toThrow(
        'Movie ID is required'
      );

      expect(mockRepository.findById).not.toHaveBeenCalled();
    });

    it('should throw error when movie ID is null', async () => {
      await expect(getMovieByIdUseCase.execute(null as any)).rejects.toThrow(
        'Movie ID is required'
      );

      expect(mockRepository.findById).not.toHaveBeenCalled();
    });

    it('should throw error when movie ID is undefined', async () => {
      await expect(
        getMovieByIdUseCase.execute(undefined as any)
      ).rejects.toThrow('Movie ID is required');

      expect(mockRepository.findById).not.toHaveBeenCalled();
    });
  });

  describe('error handling', () => {
    it('should throw error when repository fails', async () => {
      vi.mocked(mockRepository.findById).mockRejectedValue(
        new Error('Database connection failed')
      );

      await expect(getMovieByIdUseCase.execute('1')).rejects.toThrow(
        'Failed to retrieve movie with ID: 1'
      );

      expect(mockRepository.findById).toHaveBeenCalledWith('1');
    });

    it('should throw error when repository throws custom error', async () => {
      vi.mocked(mockRepository.findById).mockRejectedValue(
        new Error('Movie not accessible')
      );

      await expect(getMovieByIdUseCase.execute('restricted')).rejects.toThrow(
        'Failed to retrieve movie with ID: restricted'
      );
    });

    it('should handle repository throwing non-Error objects', async () => {
      vi.mocked(mockRepository.findById).mockRejectedValue('String error');

      await expect(getMovieByIdUseCase.execute('1')).rejects.toThrow(
        'Failed to retrieve movie with ID: 1'
      );
    });
  });

  describe('edge cases', () => {
    it('should handle very long IDs', async () => {
      const longId = 'a'.repeat(1000);
      vi.mocked(mockRepository.findById).mockResolvedValue(null);

      const result = await getMovieByIdUseCase.execute(longId);

      expect(mockRepository.findById).toHaveBeenCalledWith(longId);
      expect(result).toBeNull();
    });

    it('should handle special characters in ID', async () => {
      const specialId = 'movie-123_test@domain.com';
      vi.mocked(mockRepository.findById).mockResolvedValue(existingMovie);

      const result = await getMovieByIdUseCase.execute(specialId);

      expect(mockRepository.findById).toHaveBeenCalledWith(specialId);
      expect(result).toEqual(existingMovie);
    });

    it('should preserve movie data integrity', async () => {
      const movieWithAllFields: Movie = {
        id: '1',
        title: 'Complete Movie',
        director: 'Test Director',
        genre: 'Drama',
        releaseYear: 2023,
        rating: 7.5,
        favorite: true,
      };

      vi.mocked(mockRepository.findById).mockResolvedValue(movieWithAllFields);

      const result = await getMovieByIdUseCase.execute('1');

      expect(result).toEqual(movieWithAllFields);
      expect(result?.favorite).toBe(true);
      expect(result?.rating).toBe(7.5);
    });
  });
});
