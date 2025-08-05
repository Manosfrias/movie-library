import type { MovieRepository } from '@/core/models/repository';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// Mock the dependencies
vi.mock('@/config/env', () => ({
  default: {
    isDevelopment: true,
    api: {
      baseUrl: 'http://localhost:3000/api',
    },
  },
}));

vi.mock('@/core/infrastructure/http/ApiConfig', () => ({
  apiConfig: {
    baseURL: 'http://localhost:3000/api',
    timeout: 5000,
    headers: {},
    retryAttempts: 3,
  },
}));

vi.mock('@/core/infrastructure/http/HttpClient', () => ({
  FetchHttpClient: vi.fn().mockImplementation(() => ({
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  })),
}));

vi.mock('@/core/infrastructure/repositories/LocalMovieRepository', () => ({
  createLocalMovieRepository: vi.fn().mockReturnValue({
    findAll: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  }),
}));

vi.mock('@/core/infrastructure/repositories/MockApiMovieRepository', () => ({
  createMockApiMovieRepository: vi.fn().mockReturnValue({
    findAll: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  }),
}));

describe('RepositoryFactory', () => {
  let mockLocalRepository: MovieRepository & {
    clear: () => void;
    seed: (movies: any[]) => void;
    seedWithSample: () => void;
    getSampleMovies: () => any[];
  };
  let mockApiRepository: MovieRepository;

  beforeEach(async () => {
    // Reset environment variables
    delete process.env.NEXT_PUBLIC_USE_LOCAL_REPO;

    // Clear module cache
    vi.clearAllMocks();

    // Mock repositories
    mockLocalRepository = {
      findAll: vi.fn(),
      findById: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      clear: vi.fn(),
      seed: vi.fn(),
      seedWithSample: vi.fn(),
      getSampleMovies: vi.fn(),
    };

    mockApiRepository = {
      findAll: vi.fn(),
      findById: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };

    // Update mocks
    const { createLocalMovieRepository } = await import(
      '@/core/infrastructure/repositories/LocalMovieRepository'
    );
    const { createMockApiMovieRepository } = await import(
      '@/core/infrastructure/repositories/MockApiMovieRepository'
    );

    vi.mocked(createLocalMovieRepository).mockReturnValue(mockLocalRepository);
    vi.mocked(createMockApiMovieRepository).mockReturnValue(mockApiRepository);
  });

  afterEach(() => {
    vi.clearAllMocks();
    delete process.env.NEXT_PUBLIC_USE_LOCAL_REPO;
  });

  describe('createMovieRepository', () => {
    it('should return API repository by default in development', async () => {
      const { createMovieRepository, resetRepositories } = await import(
        './RepositoryFactory'
      );
      resetRepositories();

      const repository = createMovieRepository();

      expect(repository).toBe(mockApiRepository);
    });

    it('should return local repository when explicitly requested', async () => {
      const { createMovieRepository, resetRepositories } = await import(
        './RepositoryFactory'
      );
      resetRepositories();

      const repository = createMovieRepository('local');

      expect(repository).toBe(mockLocalRepository);
    });

    it('should return API repository when explicitly requested', async () => {
      const { createMovieRepository, resetRepositories } = await import(
        './RepositoryFactory'
      );
      resetRepositories();

      const repository = createMovieRepository('api');

      expect(repository).toBe(mockApiRepository);
    });

    it('should use local repository when NEXT_PUBLIC_USE_LOCAL_REPO is true', async () => {
      process.env.NEXT_PUBLIC_USE_LOCAL_REPO = 'true';

      // Re-import to get fresh module with new env var
      vi.resetModules();
      const { createMovieRepository, resetRepositories } = await import(
        './RepositoryFactory'
      );
      resetRepositories();

      const repository = createMovieRepository();

      expect(repository).toBe(mockLocalRepository);
    });

    it('should use local repository when API URL is not configured', async () => {
      // Mock config without API URL
      vi.doMock('@/config/env', () => ({
        default: {
          isDevelopment: true,
          api: {
            baseUrl: '',
          },
        },
      }));

      vi.resetModules();
      const { createMovieRepository, resetRepositories } = await import(
        './RepositoryFactory'
      );
      resetRepositories();

      const repository = createMovieRepository();

      expect(repository).toBe(mockLocalRepository);
    });

    it('should return same instance on multiple calls (singleton pattern)', async () => {
      const { createMovieRepository, resetRepositories } = await import(
        './RepositoryFactory'
      );
      resetRepositories();

      const repository1 = createMovieRepository('api');
      const repository2 = createMovieRepository('api');

      expect(repository1).toBe(repository2);
      expect(repository1).toBe(mockApiRepository);
    });

    it('should handle different repository types independently', async () => {
      const { createMovieRepository, resetRepositories } = await import(
        './RepositoryFactory'
      );
      resetRepositories();

      const apiRepo = createMovieRepository('api');
      const localRepo = createMovieRepository('local');

      expect(apiRepo).toBe(mockApiRepository);
      expect(localRepo).toBe(mockLocalRepository);
      expect(apiRepo).not.toBe(localRepo);
    });
  });

  describe('setMovieRepository', () => {
    it('should set custom API repository', async () => {
      const { createMovieRepository, setMovieRepository, resetRepositories } =
        await import('./RepositoryFactory');
      resetRepositories();

      const customRepository: MovieRepository = {
        findAll: vi.fn(),
        findById: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
      };

      setMovieRepository(customRepository, 'api');
      const repository = createMovieRepository('api');

      expect(repository).toBe(customRepository);
    });

    it('should set custom local repository', async () => {
      const { createMovieRepository, setMovieRepository, resetRepositories } =
        await import('./RepositoryFactory');
      resetRepositories();

      const customRepository: MovieRepository = {
        findAll: vi.fn(),
        findById: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
      };

      setMovieRepository(customRepository, 'local');
      const repository = createMovieRepository('local');

      expect(repository).toBe(customRepository);
    });
  });

  describe('resetRepositories', () => {
    it('should reset all cached repositories', async () => {
      const { createMovieRepository, resetRepositories, setMovieRepository } =
        await import('./RepositoryFactory');

      // Create and cache repositories
      const apiRepo1 = createMovieRepository('api');
      const localRepo1 = createMovieRepository('local');

      // Reset
      resetRepositories();

      // Create new repositories
      const apiRepo2 = createMovieRepository('api');
      const localRepo2 = createMovieRepository('local');

      // Should be new instances
      expect(apiRepo2).toBe(mockApiRepository);
      expect(localRepo2).toBe(mockLocalRepository);
    });

    it('should clear custom repositories', async () => {
      const { createMovieRepository, resetRepositories, setMovieRepository } =
        await import('./RepositoryFactory');

      const customRepository: MovieRepository = {
        findAll: vi.fn(),
        findById: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
      };

      setMovieRepository(customRepository, 'api');

      // Verify custom repository is used
      expect(createMovieRepository('api')).toBe(customRepository);

      // Reset
      resetRepositories();

      // Should use default repository again
      expect(createMovieRepository('api')).toBe(mockApiRepository);
    });
  });

  describe('Environment-based repository selection', () => {
    it('should use API repository in production mode', async () => {
      vi.doMock('@/config/env', () => ({
        default: {
          isDevelopment: false,
          api: {
            baseUrl: 'https://api.production.com',
          },
        },
      }));

      vi.resetModules();
      const { createMovieRepository, resetRepositories } = await import(
        './RepositoryFactory'
      );
      resetRepositories();

      const repository = createMovieRepository();

      expect(repository).toBe(mockApiRepository);
    });

    it('should prefer explicit type over environment configuration', async () => {
      process.env.NEXT_PUBLIC_USE_LOCAL_REPO = 'true';

      vi.resetModules();
      const { createMovieRepository, resetRepositories } = await import(
        './RepositoryFactory'
      );
      resetRepositories();

      // Explicit API type should override environment variable
      const apiRepo = createMovieRepository('api');
      expect(apiRepo).toBe(mockApiRepository);

      // Explicit local type should work
      const localRepo = createMovieRepository('local');
      expect(localRepo).toBe(mockLocalRepository);
    });
  });

  describe('HTTP Client creation', () => {
    it('should create HTTP client only once', async () => {
      const { FetchHttpClient } = await import(
        '@/core/infrastructure/http/HttpClient'
      );
      const { createMovieRepository, resetRepositories } = await import(
        './RepositoryFactory'
      );
      resetRepositories();

      // Create multiple API repositories
      createMovieRepository('api');
      createMovieRepository('api');

      // HTTP client should be created only once
      expect(FetchHttpClient).toHaveBeenCalledTimes(1);
    });

    it('should use correct API configuration', async () => {
      const { FetchHttpClient } = await import(
        '@/core/infrastructure/http/HttpClient'
      );
      const { apiConfig } = await import(
        '@/core/infrastructure/http/ApiConfig'
      );
      const { createMovieRepository, resetRepositories } = await import(
        './RepositoryFactory'
      );
      resetRepositories();

      createMovieRepository('api');

      expect(FetchHttpClient).toHaveBeenCalledWith(apiConfig);
    });
  });

  describe('Error handling', () => {
    it('should fallback to API repository for unknown types', async () => {
      const { createMovieRepository, resetRepositories } = await import(
        './RepositoryFactory'
      );
      resetRepositories();

      // @ts-ignore - Testing invalid type
      const repository = createMovieRepository('unknown' as any);

      expect(repository).toBe(mockApiRepository);
    });

    it('should handle missing dependencies gracefully', async () => {
      // Test with invalid configuration that should fallback gracefully
      process.env.NEXT_PUBLIC_API_URL = ''; // Empty URL should trigger fallback

      const { createMovieRepository } = await import('./RepositoryFactory');
      const repository = createMovieRepository('api');

      // Should fallback to creating API repository even with empty config
      expect(repository).toBeDefined();
      expect(repository).toHaveProperty('findAll');
      expect(repository).toHaveProperty('findById');
      expect(repository).toHaveProperty('create');
      expect(repository).toHaveProperty('update');
      expect(repository).toHaveProperty('delete');
    });
  });
});
