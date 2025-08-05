'use client';
import { useFiltersState } from '@/ui/hooks/filters/useFiltersState';
import React, { createContext, useContext, useMemo } from 'react';
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
    const filtered = applyAllFilters(
      movies,
      showOnlyFavorites,
      searchQuery,
      searchCriteria,
      selectedGenre,
      sortBy
    );
    
    // Si no hay películas filtradas pero sí hay películas en total, resetear filtros
    if (filtered.length === 0 && movies.length > 0) {
      // Solo resetear si hay filtros activos
      if (showOnlyFavorites || searchQuery.trim() !== '' || selectedGenre !== 'Todos los Géneros') {
        setTimeout(() => {
          setShowOnlyFavorites(false);
          setSearchQuery('');
          setSelectedGenre('Todos los Géneros');
        }, 0);
      }
    }
    
    return filtered;
  }, [
    movies,
    showOnlyFavorites,
    searchQuery,
    searchCriteria,
    selectedGenre,
    sortBy,
    setShowOnlyFavorites,
    setSearchQuery,
    setSelectedGenre,
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
  MoviesProviderProps
} from './MoviesContext.types';

