import React from 'react';
import { Movie } from '../../../core/models/movie';
import MovieDetailSidebar from '../../components/movie-detail-sidebar/MovieDetailSidebar';
import MovieDetailContent from '../../components/movie-detail-content/MovieDetailContent';
import styles from './MovieDetailPage.module.css';
import { MovieDetailPageProps } from './movieDetailPage.type';
import { sampleMovies as data } from '../../../../sample';

const sampleMovies: Movie[] = data;

export default function MovieDetailPage({ params }: MovieDetailPageProps) {
  const currentMovie = sampleMovies.find((movie) => movie.id === params.id);

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
      {/* <MovieDetailSidebar
        currentMovieId={currentMovie.id}
        previousMovieId={previousMovie?.id}
        nextMovieId={nextMovie?.id}
      />
      <MovieDetailContent movie={currentMovie} /> */}
    </main>
  );
}
