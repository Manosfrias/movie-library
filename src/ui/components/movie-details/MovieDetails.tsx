import React from 'react';
import styles from './MovieDetails.module.css';
import { MovieDetailsProps } from './MovieDetails.types';

export default function MovieDetails({
  director,
  year,
  rating,
}: MovieDetailsProps) {
  return (
    <ul className={styles.details}>
      <li className={styles.director}>Dir. {director}</li>
      <li className={styles.year}>{year}</li>
      <li className={styles.rating}>⭐ {rating}</li>
    </ul>
  );
}
