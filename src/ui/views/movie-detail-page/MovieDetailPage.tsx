import React from 'react';
import { Movie } from '../../../core/models/movie';
import MovieDetailSidebar from '../../components/movie-detail-sidebar/MovieDetailSidebar';
import MovieDetailContent from '../../components/movie-detail-content/MovieDetailContent';
import styles from './MovieDetailPage.module.css';

// Datos de ejemplo - en una app real vendría de una API o base de datos
const sampleMovies: Movie[] = [
  {
    id: '1',
    title: 'The Shawshank Redemption',
    director: 'Frank Darabont',
    releaseYear: 1994,
    genre: 'Drama',
    rating: 9.3,
    favorite: true,
  },
  {
    id: '2',
    title: 'The Godfather',
    director: 'Francis Ford Coppola',
    releaseYear: 1972,
    genre: 'Crime',
    rating: 9.2,
    favorite: false,
  },
  {
    id: '3',
    title: 'The Dark Knight',
    director: 'Christopher Nolan',
    releaseYear: 2008,
    genre: 'Action',
    rating: 9.0,
    favorite: true,
  },
];

interface MovieDetailPageProps {
  params: {
    id: string;
  };
}

export default function MovieDetailPage({ params }: MovieDetailPageProps) {
  // Encontrar la película actual
  const currentMovie = sampleMovies.find((movie) => movie.id === params.id);

  // Si no encontramos la película, mostrar error
  if (!currentMovie) {
    return (
      <main className={styles.container}>
        <div className={styles.errorMessage}>
          <h1>Movie not found</h1>
          <p>The movie with ID {params.id} could not be found.</p>
        </div>
      </main>
    );
  }

  // Encontrar películas anterior y siguiente
  const currentIndex = sampleMovies.findIndex(
    (movie) => movie.id === params.id
  );
  const previousMovie =
    currentIndex > 0 ? sampleMovies[currentIndex - 1] : undefined;
  const nextMovie =
    currentIndex < sampleMovies.length - 1
      ? sampleMovies[currentIndex + 1]
      : undefined;

  return (
    <main className={styles.container}>
      <MovieDetailSidebar
        currentMovieId={currentMovie.id}
        previousMovieId={previousMovie?.id}
        nextMovieId={nextMovie?.id}
      />
      <MovieDetailContent movie={currentMovie} />
    </main>
  );
}
