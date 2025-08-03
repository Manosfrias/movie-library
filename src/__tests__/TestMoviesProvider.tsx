'use client';

import React from 'react';
import { ClientMoviesProvider } from '../ui/context/ClientMoviesProvider';
import { MovieFilters } from '../ui/lib/cookies';

interface TestMoviesProviderProps {
  children: React.ReactNode;
  initialFilters?: Partial<MovieFilters>;
}

export const TestMoviesProvider: React.FC<TestMoviesProviderProps> = ({
  children,
  initialFilters = {},
}) => {
  const defaultFilters: MovieFilters = {
    showOnlyFavorites: false,
    selectedGenre: '',
    sortBy: '',
    ...initialFilters,
  };

  return (
    <ClientMoviesProvider initialFilters={defaultFilters}>
      {children}
    </ClientMoviesProvider>
  );
};
