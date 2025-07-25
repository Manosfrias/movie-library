"use client"
import React from 'react';
import Link from 'next/link';
import styles from './MovieDetailSidebar.module.css';

interface MovieDetailSidebarProps {
  currentMovieId: string;
  previousMovieId?: string;
  nextMovieId?: string;
}

export default function MovieDetailSidebar({ 
  currentMovieId, 
  previousMovieId, 
  nextMovieId 
}: MovieDetailSidebarProps) {
  return (
    <aside className={styles.sidebar}>
      {/* Botón Home */}
      <div className={styles.navigationSection}>
        <h3 className={styles.sectionTitle}>Navigation</h3>
        <Link href="/" className={styles.navButton}>
          <span className={styles.icon}>🏠</span>
          <span className={styles.navText}>Back to Home</span>
        </Link>
      </div>

      {/* Navegación entre películas */}
      {(previousMovieId || nextMovieId) && (
        <div className={styles.navigationSection}>
          <h3 className={styles.sectionTitle}>Browse Movies</h3>
          
          {previousMovieId && (
            <Link href={`/movies/${previousMovieId}`} className={styles.navButton}>
              <span className={styles.icon}>⬅️</span>
              <span className={styles.navText}>Previous Movie</span>
            </Link>
          )}
          
          {nextMovieId && (
            <Link href={`/movies/${nextMovieId}`} className={styles.navButton}>
              <span className={styles.icon}>➡️</span>
              <span className={styles.navText}>Next Movie</span>
            </Link>
          )}
        </div>
      )}

      {/* Acciones adicionales */}
      <div className={styles.navigationSection}>
        <h3 className={styles.sectionTitle}>Actions</h3>
        <button className={styles.actionButton}>
          <span className={styles.icon}>⭐</span>
          <span className={styles.navText}>Add to Favorites</span>
        </button>
        <button className={styles.actionButton}>
          <span className={styles.icon}>📋</span>
          <span className={styles.navText}>Add to Watchlist</span>
        </button>
      </div>
    </aside>
  );
}
