'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Movie } from '../models/movie';
import { sampleMovies } from '../../../sample';

interface MoviesContextType {
  movies: Movie[];
  filteredMovies: Movie[];
  loading: boolean;
  showOnlyFavorites: boolean;
  searchQuery: string;
  searchCriteria: string;
  selectedGenre: string;
  sortBy: string;
  setShowOnlyFavorites: (show: boolean) => void;
  setSearchQuery: (query: string) => void;
  setSearchCriteria: (criteria: string) => void;
  setSelectedGenre: (genre: string) => void;
  setSortBy: (sort: string) => void;
  toggleFavorite: (movieId: string) => void;
}

const MoviesContext = createContext<MoviesContextType | undefined>(undefined);

interface MoviesProviderProps {
  children: ReactNode;
}

export const MoviesProvider: React.FC<MoviesProviderProps> = ({ children }) => {
  const [movies, setMovies] = useState<Movie[]>(sampleMovies);
  const [loading, setLoading] = useState<boolean>(false);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchCriteria, setSearchCriteria] = useState<string>('byTitle');
  const [selectedGenre, setSelectedGenre] = useState<string>('All Genres');
  const [sortBy, setSortBy] = useState<string>('');

  const toggleFavorite = (movieId: string) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === movieId ? { ...movie, favorite: !movie.favorite } : movie
      )
    );
  };

  // Filtrar y ordenar películas
  const getFilteredMovies = (): Movie[] => {
    let filtered = [...movies];

    // Filtrar por favoritas
    if (showOnlyFavorites) {
      filtered = filtered.filter((movie) => movie.favorite);
    }

    // Filtrar por búsqueda
    if (searchQuery.trim()) {
      filtered = filtered.filter((movie) => {
        const query = searchQuery.toLowerCase();
        switch (searchCriteria) {
          case 'byTitle':
            return movie.title.toLowerCase().includes(query);
          case 'byDirector':
            return movie.director.toLowerCase().includes(query);
          case 'byReleaseDate':
            return movie.releaseYear.toString().includes(query);
          case 'byRating':
            return movie.rating.toString().includes(query);
          default:
            return (
              movie.title.toLowerCase().includes(query) ||
              movie.director.toLowerCase().includes(query)
            );
        }
      });
    }

    // Filtrar por género
    if (selectedGenre && selectedGenre !== 'All Genres') {
      filtered = filtered.filter((movie) => movie.genre === selectedGenre);
    }

    // Ordenar
    if (sortBy) {
      filtered.sort((a, b) => {
        switch (sortBy) {
          case 'Por Título':
            return a.title.localeCompare(b.title);
          case 'Por Director':
            return a.director.localeCompare(b.director);
          case 'Por Fecha de Estreno':
            return b.releaseYear - a.releaseYear;
          case 'Por Calificación':
            return b.rating - a.rating;
          default:
            return 0;
        }
      });
    }

    return filtered;
  };

  const filteredMovies = getFilteredMovies();

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
