import { useMovieForm } from '@/ui/hooks/movie-form/useMovieForm';
import { useEffect } from 'react';
import { useTexts } from '../../hooks/useTexts';
import { AddMovieForm } from '../add-movie-form/AddMovieForm';
import styles from './AddMovieModal.module.css';
import { AddMovieModalProps } from './AddMovieModal.types';

export const AddMovieModal = ({ isOpen, onClose, onSuccess }: AddMovieModalProps) => {
  const { texts } = useTexts();
  const {
    formData,
    errors,
    isSubmitting,
    updateField,
    submitForm,
    resetForm,
  } = useMovieForm();

  const handleSubmit = async () => {
    const newMovie = await submitForm();
    if (newMovie) {
      onSuccess?.();
      onClose();
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        resetForm();
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, resetForm, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{texts.addMovie.title}</h2>
          <button
            type="button"
            className={styles.closeButton}
            onClick={handleClose}
            aria-label="Cerrar modal"
          >
            ×
          </button>
        </div>
        
        <AddMovieForm
          formData={formData}
          errors={errors}
          isSubmitting={isSubmitting}
          onFieldChange={updateField}
          onSubmit={handleSubmit}
          onCancel={handleClose}
        />
      </div>
    </div>
  );
};
