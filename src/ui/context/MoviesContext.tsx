'use client';
import React, { createContext, useContext, useState } from 'react';
import { Movie } from '../../core/models/movie';
import { sampleMovies } from '../../../sample';
import { MoviesContextType, MoviesProviderProps } from './MoviesContext.types';
import { applyAllFilters } from './movieFilters';
import {
  toggleMovieFavorite,
  addNewMovie,
  removeMovie,
} from './movieOperations';
import {
  loadMoviesFromAPI,
  saveMovieToAPI,
  deleteMovieFromAPI,
} from './movieAPI';

const MoviesContext = createContext<MoviesContextType | undefined>(undefined);

export const MoviesProvider: React.FC<MoviesProviderProps> = ({ children }) => {
  const [movies, setMovies] = useState<Movie[]>(sampleMovies);
  const [loading, setLoading] = useState<boolean>(false);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchCriteria, setSearchCriteria] = useState<string>('byTitle');
  const [selectedGenre, setSelectedGenre] =
    useState<string>('Todos los Géneros');
  const [sortBy, setSortBy] = useState<string>('');

  const toggleFavorite = (movieId: string) => {
    setMovies((prevMovies) => toggleMovieFavorite(prevMovies, movieId));
  };

  const loadMovies = async () => {
    setLoading(true);
    try {
      const moviesData = await loadMoviesFromAPI();
      setMovies(moviesData);
    } catch (error) {
      console.error('Error loading movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const addMovie = async (movie: Omit<Movie, 'id'>) => {
    setLoading(true);
    try {
      const savedMovie = await saveMovieToAPI(movie);
      setMovies((prevMovies) => addNewMovie(prevMovies, savedMovie));
    } catch (error) {
      console.error('Error adding movie:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteMovie = async (movieId: string) => {
    setLoading(true);
    try {
      await deleteMovieFromAPI(movieId);
      setMovies((prevMovies) => removeMovie(prevMovies, movieId));
    } catch (error) {
      console.error('Error deleting movie:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredMovies = applyAllFilters(
    movies,
    showOnlyFavorites,
    searchQuery,
    searchCriteria,
    selectedGenre,
    sortBy
  );

  return (
    <MoviesContext.Provider
      value={{
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
        deleteMovie,
      }}
    >
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
