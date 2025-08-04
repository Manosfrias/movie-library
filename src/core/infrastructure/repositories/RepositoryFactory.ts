import config from '@/config/env';
import { apiConfig } from '@/core/infrastructure/http/ApiConfig';
import { FetchHttpClient } from '@/core/infrastructure/http/HttpClient';
import { createLocalMovieRepository } from '@/core/infrastructure/repositories/LocalMovieRepository';
import { createMockApiMovieRepository } from '@/core/infrastructure/repositories/MockApiMovieRepository';
import { MovieRepository } from '@/core/models/repository';

export type RepositoryType = 'api' | 'local';

let httpClient: FetchHttpClient | null = null;
let apiRepository: MovieRepository | null = null;
let localRepository: MovieRepository | null = null;

const getHttpClient = (): FetchHttpClient => {
  if (!httpClient) {
    httpClient = new FetchHttpClient(apiConfig);
  }
  return httpClient;
};

const determineRepositoryType = (): RepositoryType => {
  if (config.isDevelopment) {
    if (!config.api.baseUrl) {
      console.log(
        '🔧 Development mode: API URL not configured, using local repository with sample data'
      );
      return 'local';
    }

    const useLocal = process.env.NEXT_PUBLIC_USE_LOCAL_REPO === 'true';
    if (useLocal) {
      console.log('🔧 Development mode: Forced to use local repository');
      return 'local';
    }
  }

  return 'api';
};

const getApiRepository = (): MovieRepository => {
  if (!apiRepository) {
    apiRepository = createMockApiMovieRepository(getHttpClient());
  }
  return apiRepository;
};

const getLocalRepository = (): MovieRepository => {
  if (!localRepository) {
    localRepository = createLocalMovieRepository();
  }
  return localRepository;
};

export const createMovieRepository = (
  type?: RepositoryType
): MovieRepository => {
  const repositoryType = type || determineRepositoryType();

  switch (repositoryType) {
    case 'api':
      return getApiRepository();
    case 'local':
      return getLocalRepository();
    default:
      return getApiRepository();
  }
};

export const setMovieRepository = (
  repository: MovieRepository,
  type: RepositoryType
): void => {
  if (type === 'api') {
    apiRepository = repository;
  } else {
    localRepository = repository;
  }
};

export const resetRepositories = (): void => {
  httpClient = null;
  apiRepository = null;
  localRepository = null;
};
