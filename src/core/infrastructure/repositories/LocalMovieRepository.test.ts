import { sampleMovies } from '@/core/data/sampleMovies';
import type { Movie } from '@/core/models/movie';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

// Mock localStorage globally before importing the repository
Object.defineProperty(globalThis, 'localStorage', {
  value: localStorageMock,
  writable: true,
  configurable: true,
});

// Mock the window object completely
Object.defineProperty(globalThis, 'window', {
  value: {
    localStorage: localStorageMock,
  },
  writable: true,
  configurable: true,
});

// Import after setting up mocks
import { createLocalMovieRepository } from './LocalMovieRepository';

describe('LocalMovieRepository', () => {
  let repository: ReturnType<typeof createLocalMovieRepository>;

  const mockMovie: Movie = {
    id: 'test-123',
    title: 'Test Movie',
    releaseYear: 2023,
    genre: 'Drama',
    director: 'Test Director',
    rating: 8.5,
    favorite: false,
  };

  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();

    // Set up default localStorage behavior BEFORE creating repository
    localStorageMock.getItem.mockReturnValue(null);
    localStorageMock.setItem.mockImplementation(() => {});

    // Create fresh repository instance AFTER setting up mocks
    repository = createLocalMovieRepository();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('initialization and storage loading', () => {
    it('should return sample movies when localStorage is empty', async () => {
      localStorageMock.getItem.mockReturnValue(null);
      const testRepo = createLocalMovieRepository();

      const movies = await testRepo.findAll();

      expect(movies).toEqual(sampleMovies);
      expect(localStorageMock.getItem).toHaveBeenCalledWith(
        'movie-library-movies'
      );
    });

    it('should return stored movies when localStorage has data', async () => {
      const storedMovies = [mockMovie];
      localStorageMock.getItem.mockReturnValue(JSON.stringify(storedMovies));
      const testRepo = createLocalMovieRepository();

      const movies = await testRepo.findAll();

      expect(movies).toEqual(storedMovies);
      expect(localStorageMock.getItem).toHaveBeenCalledWith(
        'movie-library-movies'
      );
    });

    it('should return sample movies when stored array is empty', async () => {
      localStorageMock.getItem.mockReturnValue(JSON.stringify([]));
      const testRepo = createLocalMovieRepository();

      const movies = await testRepo.findAll();

      expect(movies).toEqual(sampleMovies);
    });

    it('should handle localStorage parse errors gracefully', async () => {
      localStorageMock.getItem.mockReturnValue('invalid json');
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const testRepo = createLocalMovieRepository();

      const movies = await testRepo.findAll();

      expect(movies).toEqual(sampleMovies);
      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to load movies from localStorage:',
        expect.any(Error)
      );
    });

    it('should handle SSR environment (no window)', async () => {
      // Temporarily remove window
      const originalWindow = globalThis.window;
      (globalThis as any).window = undefined;

      const ssrRepository = createLocalMovieRepository();
      const movies = await ssrRepository.findAll();

      expect(movies).toEqual([]);

      // Restore window
      globalThis.window = originalWindow;
    });
  });

  describe('findAll', () => {
    it('should return all movies', async () => {
      const storedMovies = [mockMovie, { ...mockMovie, id: 'test-456' }];
      localStorageMock.getItem.mockReturnValue(JSON.stringify(storedMovies));
      const testRepo = createLocalMovieRepository();

      const movies = await testRepo.findAll();

      expect(movies).toHaveLength(2);
      expect(movies).toEqual(storedMovies);
    });

    it('should return empty array in SSR', async () => {
      const originalWindow = globalThis.window;
      (globalThis as any).window = undefined;

      const ssrRepository = createLocalMovieRepository();
      const movies = await ssrRepository.findAll();

      expect(movies).toEqual([]);

      globalThis.window = originalWindow;
    });
  });

  describe('findById', () => {
    let testRepo: ReturnType<typeof createLocalMovieRepository>;

    beforeEach(() => {
      const storedMovies = [
        mockMovie,
        { ...mockMovie, id: 'test-456', title: 'Another Movie' },
      ];
      localStorageMock.getItem.mockReturnValue(JSON.stringify(storedMovies));
      testRepo = createLocalMovieRepository();
    });

    it('should return movie when found', async () => {
      const movie = await testRepo.findById('test-123');

      expect(movie).toEqual(mockMovie);
    });

    it('should return null when movie not found', async () => {
      const movie = await testRepo.findById('nonexistent');

      expect(movie).toBeNull();
    });

    it('should handle empty ID gracefully', async () => {
      const movie = await testRepo.findById('');

      expect(movie).toBeNull();
    });

    it('should be case sensitive for IDs', async () => {
      const movie = await testRepo.findById('TEST-123');

      expect(movie).toBeNull();
    });
  });

  describe('create', () => {
    let testRepo: ReturnType<typeof createLocalMovieRepository>;

    beforeEach(() => {
      localStorageMock.getItem.mockReturnValue(JSON.stringify([]));
      testRepo = createLocalMovieRepository();
    });

    it('should create a new movie with generated ID', async () => {
      const newMovieData = {
        title: mockMovie.title,
        releaseYear: mockMovie.releaseYear,
        genre: mockMovie.genre,
        director: mockMovie.director,
        rating: mockMovie.rating,
        favorite: mockMovie.favorite,
      };

      const createdMovie = await testRepo.create(newMovieData);

      expect(createdMovie).toHaveProperty('id');
      expect(createdMovie.id).toMatch(/^local-\d+-[a-z0-9]+$/);
      expect(createdMovie.title).toBe(mockMovie.title);
      expect(createdMovie.director).toBe(mockMovie.director);
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'movie-library-movies',
        expect.stringContaining(createdMovie.title)
      );
    });

    it('should add movie to existing collection', async () => {
      const existingMovies = [{ ...mockMovie, id: 'existing-1' }];
      localStorageMock.getItem.mockReturnValue(JSON.stringify(existingMovies));
      const testRepoWithData = createLocalMovieRepository();

      const newMovieData = {
        title: 'New Movie',
        releaseYear: 2024,
        genre: 'Action',
        director: 'New Director',
        rating: 7.5,
        favorite: false,
      };

      await testRepoWithData.create(newMovieData);

      const saveCall = localStorageMock.setItem.mock.calls[0];
      const savedMovies = JSON.parse(saveCall[1]);

      expect(savedMovies).toHaveLength(2);
      expect(savedMovies[1].title).toBe('New Movie');
    });

    it('should handle storage errors gracefully', async () => {
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error('Storage full');
      });
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      const newMovieData = {
        title: mockMovie.title,
        releaseYear: mockMovie.releaseYear,
        genre: mockMovie.genre,
        director: mockMovie.director,
        rating: mockMovie.rating,
        favorite: mockMovie.favorite,
      };

      const createdMovie = await testRepo.create(newMovieData);

      expect(createdMovie.title).toBe(mockMovie.title);
      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to save movies to localStorage:',
        expect.any(Error)
      );
    });
  });

  describe('update', () => {
    it('should update existing movie', async () => {
      const existingMovies = [
        mockMovie,
        { ...mockMovie, id: 'test-456', title: 'Another Movie' },
      ];
      localStorageMock.getItem.mockReturnValue(JSON.stringify(existingMovies));
      const testRepo = createLocalMovieRepository();

      const updatedData = { ...mockMovie, title: 'Updated Title', rating: 9.0 };

      const result = await testRepo.update('test-123', updatedData);

      expect(result).toEqual(updatedData);
      expect(localStorageMock.setItem).toHaveBeenCalled();

      const saveCall = localStorageMock.setItem.mock.calls[0];
      const savedMovies = JSON.parse(saveCall[1]);
      const updatedMovie = savedMovies.find((m: Movie) => m.id === 'test-123');

      expect(updatedMovie.title).toBe('Updated Title');
      expect(updatedMovie.rating).toBe(9.0);
    });

    it('should return null when movie not found', async () => {
      const result = await repository.update('nonexistent', mockMovie);

      expect(result).toBeNull();
      expect(localStorageMock.setItem).not.toHaveBeenCalled();
    });

    it('should handle partial updates', async () => {
      const existingMovies = [
        mockMovie,
        { ...mockMovie, id: 'test-456', title: 'Another Movie' },
      ];
      localStorageMock.getItem.mockReturnValue(JSON.stringify(existingMovies));
      const testRepo = createLocalMovieRepository();

      const partialUpdate = {
        ...mockMovie,
        title: 'Partially Updated',
        favorite: true,
      };

      const result = await testRepo.update('test-123', partialUpdate);

      expect(result?.title).toBe('Partially Updated');
      expect(result?.favorite).toBe(true);
      expect(result?.director).toBe(mockMovie.director);
      expect(result?.rating).toBe(mockMovie.rating);
    });

    it('should not allow ID changes', async () => {
      const existingMovies = [
        mockMovie,
        { ...mockMovie, id: 'test-456', title: 'Another Movie' },
      ];
      localStorageMock.getItem.mockReturnValue(JSON.stringify(existingMovies));
      const testRepo = createLocalMovieRepository();

      const updateWithNewId = { ...mockMovie, id: 'changed-id' };

      const result = await testRepo.update('test-123', updateWithNewId);

      expect(result?.id).toBe('test-123'); // Original ID preserved
    });

    it('should handle storage errors during update', async () => {
      const existingMovies = [
        mockMovie,
        { ...mockMovie, id: 'test-456', title: 'Another Movie' },
      ];
      localStorageMock.getItem.mockReturnValue(JSON.stringify(existingMovies));
      const testRepo = createLocalMovieRepository();

      localStorageMock.setItem.mockImplementation(() => {
        throw new Error('Storage error');
      });
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      const updateData = { ...mockMovie, title: 'Updated' };
      const result = await testRepo.update('test-123', updateData);

      expect(result?.title).toBe('Updated');
      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to save movies to localStorage:',
        expect.any(Error)
      );
    });
  });

  describe('delete', () => {
    it('should delete existing movie and return true', async () => {
      const existingMovies = [
        mockMovie,
        { ...mockMovie, id: 'test-456', title: 'Another Movie' },
      ];
      localStorageMock.getItem.mockReturnValue(JSON.stringify(existingMovies));
      const testRepo = createLocalMovieRepository();

      const result = await testRepo.delete('test-123');

      expect(result).toBe(true);
      expect(localStorageMock.setItem).toHaveBeenCalled();

      const saveCall = localStorageMock.setItem.mock.calls[0];
      const savedMovies = JSON.parse(saveCall[1]);

      expect(savedMovies).toHaveLength(1);
      expect(savedMovies[0].id).toBe('test-456');
    });

    it('should return false when movie not found', async () => {
      const result = await repository.delete('nonexistent');

      expect(result).toBe(false);
      expect(localStorageMock.setItem).not.toHaveBeenCalled();
    });

    it('should handle empty ID gracefully', async () => {
      const result = await repository.delete('');

      expect(result).toBe(false);
    });

    it('should handle deleting last movie', async () => {
      localStorageMock.getItem.mockReturnValue(JSON.stringify([mockMovie]));
      const testRepo = createLocalMovieRepository();

      const result = await testRepo.delete('test-123');

      expect(result).toBe(true);

      const saveCall = localStorageMock.setItem.mock.calls[0];
      const savedMovies = JSON.parse(saveCall[1]);

      expect(savedMovies).toHaveLength(0);
    });

    it('should handle storage errors during delete', async () => {
      const existingMovies = [
        mockMovie,
        { ...mockMovie, id: 'test-456', title: 'Another Movie' },
      ];
      localStorageMock.getItem.mockReturnValue(JSON.stringify(existingMovies));
      const testRepo = createLocalMovieRepository();

      localStorageMock.setItem.mockImplementation(() => {
        throw new Error('Storage error');
      });
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      const result = await testRepo.delete('test-123');

      expect(result).toBe(true); // Operation succeeds in memory
      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to save movies to localStorage:',
        expect.any(Error)
      );
    });
  });

  describe('utility methods', () => {
    describe('clear', () => {
      it('should clear all movies and reset to empty state', async () => {
        localStorageMock.getItem.mockReturnValue(JSON.stringify([mockMovie]));
        const testRepo = createLocalMovieRepository();

        await testRepo.clear();
        const movies = await testRepo.findAll();

        expect(movies).toHaveLength(0);
        expect(localStorageMock.setItem).toHaveBeenCalledWith(
          'movie-library-movies',
          JSON.stringify([])
        );
      });

      it('should handle storage errors during clear', async () => {
        localStorageMock.setItem.mockImplementation(() => {
          throw new Error('Storage error');
        });
        const consoleSpy = vi
          .spyOn(console, 'warn')
          .mockImplementation(() => {});

        await repository.clear();

        expect(consoleSpy).toHaveBeenCalledWith(
          'Failed to save movies to localStorage:',
          expect.any(Error)
        );
      });
    });

    describe('seed', () => {
      it('should seed repository with provided movies', async () => {
        const seedMovies = [mockMovie, { ...mockMovie, id: 'seed-2' }];

        repository.seed(seedMovies);
        const movies = await repository.findAll();

        expect(movies).toEqual(seedMovies);
        expect(localStorageMock.setItem).toHaveBeenCalledWith(
          'movie-library-movies',
          JSON.stringify(seedMovies)
        );
      });
    });

    describe('seedWithSample', () => {
      it('should seed repository with sample movies', async () => {
        repository.seedWithSample();
        const movies = await repository.findAll();

        expect(movies).toEqual(sampleMovies);
        expect(localStorageMock.setItem).toHaveBeenCalledWith(
          'movie-library-movies',
          JSON.stringify(sampleMovies)
        );
      });
    });

    describe('getSampleMovies', () => {
      it('should return sample movies', () => {
        const samples = repository.getSampleMovies();

        expect(samples).toEqual(sampleMovies);
      });
    });
  });

  describe('edge cases and error handling', () => {
    it('should handle corrupted localStorage data', async () => {
      localStorageMock.getItem.mockReturnValue('{"invalid": json}');
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      const testRepo = createLocalMovieRepository();
      const movies = await testRepo.findAll();

      expect(movies).toEqual(sampleMovies);
      expect(consoleSpy).toHaveBeenCalled();
    });

    it('should handle localStorage quota exceeded', async () => {
      localStorageMock.setItem.mockImplementation(() => {
        throw new DOMException('QuotaExceededError');
      });
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      await repository.create(mockMovie);

      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to save movies to localStorage:',
        expect.any(DOMException)
      );
    });

    it('should handle very large movie collections', async () => {
      const largeCollection = Array.from({ length: 10000 }, (_, i) => ({
        ...mockMovie,
        id: `movie-${i}`,
        title: `Movie ${i}`,
      }));

      localStorageMock.getItem.mockReturnValue(JSON.stringify(largeCollection));
      const testRepo = createLocalMovieRepository();

      const movies = await testRepo.findAll();
      const foundMovie = await testRepo.findById('movie-5000');

      expect(movies).toHaveLength(10000);
      expect(foundMovie?.title).toBe('Movie 5000');
    });

    it('should handle concurrent operations gracefully', async () => {
      localStorageMock.getItem.mockReturnValue(JSON.stringify([mockMovie]));
      const testRepo = createLocalMovieRepository();

      // Simulate concurrent operations
      const createPromise = testRepo.create({
        title: mockMovie.title,
        releaseYear: mockMovie.releaseYear,
        genre: mockMovie.genre,
        director: mockMovie.director,
        rating: mockMovie.rating,
        favorite: mockMovie.favorite,
      });
      const updateData = { ...mockMovie, title: 'Updated' };
      const updatePromise = testRepo.update('test-123', updateData);
      const deletePromise = testRepo.delete('test-123');

      const [created, updated, deleted] = await Promise.all([
        createPromise,
        updatePromise,
        deletePromise,
      ]);

      expect(created).toBeDefined();
      expect(created.id).toMatch(/^local-\d+-[a-z0-9]+$/);
      expect(updated?.title).toBe('Updated');
      expect(deleted).toBe(true);
    });
  });

  describe('data integrity', () => {
    it('should maintain referential integrity after operations', async () => {
      localStorageMock.getItem.mockReturnValue(JSON.stringify([mockMovie]));
      const testRepo = createLocalMovieRepository();

      // Create
      const created = await testRepo.create({
        title: mockMovie.title,
        releaseYear: mockMovie.releaseYear,
        genre: mockMovie.genre,
        director: mockMovie.director,
        rating: mockMovie.rating,
        favorite: mockMovie.favorite,
      });

      // Update
      const updateData = { ...mockMovie, favorite: true };
      const updated = await testRepo.update('test-123', updateData);

      // Verify state
      const allMovies = await testRepo.findAll();

      expect(allMovies.length).toBeGreaterThanOrEqual(2);
      expect(allMovies.find((m) => m.id === 'test-123')?.favorite).toBe(true);
      expect(allMovies.find((m) => m.id === created.id)).toBeTruthy();
    });

    it('should not mutate original movie objects', async () => {
      const originalMovie = { ...mockMovie };
      localStorageMock.getItem.mockReturnValue(JSON.stringify([originalMovie]));
      const testRepo = createLocalMovieRepository();

      const updateData = { ...mockMovie, title: 'Modified' };
      await testRepo.update('test-123', updateData);

      expect(originalMovie.title).toBe(mockMovie.title); // Unchanged
    });

    it('should handle undefined and null values appropriately', async () => {
      const movieWithNulls = {
        ...mockMovie,
        genre: null as any,
        favorite: undefined as any,
      };

      const created = await repository.create(movieWithNulls);

      expect(created.genre).toBeNull();
      expect(created.favorite).toBeUndefined();
    });
  });
});
