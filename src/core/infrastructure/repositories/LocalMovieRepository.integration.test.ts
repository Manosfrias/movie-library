import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { sampleMovies } from '@/core/data/sampleMovies';
import type { Movie } from '@/core/models/movie';

// Create a simpler test approach that focuses on integration testing
describe('LocalMovieRepository Integration Tests', () => {
  let originalLocalStorage: Storage | undefined;
  let mockStorage: { [key: string]: string };

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
    // Save original localStorage
    originalLocalStorage = globalThis.window?.localStorage;
    
    // Create mock storage
    mockStorage = {};
    
    // Mock localStorage
    const mockLocalStorage = {
      getItem: vi.fn((key: string) => mockStorage[key] || null),
      setItem: vi.fn((key: string, value: string) => {
        mockStorage[key] = value;
      }),
      removeItem: vi.fn((key: string) => {
        delete mockStorage[key];
      }),
      clear: vi.fn(() => {
        mockStorage = {};
      }),
      length: 0,
      key: vi.fn()
    };

    // Set up window.localStorage mock
    Object.defineProperty(globalThis, 'window', {
      value: {
        localStorage: mockLocalStorage,
      },
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    // Restore original localStorage if it existed
    if (originalLocalStorage) {
      Object.defineProperty(globalThis, 'window', {
        value: {
          localStorage: originalLocalStorage,
        },
        writable: true,
        configurable: true,
      });
    }
    vi.clearAllMocks();
  });

  describe('Basic CRUD Operations', () => {
    it('should create and retrieve a repository with sample data by default', async () => {
      // Import after setting up mocks
      const { createLocalMovieRepository } = await import('./LocalMovieRepository');
      const repository = createLocalMovieRepository();

      const movies = await repository.findAll();

      expect(movies).toEqual(sampleMovies);
      expect(movies.length).toBe(sampleMovies.length);
    });

    it('should create a new movie successfully', async () => {
      const { createLocalMovieRepository } = await import('./LocalMovieRepository');
      const repository = createLocalMovieRepository();

      const newMovieData = {
        title: mockMovie.title,
        releaseYear: mockMovie.releaseYear,
        genre: mockMovie.genre,
        director: mockMovie.director,
        rating: mockMovie.rating,
        favorite: mockMovie.favorite,
      };

      const createdMovie = await repository.create(newMovieData);

      expect(createdMovie).toHaveProperty('id');
      expect(createdMovie.id).toMatch(/^local-\d+-[a-z0-9]+$/);
      expect(createdMovie.title).toBe(mockMovie.title);
      expect(createdMovie.director).toBe(mockMovie.director);

      // Verify the movie was added to the collection
      const allMovies = await repository.findAll();
      expect(allMovies.length).toBe(sampleMovies.length + 1);
      expect(allMovies.find(m => m.id === createdMovie.id)).toEqual(createdMovie);
    });

    it('should find a movie by ID', async () => {
      const { createLocalMovieRepository } = await import('./LocalMovieRepository');
      const repository = createLocalMovieRepository();

      // Create a movie first
      const newMovieData = {
        title: mockMovie.title,
        releaseYear: mockMovie.releaseYear,
        genre: mockMovie.genre,
        director: mockMovie.director,
        rating: mockMovie.rating,
        favorite: mockMovie.favorite,
      };

      const createdMovie = await repository.create(newMovieData);
      
      // Find the movie by ID
      const foundMovie = await repository.findById(createdMovie.id);

      expect(foundMovie).toEqual(createdMovie);
    });

    it('should return null for non-existent movie ID', async () => {
      const { createLocalMovieRepository } = await import('./LocalMovieRepository');
      const repository = createLocalMovieRepository();

      const foundMovie = await repository.findById('nonexistent-id');

      expect(foundMovie).toBeNull();
    });

    it('should update an existing movie', async () => {
      const { createLocalMovieRepository } = await import('./LocalMovieRepository');
      const repository = createLocalMovieRepository();

      // Create a movie first
      const newMovieData = {
        title: mockMovie.title,
        releaseYear: mockMovie.releaseYear,
        genre: mockMovie.genre,
        director: mockMovie.director,
        rating: mockMovie.rating,
        favorite: mockMovie.favorite,
      };

      const createdMovie = await repository.create(newMovieData);
      
      // Update the movie
      const updatedData = {
        ...createdMovie,
        title: 'Updated Title',
        rating: 9.0,
        favorite: true,
      };

      const updatedMovie = await repository.update(createdMovie.id, updatedData);

      expect(updatedMovie).not.toBeNull();
      expect(updatedMovie?.title).toBe('Updated Title');
      expect(updatedMovie?.rating).toBe(9.0);
      expect(updatedMovie?.favorite).toBe(true);
      expect(updatedMovie?.id).toBe(createdMovie.id);

      // Verify the update persisted
      const foundMovie = await repository.findById(createdMovie.id);
      expect(foundMovie?.title).toBe('Updated Title');
    });

    it('should return null when updating non-existent movie', async () => {
      const { createLocalMovieRepository } = await import('./LocalMovieRepository');
      const repository = createLocalMovieRepository();

      const result = await repository.update('nonexistent-id', mockMovie);

      expect(result).toBeNull();
    });

    it('should delete an existing movie', async () => {
      const { createLocalMovieRepository } = await import('./LocalMovieRepository');
      const repository = createLocalMovieRepository();

      // Create a movie first
      const newMovieData = {
        title: mockMovie.title,
        releaseYear: mockMovie.releaseYear,
        genre: mockMovie.genre,
        director: mockMovie.director,
        rating: mockMovie.rating,
        favorite: mockMovie.favorite,
      };

      const createdMovie = await repository.create(newMovieData);
      const initialCount = (await repository.findAll()).length;

      // Delete the movie
      const deleteResult = await repository.delete(createdMovie.id);

      expect(deleteResult).toBe(true);

      // Verify the movie was deleted
      const foundMovie = await repository.findById(createdMovie.id);
      expect(foundMovie).toBeNull();

      const finalCount = (await repository.findAll()).length;
      expect(finalCount).toBe(initialCount - 1);
    });

    it('should return false when deleting non-existent movie', async () => {
      const { createLocalMovieRepository } = await import('./LocalMovieRepository');
      const repository = createLocalMovieRepository();

      const result = await repository.delete('nonexistent-id');

      expect(result).toBe(false);
    });
  });

  describe('Utility Methods', () => {
    it('should clear all movies', async () => {
      const { createLocalMovieRepository } = await import('./LocalMovieRepository');
      const repository = createLocalMovieRepository();

      // Add a movie first
      const newMovieData = {
        title: mockMovie.title,
        releaseYear: mockMovie.releaseYear,
        genre: mockMovie.genre,
        director: mockMovie.director,
        rating: mockMovie.rating,
        favorite: mockMovie.favorite,
      };

      await repository.create(newMovieData);

      // Clear the repository
      repository.clear();

      const movies = await repository.findAll();
      expect(movies).toHaveLength(0);
    });

    it('should seed with custom movies', async () => {
      const { createLocalMovieRepository } = await import('./LocalMovieRepository');
      const repository = createLocalMovieRepository();

      const customMovies = [mockMovie, { ...mockMovie, id: 'test-456', title: 'Another Movie' }];

      repository.seed(customMovies);

      const movies = await repository.findAll();
      expect(movies).toEqual(customMovies);
    });

    it('should seed with sample movies', async () => {
      const { createLocalMovieRepository } = await import('./LocalMovieRepository');
      const repository = createLocalMovieRepository();

      // Clear first
      repository.clear();

      // Seed with samples
      repository.seedWithSample();

      const movies = await repository.findAll();
      expect(movies).toEqual(sampleMovies);
    });

    it('should return sample movies', async () => {
      const { createLocalMovieRepository } = await import('./LocalMovieRepository');
      const repository = createLocalMovieRepository();

      const samples = repository.getSampleMovies();

      expect(samples).toEqual(sampleMovies);
    });
  });

  describe('Data Persistence', () => {
    it('should maintain data integrity after multiple operations', async () => {
      const { createLocalMovieRepository } = await import('./LocalMovieRepository');
      const repository = createLocalMovieRepository();

      // Clear initial data for predictable test
      repository.clear();

      // Create multiple movies
      const movie1Data = { ...mockMovie, title: 'Movie 1' };
      delete (movie1Data as any).id;
      
      const movie2Data = { ...mockMovie, title: 'Movie 2' };
      delete (movie2Data as any).id;

      const created1 = await repository.create(movie1Data);
      const created2 = await repository.create(movie2Data);

      // Update one movie
      const updatedMovie1 = await repository.update(created1.id, {
        ...created1,
        favorite: true,
      });

      // Delete the other movie
      await repository.delete(created2.id);

      // Verify final state
      const allMovies = await repository.findAll();
      expect(allMovies).toHaveLength(1);
      expect(allMovies[0].id).toBe(created1.id);
      expect(allMovies[0].favorite).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty string ID gracefully', async () => {
      const { createLocalMovieRepository } = await import('./LocalMovieRepository');
      const repository = createLocalMovieRepository();

      const foundMovie = await repository.findById('');
      expect(foundMovie).toBeNull();

      const deleteResult = await repository.delete('');
      expect(deleteResult).toBe(false);
    });

    it('should handle SSR environment (no window)', async () => {
      // Temporarily remove window
      const originalWindow = globalThis.window;
      (globalThis as any).window = undefined;

      const { createLocalMovieRepository } = await import('./LocalMovieRepository');
      const repository = createLocalMovieRepository();

      const movies = await repository.findAll();
      expect(movies).toEqual([]);

      // Restore window
      globalThis.window = originalWindow;
    });

    it('should generate unique IDs for created movies', async () => {
      const { createLocalMovieRepository } = await import('./LocalMovieRepository');
      const repository = createLocalMovieRepository();

      const movieData = {
        title: mockMovie.title,
        releaseYear: mockMovie.releaseYear,
        genre: mockMovie.genre,
        director: mockMovie.director,
        rating: mockMovie.rating,
        favorite: mockMovie.favorite,
      };

      const movie1 = await repository.create(movieData);
      const movie2 = await repository.create(movieData);

      expect(movie1.id).not.toBe(movie2.id);
      expect(movie1.id).toMatch(/^local-\d+-[a-z0-9]+$/);
      expect(movie2.id).toMatch(/^local-\d+-[a-z0-9]+$/);
    });
  });
});
