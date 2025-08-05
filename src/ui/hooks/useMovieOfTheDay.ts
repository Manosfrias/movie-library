'use client';
import type { Movie } from '@/core/models/movie';
import { useEffect, useState } from 'react';
import { useMovieService } from './useMovieService';

const MOVIE_OF_THE_DAY_KEY = 'movie-of-the-day';
const MOVIE_OF_THE_DAY_DATE_KEY = 'movie-of-the-day-date';

interface MovieOfTheDayData {
  movie: Movie;
  date: string;
}

const isToday = (dateString: string): boolean => {
  const today = new Date().toDateString();
  const storedDate = new Date(dateString).toDateString();
  return today === storedDate;
};

const getStoredMovieOfTheDay = (): MovieOfTheDayData | null => {
  if (typeof window === 'undefined') return null;

  try {
    const storedMovie = localStorage.getItem(MOVIE_OF_THE_DAY_KEY);
    const storedDate = localStorage.getItem(MOVIE_OF_THE_DAY_DATE_KEY);

    if (storedMovie && storedDate && isToday(storedDate)) {
      return {
        movie: JSON.parse(storedMovie),
        date: storedDate,
      };
    }
  } catch (error) {
    console.warn('Error reading movie of the day from storage:', error);
  }

  return null;
};

const storeMovieOfTheDay = (movie: Movie): void => {
  if (typeof window === 'undefined') return;

  try {
    const today = new Date().toISOString();
    localStorage.setItem(MOVIE_OF_THE_DAY_KEY, JSON.stringify(movie));
    localStorage.setItem(MOVIE_OF_THE_DAY_DATE_KEY, today);
  } catch (error) {
    console.warn('Error storing movie of the day:', error);
  }
};

export const useMovieOfTheDay = () => {
  const [movieOfTheDay, setMovieOfTheDay] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const movieService = useMovieService();

  useEffect(() => {
    const loadMovieOfTheDay = async () => {
      setLoading(true);
      setError(null);

      const storedData = getStoredMovieOfTheDay();
      if (storedData) {
        setMovieOfTheDay(storedData.movie);
        setLoading(false);
        return;
      }

      try {
        const movie = await movieService.getMovieOfTheDay();
        if (movie) {
          setMovieOfTheDay(movie);
          storeMovieOfTheDay(movie);
        } else {
          setError('No hay películas favoritas disponibles');
        }
      } catch (err) {
        setError('Error al cargar la película del día');
        console.error('Error loading movie of the day:', err);
      } finally {
        setLoading(false);
      }
    };

    loadMovieOfTheDay();
  }, [movieService]);

  return {
    movieOfTheDay,
    loading,
    error,
  };
};
