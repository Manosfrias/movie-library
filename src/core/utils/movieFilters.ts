import { Movie } from '../models/movie';

export interface FilterCriteria {
  showOnlyFavorites: boolean;
  searchQuery: string;
  searchCriteria: 'byTitle' | 'byDirector' | 'byReleaseDate' | 'byRating' | 'all';
  selectedGenre: string;
  sortBy: 'Por Título' | 'Por Director' | 'Por Fecha de Estreno' | 'Por Calificación' | '';
}

export const filterByFavorites = (
  movies: Movie[],
  showOnlyFavorites: boolean
): Movie[] => {
  if (!showOnlyFavorites) return movies;
  return movies.filter((movie) => movie.favorite);
};

export const filterBySearch = (
  movies: Movie[],
  searchQuery: string,
  searchCriteria: string
): Movie[] => {
  if (!searchQuery.trim()) return movies;

  const query = searchQuery.toLowerCase();
  return movies.filter((movie) => {
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
};

export const filterByGenre = (
  movies: Movie[],
  selectedGenre: string
): Movie[] => {
  if (!selectedGenre || selectedGenre === 'Todos los Géneros') return movies;
  return movies.filter((movie) => movie.genre === selectedGenre);
};

export const sortMovies = (movies: Movie[], sortBy: string): Movie[] => {
  if (!sortBy) return movies;

  const sorted = [...movies];
  sorted.sort((a, b) => {
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

  return sorted;
};

export const applyAllFilters = (
  movies: Movie[],
  criteria: FilterCriteria
): Movie[] => {
  let filtered = [...movies];

  filtered = filterByFavorites(filtered, criteria.showOnlyFavorites);
  filtered = filterBySearch(filtered, criteria.searchQuery, criteria.searchCriteria);
  filtered = filterByGenre(filtered, criteria.selectedGenre);
  filtered = sortMovies(filtered, criteria.sortBy);

  return filtered;
};

// Utility functions for getting unique values
export const getUniqueGenres = (movies: Movie[]): string[] => {
  const genres = movies.map(movie => movie.genre);
  return Array.from(new Set(genres)).sort();
};

export const getYearRange = (movies: Movie[]): { min: number; max: number } => {
  if (movies.length === 0) return { min: new Date().getFullYear(), max: new Date().getFullYear() };
  
  const years = movies.map(movie => movie.releaseYear);
  return {
    min: Math.min(...years),
    max: Math.max(...years)
  };
};

export const getRatingRange = (movies: Movie[]): { min: number; max: number } => {
  if (movies.length === 0) return { min: 0, max: 10 };
  
  const ratings = movies.map(movie => movie.rating);
  return {
    min: Math.min(...ratings),
    max: Math.max(...ratings)
  };
};
