import config from '@/config/env';
import { HttpClientConfig } from '@/core/infrastructure/http/HttpClient.types';

export const createApiConfig = (): HttpClientConfig => ({
  baseURL: config.api.baseUrl,
  timeout: config.api.timeout,
  retryAttempts: config.api.retryAttempts,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const apiConfig = createApiConfig();
