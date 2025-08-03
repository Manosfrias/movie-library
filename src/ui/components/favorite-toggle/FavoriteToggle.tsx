'use client';
import React from 'react';
import styles from './FavoriteToggle.module.css';
import { useTexts } from '@/ui/hooks/useTexts';
import { useMovies } from '@/ui/context/MoviesContext';

export default function FavoriteToggle() {
  const { getFavoriteToggleText } = useTexts();
  const { showOnlyFavorites, setShowOnlyFavorites } = useMovies();

  const handleToggle = async () => {
    const newValue = !showOnlyFavorites;
    await setShowOnlyFavorites(newValue);
  };

  return (
    <button
      className={`${styles.button} ${showOnlyFavorites ? styles.active : ''}`}
      onClick={handleToggle}
    >
      <span className={styles.icon}>⭐</span>
      <span className={styles.text}>
        {showOnlyFavorites
          ? getFavoriteToggleText('showAll')
          : getFavoriteToggleText('showOnlyFavorites')}
      </span>
    </button>
  );
}
