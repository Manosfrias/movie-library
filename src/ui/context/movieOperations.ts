import { Movie } from '../../core/models/movie';

export const toggleMovieFavorite = (
  movies: Movie[],
  movieId: string
): Movie[] => {
  return movies.map((movie) =>
    movie.id === movieId ? { ...movie, favorite: !movie.favorite } : movie
  );
};

export const addNewMovie = (
  movies: Movie[],
  movie: Omit<Movie, 'id'>
): Movie[] => {
  const newMovie: Movie = {
    ...movie,
    id: Date.now().toString(),
  };
  return [...movies, newMovie];
};

export const removeMovie = (movies: Movie[], movieId: string): Movie[] => {
  return movies.filter((movie) => movie.id !== movieId);
};
