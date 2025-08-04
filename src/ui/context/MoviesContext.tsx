'use client';
import React, { createContext, useContext, useMemo } from 'react';
import { useFiltersState } from '../hooks/useFiltersState';
import { useMovieOperations } from '../hooks/useMovieOperations';
import { useMoviesState } from '../hooks/useMoviesState';
import { MoviesContextType, MoviesProviderProps } from './MoviesContext.types';
import { applyAllFilters } from './movieFilters';

const MoviesContext = createContext<MoviesContextType | undefined>(undefined);

export const MoviesProvider: React.FC<MoviesProviderProps> = ({ children }) => {
  // Separar estados en hooks específicos
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
  } = useFiltersState();

  // Operaciones de películas
  const { toggleFavorite, loadMovies, addMovie, updateMovie, deleteMovie } =
    useMovieOperations({
      setMovies,
      setLoading,
    });

  // Memoizar el cálculo de películas filtradas
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

  // Memoizar el valor del contexto para evitar re-renders innecesarios
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
      toggleFavorite,
      loadMovies,
      addMovie,
      updateMovie,
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
      toggleFavorite,
      loadMovies,
      addMovie,
      updateMovie,
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
    throw new Error('useMovies must be used within a MoviesProvider');
  }
  return context;
};

export type {
  MoviesContextType,
  MoviesProviderProps,
} from './MoviesContext.types';
