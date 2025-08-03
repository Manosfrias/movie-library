import { useState } from 'react';
import { Movie } from '../../core/models/movie';
import { sampleMovies } from '../../../sample';

export const useMoviesState = () => {
  const [movies, setMovies] = useState<Movie[]>(sampleMovies);
  const [loading, setLoading] = useState<boolean>(false);

  return {
    movies,
    setMovies,
    loading,
    setLoading,
  };
};
