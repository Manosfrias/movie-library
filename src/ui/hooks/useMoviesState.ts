import { sampleMovies } from '@/core/data/sampleMovies';
import { Movie } from '@/core/models/movie';
import { useState } from 'react';

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
