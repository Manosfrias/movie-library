import packageJson from '../../package.json';

const config = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_MOVIES_API_URL || '',
    timeout: 10000,
    retryAttempts: 3,
  },

  storage: {
    filtersKey:
      process.env.NEXT_PUBLIC_STORAGE_FILTERS_KEY || 'movie-library-filters',
    favoritesKey:
      process.env.NEXT_PUBLIC_STORAGE_FAVORITES_KEY ||
      'movie-library-favorites',
  },

  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',

  features: {},

  app: {
    name: packageJson.name,
    version: packageJson.version,
    defaultPageSize: 20,
    maxRetries: 3,
  },
} as const;

const validateConfig = () => {
  if (!config.api.baseUrl) {
    throw new Error(
      'NEXT_PUBLIC_MOVIES_API_URL environment variable is required'
    );
  }

  try {
    new URL(config.api.baseUrl);
  } catch {
    throw new Error('NEXT_PUBLIC_MOVIES_API_URL must be a valid URL');
  }
};

if (typeof window === 'undefined') {
  validateConfig();
}

export default config;
export { validateConfig };
