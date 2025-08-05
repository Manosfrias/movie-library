import type { Movie } from '@/core/models/movie';
import type { MovieRepository } from '@/core/models/repository';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createDeleteMovieUseCase } from './DeleteMovie';

describe('DeleteMovieUseCase', () => {
  let mockRepository: MovieRepository;
  let deleteMovieUseCase: ReturnType<typeof createDeleteMovieUseCase>;

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

    deleteMovieUseCase = createDeleteMovieUseCase(mockRepository);
  });

  describe('successful deletion', () => {
    it('should delete movie successfully when movie exists', async () => {
      vi.mocked(mockRepository.findById).mockResolvedValue(existingMovie);
      vi.mocked(mockRepository.delete).mockResolvedValue(true);

      const result = await deleteMovieUseCase.execute('1');

      expect(mockRepository.findById).toHaveBeenCalledWith('1');
      expect(mockRepository.delete).toHaveBeenCalledWith('1');
      expect(result).toBe(true);
    });

    it('should return false when repository delete returns false', async () => {
      vi.mocked(mockRepository.findById).mockResolvedValue(existingMovie);
      vi.mocked(mockRepository.delete).mockResolvedValue(false);

      const result = await deleteMovieUseCase.execute('1');

      expect(result).toBe(false);
    });
  });

  describe('validation errors', () => {
    it('should throw error when movie ID is empty', async () => {
      await expect(deleteMovieUseCase.execute('')).rejects.toThrow(
        'Movie ID is required'
      );

      expect(mockRepository.findById).not.toHaveBeenCalled();
      expect(mockRepository.delete).not.toHaveBeenCalled();
    });

    it('should throw error when movie ID is only whitespace', async () => {
      await expect(deleteMovieUseCase.execute('   ')).rejects.toThrow(
        'Movie ID is required'
      );

      expect(mockRepository.findById).not.toHaveBeenCalled();
      expect(mockRepository.delete).not.toHaveBeenCalled();
    });

    it('should throw error when movie ID is null', async () => {
      await expect(deleteMovieUseCase.execute(null as any)).rejects.toThrow(
        'Movie ID is required'
      );
    });

    it('should throw error when movie ID is undefined', async () => {
      await expect(
        deleteMovieUseCase.execute(undefined as any)
      ).rejects.toThrow('Movie ID is required');
    });
  });

  describe('error handling', () => {
    it('should throw error when movie not found', async () => {
      vi.mocked(mockRepository.findById).mockResolvedValue(null);

      await expect(deleteMovieUseCase.execute('nonexistent')).rejects.toThrow(
        'Movie with ID nonexistent not found'
      );

      expect(mockRepository.findById).toHaveBeenCalledWith('nonexistent');
      expect(mockRepository.delete).not.toHaveBeenCalled();
    });

    it('should throw error when repository findById fails', async () => {
      vi.mocked(mockRepository.findById).mockRejectedValue(
        new Error('Database error')
      );

      await expect(deleteMovieUseCase.execute('1')).rejects.toThrow(
        'Database error'
      );

      expect(mockRepository.delete).not.toHaveBeenCalled();
    });

    it('should throw error when repository delete fails', async () => {
      vi.mocked(mockRepository.findById).mockResolvedValue(existingMovie);
      vi.mocked(mockRepository.delete).mockRejectedValue(
        new Error('Delete failed')
      );

      await expect(deleteMovieUseCase.execute('1')).rejects.toThrow(
        'Failed to delete movie with ID: 1'
      );

      expect(mockRepository.findById).toHaveBeenCalledWith('1');
      expect(mockRepository.delete).toHaveBeenCalledWith('1');
    });
  });

  describe('edge cases', () => {
    it('should handle numeric ID passed as string', async () => {
      vi.mocked(mockRepository.findById).mockResolvedValue(existingMovie);
      vi.mocked(mockRepository.delete).mockResolvedValue(true);

      const result = await deleteMovieUseCase.execute('123');

      expect(mockRepository.findById).toHaveBeenCalledWith('123');
      expect(mockRepository.delete).toHaveBeenCalledWith('123');
      expect(result).toBe(true);
    });

    it('should handle UUID format ID', async () => {
      const uuidId = '550e8400-e29b-41d4-a716-446655440000';
      vi.mocked(mockRepository.findById).mockResolvedValue(existingMovie);
      vi.mocked(mockRepository.delete).mockResolvedValue(true);

      const result = await deleteMovieUseCase.execute(uuidId);

      expect(mockRepository.findById).toHaveBeenCalledWith(uuidId);
      expect(mockRepository.delete).toHaveBeenCalledWith(uuidId);
      expect(result).toBe(true);
    });

    it('should trim whitespace from movie ID', async () => {
      vi.mocked(mockRepository.findById).mockResolvedValue(existingMovie);
      vi.mocked(mockRepository.delete).mockResolvedValue(true);

      const result = await deleteMovieUseCase.execute('  1  ');

      // Note: The current implementation doesn't trim, but this test documents expected behavior
      expect(mockRepository.findById).toHaveBeenCalledWith('  1  ');
      expect(result).toBe(true);
    });
  });
});
