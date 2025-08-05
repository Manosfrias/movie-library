'use client';
import Link from 'next/link';
import { useTexts } from '../../hooks/useTexts';
import styles from './MovieDetailSidebar.module.css';
import { MovieDetailSidebarProps } from './MovieDetailSidebar.types';

export default function MovieDetailSidebar({
  previousMovieId,
  nextMovieId,
}: MovieDetailSidebarProps) {
  const { getNavigationText } = useTexts();

  return (
    <>
      {(previousMovieId || nextMovieId) && (
        <div className={styles.navigationSection}>
          {previousMovieId && (
            <Link href={`/${previousMovieId}`} className={styles.button}>
              {getNavigationText('previous')}
            </Link>
          )}

          {nextMovieId && (
            <Link href={`/${nextMovieId}`} className={styles.button}>
              {getNavigationText('next')}
            </Link>
          )}
        </div>
      )}
    </>
  );
}
