import { useTexts } from '../../hooks/useTexts';
import styles from './AddMovieForm.module.css';
import { AddMovieFormProps } from './AddMovieForm.types';

const GENRE_OPTIONS = [
  'Acción', 'Aventura', 'Animación', 'Biografía', 'Comedia', 
  'Crime', 'Documental', 'Drama', 'Familiar', 'Fantasía', 
  'Historia', 'Horror', 'Musical', 'Misterio', 'Romance', 
  'Sci-Fi', 'Deporte', 'Suspense', 'Guerra', 'Western'
];

export const AddMovieForm: React.FC<AddMovieFormProps> = ({ 
  formData,
  errors,
  onFieldChange,
  onSubmit, 
  onCancel, 
  isSubmitting = false 
}) => {
  const { texts } = useTexts();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Forzar validación de todos los campos llamando onFieldChange con valores actuales
    onFieldChange('title', formData.title);
    onFieldChange('director', formData.director); 
    onFieldChange('releaseYear', formData.releaseYear);
    onFieldChange('genre', formData.genre);
    onFieldChange('rating', formData.rating);

    // Dar tiempo para que las validaciones se procesen
    setTimeout(() => {
      // Verificar si hay errores antes de enviar
      const hasErrors = Object.values(errors).some(error => error !== null && error !== undefined);
      
      if (!hasErrors && 
          formData.title && 
          formData.director && 
          formData.genre && 
          formData.releaseYear && 
          formData.rating) {
        onSubmit();
      }
    }, 100);
  };

  return (
    <form className={styles.addMovieForm} onSubmit={handleSubmit}>
      <div className={styles.formRow}>
        <label htmlFor="title" className={styles.formLabel}>
          {texts.addMovie.form.title} {texts.addMovie.form.required}
        </label>
        <input
          id="title"
          name="title"
          type="text"
          className={`${styles.formInput} ${errors.title ? styles.error : ''}`}
          value={formData.title}
          onChange={(e) => onFieldChange('title', e.target.value)}
          onBlur={(e) => onFieldChange('title', e.target.value)}
          placeholder={texts.addMovie.form.titlePlaceholder}
          disabled={isSubmitting}
        />
        {errors.title && (
          <span className={styles.errorMessage}>{errors.title}</span>
        )}
      </div>

      <div className={styles.formRow}>
        <label htmlFor="director" className={styles.formLabel}>
          {texts.addMovie.form.director} {texts.addMovie.form.required}
        </label>
        <input
          id="director"
          name="director"
          type="text"
          className={`${styles.formInput} ${errors.director ? styles.error : ''}`}
          value={formData.director}
          onChange={(e) => onFieldChange('director', e.target.value)}
          onBlur={(e) => onFieldChange('director', e.target.value)}
          placeholder={texts.addMovie.form.directorPlaceholder}
          disabled={isSubmitting}
        />
        {errors.director && (
          <span className={styles.errorMessage}>{errors.director}</span>
        )}
      </div>

      <div className={styles.formRow}>
        <label htmlFor="releaseYear" className={styles.formLabel}>
          {texts.addMovie.form.releaseYear} {texts.addMovie.form.required}
        </label>
        <input
          id="releaseYear"
          name="releaseYear"
          type="number"
          className={`${styles.formInput} ${errors.releaseYear ? styles.error : ''}`}
          value={formData.releaseYear}
          onChange={(e) => {
            const value = e.target.value;
            onFieldChange('releaseYear', value === '' ? '' : parseInt(value));
          }}
          onBlur={(e) => {
            const value = e.target.value;
            onFieldChange('releaseYear', value === '' ? '' : parseInt(value));
          }}
          disabled={isSubmitting}
        />
        {errors.releaseYear && (
          <span className={styles.errorMessage}>{errors.releaseYear}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="genre" className={styles.formLabel}>
          {texts.addMovie.form.genre} {texts.addMovie.form.required}
        </label>
        <select
          id="genre"
          name="genre"
          className={`${styles.formSelect} ${errors.genre ? styles.error : ''}`}
          value={formData.genre}
          onChange={(e) => onFieldChange('genre', e.target.value)}
          onBlur={(e) => onFieldChange('genre', e.target.value)}
          disabled={isSubmitting}
        >
          <option value="">{texts.addMovie.form.genreSelect}</option>
          {GENRE_OPTIONS.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        {errors.genre && (
          <span className={styles.errorMessage}>{errors.genre}</span>
        )}
      </div>

      <div className={styles.formRow}>
        <label htmlFor="rating" className={styles.formLabel}>
          {texts.addMovie.form.rating} {texts.addMovie.form.required}
        </label>
        <input
          id="rating"
          name="rating"
          type="number"
          className={`${styles.formInput} ${errors.rating ? styles.error : ''}`}
          value={formData.rating}
          onChange={(e) => {
            const value = e.target.value;
            onFieldChange('rating', value === '' ? '' : parseFloat(value));
          }}
          min="0"
          max="10"
          step="0.1"
          disabled={isSubmitting}
          onBlur={(e) => {
            const value = e.target.value;
            onFieldChange('rating', value === '' ? '' : parseFloat(value));
          }}
          placeholder={texts.addMovie.form.ratingPlaceholder}
        />
        {errors.rating && (
          <span className={styles.errorMessage}>{errors.rating}</span>
        )}
      </div>

      <div className={styles.formRow}>
        <label className={`${styles.formLabel} ${styles.checkboxLabel}`}>
          <input
            type="checkbox"
            checked={formData.isFavorite || false}
            onChange={(e) => onFieldChange('isFavorite', e.target.checked)}
            disabled={isSubmitting}
          />
          {texts.addMovie.form.isFavorite}
        </label>
      </div>

      <div className={styles.formActions}>
        <button
          type="button"
          className={styles.cancelButton}
          onClick={onCancel}
          disabled={isSubmitting}
        >
          {texts.addMovie.actions.cancel}
        </button>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? texts.addMovie.actions.saving : texts.addMovie.actions.save}
        </button>
      </div>
    </form>
  );
};
