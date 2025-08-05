import { useTexts } from '@/ui/hooks/useTexts';
import React from 'react';
import styles from './DeleteMovieModal.module.css';

interface DeleteMovieModalProps {
  movieTitle: string;
  isOpen: boolean;
  isDeleting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteMovieModal({
  movieTitle,
  isOpen,
  isDeleting,
  onConfirm,
  onCancel,
}: DeleteMovieModalProps) {
  const { texts } = useTexts();
  const deleteMovie = texts.deleteMovie;

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>{deleteMovie.title}</h2>
        </div>

        <div className={styles.content}>
          <p className={styles.message}>{deleteMovie.confirmMessage}</p>
          <p className={styles.description}>{deleteMovie.confirmDescription}</p>
          <div className={styles.movieTitle}>&ldquo;{movieTitle}&rdquo;</div>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onCancel}
            disabled={isDeleting}
          >
            {deleteMovie.actions.cancel}
          </button>
          <button
            type="button"
            className={styles.confirmButton}
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting
              ? deleteMovie.actions.deleting
              : deleteMovie.actions.confirm}
          </button>
        </div>
      </div>
    </div>
  );
}
