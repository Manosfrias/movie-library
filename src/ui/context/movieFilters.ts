import { Movie } from '../../core/models/movie';

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
  showOnlyFavorites: boolean,
  searchQuery: string,
  searchCriteria: string,
  selectedGenre: string,
  sortBy: string
): Movie[] => {
  let filtered = [...movies];

  filtered = filterByFavorites(filtered, showOnlyFavorites);
  filtered = filterBySearch(filtered, searchQuery, searchCriteria);
  filtered = filterByGenre(filtered, selectedGenre);
  filtered = sortMovies(filtered, sortBy);

  return filtered;
};
