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
      {(previousMovieId || nextMovieId) && (
        <div className={styles.navigationSection}>
          {previousMovieId && (
            <Link href={`/${previousMovieId}`} className={styles.button}>
              Previous
            </Link>
          )}

          {nextMovieId && (
            <Link href={`/${nextMovieId}`} className={styles.button}>
              Next
            </Link>
          )}
        </div>
      )}
    </>
  );
}
