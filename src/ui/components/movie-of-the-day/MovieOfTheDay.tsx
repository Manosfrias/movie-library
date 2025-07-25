import React from 'react';
import styles from './MovieOfTheDay.module.css';

export default function MovieOfTheDay() {
  return (
    <a href="/1" className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>Movie Of The Day</h2>
        <span className={styles.badge}>Featured</span>
      </header>

      <article className={styles.movieInfo}>
        <h3 className={styles.movieTitle}>The Shawshank Redemption</h3>
        <ul className={styles.details}>
          <li className={styles.director}>Dir. Frank Darabont</li>
          <li className={styles.year}>1994</li>
          <li className={styles.rating}>⭐ 9.3</li>
        </ul>
      </article>

      <footer className={styles.footer}>
        <span className={styles.cta}>View Details →</span>
      </footer>
    </a>
  );
}
