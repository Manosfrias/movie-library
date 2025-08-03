'use client';

import React, { createContext, useContext, useMemo } from 'react';
import { MoviesContextType, MoviesProviderProps } from './MoviesContext.types';
import { applyAllFilters } from './movieFilters';
import { useMoviesState } from '../hooks/useMoviesState';
import { usePersistentFilters } from '../hooks/usePersistentFilters';
import { useMovieOperations } from '../hooks/useMovieOperations';
import { MovieFilters } from '../lib/cookies';

const MoviesContext = createContext<MoviesContextType | undefined>(undefined);

interface ClientMoviesProviderProps extends MoviesProviderProps {
  initialFilters: MovieFilters;
}

export const ClientMoviesProvider: React.FC<ClientMoviesProviderProps> = ({
  children,
  initialFilters,
}) => {
  const { movies, setMovies, loading, setLoading } = useMoviesState();

  const {
    showOnlyFavorites,
    setShowOnlyFavorites,
    searchQuery,
    setSearchQuery,
    searchCriteria,
    setSearchCriteria,
    selectedGenre,
    setSelectedGenre,
    sortBy,
    setSortBy,
    clearAllFilters,
  } = usePersistentFilters({ initialFilters });

  const { toggleFavorite, loadMovies, addMovie, deleteMovie } =
    useMovieOperations({
      setMovies,
      setLoading,
    });

  const filteredMovies = useMemo(() => {
    return applyAllFilters(
      movies,
      showOnlyFavorites,
      searchQuery,
      searchCriteria,
      selectedGenre,
      sortBy
    );
  }, [
    movies,
    showOnlyFavorites,
    searchQuery,
    searchCriteria,
    selectedGenre,
    sortBy,
  ]);

  const contextValue = useMemo<MoviesContextType>(
    () => ({
      movies,
      filteredMovies,
      loading,
      showOnlyFavorites,
      searchQuery,
      searchCriteria,
      selectedGenre,
      sortBy,
      setShowOnlyFavorites,
      setSearchQuery,
      setSearchCriteria,
      setSelectedGenre,
      setSortBy,
      clearAllFilters,
      toggleFavorite,
      loadMovies,
      addMovie,
      deleteMovie,
    }),
    [
      movies,
      filteredMovies,
      loading,
      showOnlyFavorites,
      searchQuery,
      searchCriteria,
      selectedGenre,
      sortBy,
      setShowOnlyFavorites,
      setSearchQuery,
      setSearchCriteria,
      setSelectedGenre,
      setSortBy,
      clearAllFilters,
      toggleFavorite,
      loadMovies,
      addMovie,
      deleteMovie,
    ]
  );

  return (
    <MoviesContext.Provider value={contextValue}>
      {children}
    </MoviesContext.Provider>
  );
};

export const useMovies = (): MoviesContextType => {
  const context = useContext(MoviesContext);
  if (context === undefined) {
    throw new Error('useMovies must be used within a ClientMoviesProvider');
  }
  return context;
};
