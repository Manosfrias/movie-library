import type { Movie } from '@/core/models/movie';
import type { MovieRepository } from '@/core/models/repository';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createUpdateMovieUseCase } from './UpdateMovie';

describe('UpdateMovieUseCase', () => {
  let mockRepository: MovieRepository;
  let updateMovieUseCase: ReturnType<typeof createUpdateMovieUseCase>;

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

    updateMovieUseCase = createUpdateMovieUseCase(mockRepository);
  });

  describe('successful updates', () => {
    it('should update movie title successfully', async () => {
      const updatedMovie = { ...existingMovie, title: 'The Matrix Reloaded' };
      
      vi.mocked(mockRepository.findById).mockResolvedValue(existingMovie);
      vi.mocked(mockRepository.update).mockResolvedValue(updatedMovie);

      const result = await updateMovieUseCase.execute('1', { title: 'The Matrix Reloaded' });

      expect(mockRepository.findById).toHaveBeenCalledWith('1');
      expect(mockRepository.update).toHaveBeenCalledWith('1', expect.objectContaining({
        title: 'The Matrix Reloaded'
      }));
      expect(result).toEqual(updatedMovie);
    });

    it('should update multiple fields successfully', async () => {
      const updatedMovie = { 
        ...existingMovie, 
        title: 'Inception', 
        director: 'Christopher Nolan',
        rating: 8.8 
      };
      
      vi.mocked(mockRepository.findById).mockResolvedValue(existingMovie);
      vi.mocked(mockRepository.update).mockResolvedValue(updatedMovie);

      const result = await updateMovieUseCase.execute('1', { 
        title: 'Inception',
        director: 'Christopher Nolan',
        rating: 8.8
      });

      expect(result).toEqual(updatedMovie);
    });

    it('should update only provided fields, keeping others unchanged', async () => {
      const updatedMovie = { ...existingMovie, rating: 9.0 };
      
      vi.mocked(mockRepository.findById).mockResolvedValue(existingMovie);
      vi.mocked(mockRepository.update).mockResolvedValue(updatedMovie);

      const result = await updateMovieUseCase.execute('1', { rating: 9.0 });

      expect(mockRepository.update).toHaveBeenCalledWith('1', expect.objectContaining({
        id: '1',
        title: 'The Matrix', // unchanged
        director: 'The Wachowskis', // unchanged
        rating: 9.0, // updated
      }));
      expect(result).toEqual(updatedMovie);
    });

    it('should trim string fields when updating', async () => {
      const updatedMovie = { ...existingMovie, title: 'Trimmed Title' };
      
      vi.mocked(mockRepository.findById).mockResolvedValue(existingMovie);
      vi.mocked(mockRepository.update).mockResolvedValue(updatedMovie);

      await updateMovieUseCase.execute('1', { title: '  Trimmed Title  ' });

      expect(mockRepository.update).toHaveBeenCalledWith('1', expect.objectContaining({
        title: 'Trimmed Title'
      }));
    });
  });

  describe('validation errors', () => {
    beforeEach(() => {
      vi.mocked(mockRepository.findById).mockResolvedValue(existingMovie);
    });

    it('should throw error for invalid title', async () => {
      await expect(updateMovieUseCase.execute('1', { title: '' }))
        .rejects.toThrow();
    });

    it('should throw error for invalid director', async () => {
      await expect(updateMovieUseCase.execute('1', { director: '' }))
        .rejects.toThrow();
    });

    it('should throw error for invalid genre', async () => {
      await expect(updateMovieUseCase.execute('1', { genre: '' }))
        .rejects.toThrow();
    });

    it('should throw error for invalid release year', async () => {
      await expect(updateMovieUseCase.execute('1', { releaseYear: 1799 }))
        .rejects.toThrow();
    });

    it('should throw error for invalid rating', async () => {
      await expect(updateMovieUseCase.execute('1', { rating: -1 }))
        .rejects.toThrow();

      await expect(updateMovieUseCase.execute('1', { rating: 11 }))
        .rejects.toThrow();
    });
  });

  describe('error handling', () => {
    it('should throw error when movie ID is empty', async () => {
      await expect(updateMovieUseCase.execute('', { title: 'New Title' }))
        .rejects.toThrow('Movie ID is required');
    });

    it('should throw error when movie ID is only whitespace', async () => {
      await expect(updateMovieUseCase.execute('   ', { title: 'New Title' }))
        .rejects.toThrow('Movie ID is required');
    });

    it('should throw error when movie not found', async () => {
      vi.mocked(mockRepository.findById).mockResolvedValue(null);

      await expect(updateMovieUseCase.execute('nonexistent', { title: 'New Title' }))
        .rejects.toThrow('Movie with ID nonexistent not found');
    });

    it('should throw error when repository update fails', async () => {
      vi.mocked(mockRepository.findById).mockResolvedValue(existingMovie);
      vi.mocked(mockRepository.update).mockRejectedValue(new Error('Database error'));

      await expect(updateMovieUseCase.execute('1', { title: 'New Title' }))
        .rejects.toThrow('Failed to update movie with ID: 1');
    });
  });

  describe('edge cases', () => {
    it('should handle undefined values in update data', async () => {
      const updatedMovie = { ...existingMovie };
      
      vi.mocked(mockRepository.findById).mockResolvedValue(existingMovie);
      vi.mocked(mockRepository.update).mockResolvedValue(updatedMovie);

      const result = await updateMovieUseCase.execute('1', { 
        title: undefined,
        director: undefined 
      });

      expect(mockRepository.update).toHaveBeenCalledWith('1', expect.objectContaining({
        title: existingMovie.title, // unchanged
        director: existingMovie.director, // unchanged
      }));
      expect(result).toEqual(updatedMovie);
    });

    it('should handle empty update object', async () => {
      const updatedMovie = { ...existingMovie };
      
      vi.mocked(mockRepository.findById).mockResolvedValue(existingMovie);
      vi.mocked(mockRepository.update).mockResolvedValue(updatedMovie);

      const result = await updateMovieUseCase.execute('1', {});

      expect(mockRepository.update).toHaveBeenCalledWith('1', existingMovie);
      expect(result).toEqual(updatedMovie);
    });
  });
});
