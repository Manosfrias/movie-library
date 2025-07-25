import React from 'react';
import styles from './MovieDetailPage.module.css';
import { useTexts } from '../../hooks/useTexts';

interface MovieDetailPageProps {
  params: {
    id: string;
  };
}

export default function MovieDetailPage({ params }: MovieDetailPageProps) {
  const { getMovieDetailText } = useTexts();

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>
        {getMovieDetailText('title')} - {params.id}
      </h1>
      <div className={styles.content}>
        <p>Detalles de la película con ID: {params.id}</p>
      </div>
    </main>
  );
}
