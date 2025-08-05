'use client';
import Link from 'next/link';
import styles from './MovieDetailSidebar.module.css';
import { MovieDetailSidebarProps } from './MovieDetailSidebar.types';

export default function MovieDetailSidebar({
  previousMovieId,
  nextMovieId,
}: MovieDetailSidebarProps) {
  return (
    <>
      <Link href="/" className={styles.navButton}>
        Home
      </Link>

      {(previousMovieId || nextMovieId) && (
        <div className={styles.navigationSection}>
          {previousMovieId && (
            <Link href={`/${previousMovieId}`} className={styles.navButton}>
              <span className={styles.navText}>Previous</span>
            </Link>
          )}

          {nextMovieId && (
            <Link href={`/${nextMovieId}`} className={styles.navButton}>
              <span className={styles.navText}>Next</span>
            </Link>
          )}
        </div>
      )}
    </>
  );
}
