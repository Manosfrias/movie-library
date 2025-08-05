import { Movie } from '@/core/models/movie';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// Mock the dependencies
vi.mock('@/core/data/sampleMovies', () => ({
  sampleMovies: [
    {
      id: '1',
      title: 'Test Movie 1',
      director: 'Test Director 1',
      releaseYear: 2023,
      genre: 'Action',
      rating: 8.5,
      favorite: false,
    },
    {
      id: '2',
      title: 'Test Movie 2',
      director: 'Test Director 2',
      releaseYear: 2024,
      genre: 'Drama',
      rating: 9.0,
      favorite: true,
    },
  ] as Movie[],
}));

vi.mock('@/core/infrastructure/repositories/LocalMovieRepository', () => ({
  createLocalMovieRepository: vi.fn(),
}));

describe('SampleDataHelper', () => {
  let mockLocalRepository: {
    findAll: any;
    clear: any;
    seedWithSample: any;
  };
  let consoleLogSpy: any;
  let consoleWarnSpy: any;

  beforeEach(async () => {
    mockLocalRepository = {
      findAll: vi.fn(),
      clear: vi.fn(),
      seedWithSample: vi.fn(),
    };

    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const { createLocalMovieRepository } = await import(
      '@/core/infrastructure/repositories/LocalMovieRepository'
    );
    vi.mocked(createLocalMovieRepository).mockReturnValue(
      mockLocalRepository as any
    );

    // Clear all mocks
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
    consoleLogSpy.mockRestore();
    consoleWarnSpy.mockRestore();
  });

  describe('initializeWithSampleData', () => {
    it('should initialize with sample data when repository is empty', async () => {
      mockLocalRepository.findAll.mockResolvedValue([]);

      const { initializeWithSampleData } = await import('./SampleDataHelper');
      await initializeWithSampleData();

      expect(mockLocalRepository.findAll).toHaveBeenCalledOnce();
      expect(mockLocalRepository.seedWithSample).toHaveBeenCalledOnce();
      expect(consoleLogSpy).toHaveBeenCalledWith(
        '🎬 Initializing with sample movies...'
      );
    });

    it('should not initialize when repository already has movies', async () => {
      const existingMovies = [
        {
          id: '1',
          title: 'Existing Movie',
          director: 'Director',
          releaseYear: 2023,
        },
      ];
      mockLocalRepository.findAll.mockResolvedValue(existingMovies);

      
      const { initializeWithSampleData } = await import('./SampleDataHelper');
      await initializeWithSampleData();

            expect(mockLocalRepository.findAll).toHaveBeenCalledOnce();
      expect(mockLocalRepository.seedWithSample).not.toHaveBeenCalled();
      expect(consoleLogSpy).not.toHaveBeenCalled();
    });

    it('should handle repository findAll errors gracefully', async () => {
      const testError = new Error('Repository error');
      mockLocalRepository.findAll.mockRejectedValue(testError);

      const { initializeWithSampleData } = await import('./SampleDataHelper');
      await initializeWithSampleData();

            expect(mockLocalRepository.findAll).toHaveBeenCalledOnce();
      expect(mockLocalRepository.seedWithSample).not.toHaveBeenCalled();
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        'Failed to initialize with sample data:',
        testError
      );
    });

    it('should handle seedWithSample errors gracefully', async () => {
            mockLocalRepository.findAll.mockResolvedValue([]);
      const testError = new Error('Seed error');
      mockLocalRepository.seedWithSample.mockImplementation(() => {
        throw testError;
      });

      
      const { initializeWithSampleData } = await import('./SampleDataHelper');
      await initializeWithSampleData();

            expect(mockLocalRepository.findAll).toHaveBeenCalledOnce();
      expect(mockLocalRepository.seedWithSample).toHaveBeenCalledOnce();
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        'Failed to initialize with sample data:',
        testError
      );
    });
  });

  describe('resetToSampleData', () => {
    it('should clear repository and seed with sample data', async () => {
      
      const { resetToSampleData } = await import('./SampleDataHelper');
      await resetToSampleData();

            expect(mockLocalRepository.clear).toHaveBeenCalledOnce();
      expect(mockLocalRepository.seedWithSample).toHaveBeenCalledOnce();
      expect(consoleLogSpy).toHaveBeenCalledWith(
        '🔄 Repository reset to sample data'
      );
    });

    it('should handle clear operation errors gracefully', async () => {
            const testError = new Error('Clear error');
      mockLocalRepository.clear.mockImplementation(() => {
        throw testError;
      });

      
      const { resetToSampleData } = await import('./SampleDataHelper');
      await resetToSampleData();

            expect(mockLocalRepository.clear).toHaveBeenCalledOnce();
      expect(mockLocalRepository.seedWithSample).not.toHaveBeenCalled();
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        'Failed to reset to sample data:',
        testError
      );
    });

    it('should handle seedWithSample operation errors gracefully', async () => {
            const testError = new Error('Seed error');
      mockLocalRepository.seedWithSample.mockImplementation(() => {
        throw testError;
      });

      
      const { resetToSampleData } = await import('./SampleDataHelper');
      await resetToSampleData();

            expect(mockLocalRepository.clear).toHaveBeenCalledOnce();
      expect(mockLocalRepository.seedWithSample).toHaveBeenCalledOnce();
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        'Failed to reset to sample data:',
        testError
      );
    });

    it('should execute operations in correct order', async () => {
            const callOrder: string[] = [];
      mockLocalRepository.clear.mockImplementation(() => {
        callOrder.push('clear');
      });
      mockLocalRepository.seedWithSample.mockImplementation(() => {
        callOrder.push('seed');
      });

      
      const { resetToSampleData } = await import('./SampleDataHelper');
      await resetToSampleData();

            expect(callOrder).toEqual(['clear', 'seed']);
    });
  });

  describe('getSampleMovies', () => {
    it('should return the mocked sample movies data', async () => {
      
      const { getSampleMovies } = await import('./SampleDataHelper');
      const movies = getSampleMovies();

            expect(movies).toBeDefined();
      expect(Array.isArray(movies)).toBe(true);

      expect(movies.length).toBeGreaterThanOrEqual(2);

      const testMovie1 = movies.find((m: any) => m.id === '1');
      const testMovie2 = movies.find((m: any) => m.id === '2');

      expect(testMovie1).toBeDefined();
      expect(testMovie2).toBeDefined();

      if (testMovie1) {
        expect(testMovie1).toMatchObject({
          id: '1',
          title: 'Test Movie 1',
          director: 'Test Director 1',
          releaseYear: 2023,
          genre: 'Action',
          rating: 8.5,
          favorite: false,
        });
      }

      if (testMovie2) {
        expect(testMovie2).toMatchObject({
          id: '2',
          title: 'Test Movie 2',
          director: 'Test Director 2',
          releaseYear: 2024,
          genre: 'Drama',
          rating: 9.0,
          favorite: true,
        });
      }
    });

    it('should return consistent data on multiple calls', async () => {
      
      const { getSampleMovies } = await import('./SampleDataHelper');
      const movies1 = getSampleMovies();
      const movies2 = getSampleMovies();

            expect(movies1).toEqual(movies2);
      expect(movies1).toBe(movies2);
    });

    it('should return reference to sample data (direct import behavior)', async () => {
      
      const { getSampleMovies } = await import('./SampleDataHelper');
      const movies = getSampleMovies();
      const originalLength = movies.length;

      expect(movies).toBeDefined();
      expect(originalLength).toBeGreaterThanOrEqual(2);

      expect(typeof getSampleMovies).toBe('function');

      const movies2 = getSampleMovies();
      expect(movies).toBe(movies2);
    });
  });

  describe('Integration scenarios', () => {
    it('should handle complete workflow: initialize -> reset -> getSample', async () => {
            mockLocalRepository.findAll.mockResolvedValue([]);

      
      const { initializeWithSampleData, resetToSampleData, getSampleMovies } =
        await import('./SampleDataHelper');

        await initializeWithSampleData();

        await resetToSampleData();

        const movies = getSampleMovies();

        expect(mockLocalRepository.findAll).toHaveBeenCalledOnce();
      expect(mockLocalRepository.seedWithSample).toHaveBeenCalledTimes(2); // Once for init, once for reset
      expect(mockLocalRepository.clear).toHaveBeenCalledOnce();
      expect(movies).toBeDefined();
      expect(Array.isArray(movies)).toBe(true);
      expect(consoleLogSpy).toHaveBeenCalledTimes(2);
    });

    it('should handle repository creation failures', async () => {
            const { createLocalMovieRepository } = await import(
        '@/core/infrastructure/repositories/LocalMovieRepository'
      );
      vi.mocked(createLocalMovieRepository).mockImplementation(() => {
        throw new Error('Repository creation failed');
      });

      const { initializeWithSampleData, resetToSampleData } = await import(
        './SampleDataHelper'
      );

      await expect(initializeWithSampleData()).resolves.not.toThrow();
      await expect(resetToSampleData()).resolves.not.toThrow();

      expect(consoleWarnSpy).toHaveBeenCalledTimes(2);
    });
  });
});
