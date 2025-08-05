import type { Movie } from '@/core/models/movie';
import type { MovieRepository } from '@/core/models/repository';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createToggleFavoriteUseCase } from './ToggleFavorite';

describe('ToggleFavoriteUseCase', () => {
  let mockRepository: MovieRepository;
  let toggleFavoriteUseCase: ReturnType<typeof createToggleFavoriteUseCase>;

  const nonFavoriteMovie: Movie = {
    id: '1',
    title: 'The Matrix',
    director: 'The Wachowskis',
    genre: 'Sci-Fi',
    releaseYear: 1999,
    rating: 8.7,
    favorite: false,
  };

  const favoriteMovie: Movie = {
    ...nonFavoriteMovie,
    favorite: true,
  };

  beforeEach(() => {
    mockRepository = {
      findById: vi.fn(),
      update: vi.fn(),
      create: vi.fn(),
      delete: vi.fn(),
      findAll: vi.fn(),
    };

    toggleFavoriteUseCase = createToggleFavoriteUseCase(mockRepository);
  });

  describe('successful toggle operations', () => {
    it('should toggle favorite from false to true', async () => {
      const updatedMovie = { ...nonFavoriteMovie, favorite: true };
      
      vi.mocked(mockRepository.findById).mockResolvedValue(nonFavoriteMovie);
      vi.mocked(mockRepository.update).mockResolvedValue(updatedMovie);

      const result = await toggleFavoriteUseCase.execute('1');

      expect(mockRepository.findById).toHaveBeenCalledWith('1');
      expect(mockRepository.update).toHaveBeenCalledWith('1', expect.objectContaining({
        id: '1',
        favorite: true,
        title: 'The Matrix',
        director: 'The Wachowskis',
      }));
      expect(result).toEqual(updatedMovie);
      expect(result?.favorite).toBe(true);
    });

    it('should toggle favorite from true to false', async () => {
      const updatedMovie = { ...favoriteMovie, favorite: false };
      
      vi.mocked(mockRepository.findById).mockResolvedValue(favoriteMovie);
      vi.mocked(mockRepository.update).mockResolvedValue(updatedMovie);

      const result = await toggleFavoriteUseCase.execute('1');

      expect(mockRepository.findById).toHaveBeenCalledWith('1');
      expect(mockRepository.update).toHaveBeenCalledWith('1', expect.objectContaining({
        id: '1',
        favorite: false,
        title: 'The Matrix',
        director: 'The Wachowskis',
      }));
      expect(result).toEqual(updatedMovie);
      expect(result?.favorite).toBe(false);
    });

    it('should preserve all other movie properties when toggling', async () => {
      const updatedMovie = { ...nonFavoriteMovie, favorite: true };
      
      vi.mocked(mockRepository.findById).mockResolvedValue(nonFavoriteMovie);
      vi.mocked(mockRepository.update).mockResolvedValue(updatedMovie);

      const result = await toggleFavoriteUseCase.execute('1');

      expect(result).toEqual(expect.objectContaining({
        id: '1',
        title: 'The Matrix',
        director: 'The Wachowskis',
        genre: 'Sci-Fi',
        releaseYear: 1999,
        rating: 8.7,
        favorite: true,
      }));
    });

    it('should handle movie with undefined favorite property', async () => {
      const movieWithUndefinedFavorite = { ...nonFavoriteMovie };
      delete (movieWithUndefinedFavorite as any).favorite;
      
      const updatedMovie = { ...movieWithUndefinedFavorite, favorite: true };
      
      vi.mocked(mockRepository.findById).mockResolvedValue(movieWithUndefinedFavorite);
      vi.mocked(mockRepository.update).mockResolvedValue(updatedMovie);

      const result = await toggleFavoriteUseCase.execute('1');

      expect(mockRepository.update).toHaveBeenCalledWith('1', expect.objectContaining({
        favorite: true, // undefined becomes true when toggled
      }));
      expect(result?.favorite).toBe(true);
    });
  });

  describe('validation errors', () => {
    it('should throw error when movie ID is empty', async () => {
      await expect(toggleFavoriteUseCase.execute(''))
        .rejects.toThrow('Movie ID is required');
      
      expect(mockRepository.findById).not.toHaveBeenCalled();
      expect(mockRepository.update).not.toHaveBeenCalled();
    });

    it('should throw error when movie ID is only whitespace', async () => {
      await expect(toggleFavoriteUseCase.execute('   '))
        .rejects.toThrow('Movie ID is required');
      
      expect(mockRepository.findById).not.toHaveBeenCalled();
      expect(mockRepository.update).not.toHaveBeenCalled();
    });

    it('should throw error when movie ID is null', async () => {
      await expect(toggleFavoriteUseCase.execute(null as any))
        .rejects.toThrow('Movie ID is required');
    });

    it('should throw error when movie ID is undefined', async () => {
      await expect(toggleFavoriteUseCase.execute(undefined as any))
        .rejects.toThrow('Movie ID is required');
    });
  });

  describe('error handling', () => {
    it('should throw error when movie not found', async () => {
      vi.mocked(mockRepository.findById).mockResolvedValue(null);

      await expect(toggleFavoriteUseCase.execute('nonexistent'))
        .rejects.toThrow('Movie with ID nonexistent not found');
      
      expect(mockRepository.findById).toHaveBeenCalledWith('nonexistent');
      expect(mockRepository.update).not.toHaveBeenCalled();
    });

    it('should throw error when repository findById fails', async () => {
      vi.mocked(mockRepository.findById).mockRejectedValue(new Error('Database error'));

      await expect(toggleFavoriteUseCase.execute('1'))
        .rejects.toThrow('Database error');
      
      expect(mockRepository.update).not.toHaveBeenCalled();
    });

    it('should throw error when repository update fails', async () => {
      vi.mocked(mockRepository.findById).mockResolvedValue(nonFavoriteMovie);
      vi.mocked(mockRepository.update).mockRejectedValue(new Error('Update failed'));

      await expect(toggleFavoriteUseCase.execute('1'))
        .rejects.toThrow('Failed to toggle favorite for movie with ID: 1');
      
      expect(mockRepository.findById).toHaveBeenCalledWith('1');
      expect(mockRepository.update).toHaveBeenCalled();
    });
  });

  describe('edge cases', () => {
    it('should handle multiple rapid toggle operations', async () => {
      vi.mocked(mockRepository.findById)
        .mockResolvedValueOnce(nonFavoriteMovie)
        .mockResolvedValueOnce(favoriteMovie);
      
      vi.mocked(mockRepository.update)
        .mockResolvedValueOnce({ ...nonFavoriteMovie, favorite: true })
        .mockResolvedValueOnce({ ...favoriteMovie, favorite: false });

      const result1 = await toggleFavoriteUseCase.execute('1');
      const result2 = await toggleFavoriteUseCase.execute('1');

      expect(result1?.favorite).toBe(true);
      expect(result2?.favorite).toBe(false);
    });

    it('should handle different ID formats', async () => {
      const uuidId = '550e8400-e29b-41d4-a716-446655440000';
      const updatedMovie = { ...nonFavoriteMovie, id: uuidId, favorite: true };
      
      vi.mocked(mockRepository.findById).mockResolvedValue({ ...nonFavoriteMovie, id: uuidId });
      vi.mocked(mockRepository.update).mockResolvedValue(updatedMovie);

      const result = await toggleFavoriteUseCase.execute(uuidId);

      expect(mockRepository.findById).toHaveBeenCalledWith(uuidId);
      expect(mockRepository.update).toHaveBeenCalledWith(uuidId, expect.objectContaining({
        id: uuidId,
        favorite: true,
      }));
      expect(result?.id).toBe(uuidId);
    });
  });
});
