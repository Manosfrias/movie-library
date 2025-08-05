import { useTexts } from '../../hooks/useTexts';
import styles from './AddMovieForm.module.css';
import { AddMovieFormProps } from './AddMovieForm.types';
import { MovieFormRow } from './MovieFormRow';

const GENRE_OPTIONS = [
  'Acción',
  'Aventura',
  'Animación',
  'Biografía',
  'Comedia',
  'Crime',
  'Documental',
  'Drama',
  'Familiar',
  'Fantasía',
  'Historia',
  'Horror',
  'Musical',
  'Misterio',
  'Romance',
  'Sci-Fi',
  'Deporte',
  'Suspense',
  'Guerra',
  'Western',
];

export const AddMovieForm: React.FC<AddMovieFormProps> = ({
  formData,
  errors,
  onFieldChange,
  onSubmit,
  onCancel,
  isSubmitting = false,
}) => {
  const { getAddMovieFormText, getAddMovieActionsText } = useTexts();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onFieldChange('title', formData.title);
    onFieldChange('director', formData.director);
    onFieldChange('releaseYear', formData.releaseYear);
    onFieldChange('genre', formData.genre);
    onFieldChange('rating', formData.rating);

    setTimeout(() => {
      const hasErrors = Object.values(errors).some(
        (error) => error !== null && error !== undefined
      );

      if (
        !hasErrors &&
        formData.title &&
        formData.director &&
        formData.genre &&
        formData.releaseYear &&
        formData.rating
      ) {
        onSubmit();
      }
    }, 100);
  };

  return (
    <form className={styles.addMovieForm} onSubmit={handleSubmit}>
      <MovieFormRow
        label={getAddMovieFormText('title')}
        required
        errors={errors.title}
      >
        <input
          id="title"
          name="title"
          type="text"
          className={`${styles.formInput} ${errors.title ? styles.error : ''}`}
          value={formData.title}
          onChange={(e) => onFieldChange('title', e.target.value)}
          onBlur={(e) => onFieldChange('title', e.target.value)}
          placeholder={getAddMovieFormText('titlePlaceholder')}
          disabled={isSubmitting}
        />
      </MovieFormRow>
      <MovieFormRow
        label={getAddMovieFormText('director')}
        required
        errors={errors.director}
      >
        <input
          id="director"
          name="director"
          type="text"
          className={`${styles.formInput} ${errors.director ? styles.error : ''}`}
          value={formData.director}
          onChange={(e) => onFieldChange('director', e.target.value)}
          onBlur={(e) => onFieldChange('director', e.target.value)}
          placeholder={getAddMovieFormText('directorPlaceholder')}
          disabled={isSubmitting}
        />
      </MovieFormRow>

      <MovieFormRow
        label={getAddMovieFormText('releaseYear')}
        required
        errors={errors.releaseYear}
      >
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
      </MovieFormRow>

      <MovieFormRow
        label={getAddMovieFormText('genre')}
        required
        errors={errors.genre}
      >
        <select
          id="genre"
          name="genre"
          className={`${styles.formSelect} ${errors.genre ? styles.error : ''}`}
          value={formData.genre}
          onChange={(e) => onFieldChange('genre', e.target.value)}
          onBlur={(e) => onFieldChange('genre', e.target.value)}
          disabled={isSubmitting}
        >
          <option value="">{getAddMovieFormText('genreSelect')}</option>
          {GENRE_OPTIONS.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </MovieFormRow>

      <MovieFormRow
        label={getAddMovieFormText('rating')}
        required
        errors={errors.rating}
      >
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
          onBlur={(e) => {
            const value = e.target.value;
            onFieldChange('rating', value === '' ? '' : parseFloat(value));
          }}
          min="0"
          max="10"
          step="0.1"
          placeholder={getAddMovieFormText('ratingPlaceholder')}
          disabled={isSubmitting}
        />
      </MovieFormRow>

      <MovieFormRow
        label={getAddMovieFormText('isFavorite')}
        errors={errors.isFavorite}
      >
        <input
          className={styles.formCheckbox}
          type="checkbox"
          checked={formData.isFavorite || false}
          onChange={(e) => onFieldChange('isFavorite', e.target.checked)}
          disabled={isSubmitting}
        />
      </MovieFormRow>

      <div className={styles.formActions}>
        <button
          type="button"
          className={styles.cancelButton}
          onClick={onCancel}
          disabled={isSubmitting}
        >
          {getAddMovieActionsText('cancel')}
        </button>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting
            ? getAddMovieActionsText('saving')
            : getAddMovieActionsText('save')}
        </button>
      </div>
    </form>
  );
};
