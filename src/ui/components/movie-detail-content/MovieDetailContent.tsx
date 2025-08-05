import { useMovies } from '@/ui/context/MoviesContext';
import { useTexts } from '@/ui/hooks/useTexts';
import { useState } from 'react';
import { Movie } from '../../../core/models/movie';
import DeleteMovieModal from '../delete-movie-modal/DeleteMovieModal';
import styles from './MovieDetailContent.module.css';

interface MovieDetailContentProps {
  movie: Movie;
}

export default function MovieDetailContent({ movie }: MovieDetailContentProps) {
  const { updateMovie, deleteMovie, loading } = useMovies();
  const { texts } = useTexts();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    title: movie.title,
    director: movie.director,
    releaseYear: movie.releaseYear,
    genre: movie.genre,
    rating: movie.rating,
    favorite: movie.favorite,
  });

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancelar edición - resetear datos
      setEditData({
        title: movie.title,
        director: movie.director,
        releaseYear: movie.releaseYear,
        genre: movie.genre,
        rating: movie.rating,
        favorite: movie.favorite,
      });
    }
    setIsEditing(!isEditing);
  };

  const handleSaveEdit = async () => {
    try {
      await updateMovie(movie.id, editData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating movie:', error);
      // Aquí podrías mostrar un toast de error
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteMovie(movie.id);
      setIsDeleteModalOpen(false);
      // Navegar de vuelta a la página principal
      window.history.back();
    } catch (error) {
      console.error('Error deleting movie:', error);
      // Aquí podrías mostrar un toast de error
    }
  };

  const handleInputChange = (field: keyof typeof editData, value: any) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };
  return (
    <div className={styles.content}>
      {/* Header de la película */}
      <header className={styles.header}>
        <div className={styles.titleSection}>
          {isEditing ? (
            <input
              type="text"
              value={editData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className={styles.titleInput}
            />
          ) : (
            <h1 className={styles.title}>{movie.title}</h1>
          )}
          {movie.favorite && (
            <span className={styles.favoritebadge}>⭐ Favorite</span>
          )}
        </div>
        <div className={styles.rating}>
          {isEditing ? (
            <input
              type="number"
              min="0"
              max="10"
              step="0.1"
              value={editData.rating}
              onChange={(e) => handleInputChange('rating', parseFloat(e.target.value) || 0)}
              className={styles.ratingInput}
            />
          ) : (
            <>
              <span className={styles.ratingValue}>{movie.rating.toFixed(1)}</span>
              <span className={styles.ratingLabel}>/ 10</span>
            </>
          )}
        </div>
      </header>

      {/* Botones de acción */}
      <div className={styles.actionButtons}>
        {isEditing ? (
          <>
            <button
              type="button"
              onClick={handleSaveEdit}
              className={styles.saveButton}
              disabled={loading}
            >
              {loading ? texts.editMovie.actions.saving : texts.editMovie.actions.save}
            </button>
            <button
              type="button"
              onClick={handleEditToggle}
              className={styles.cancelButton}
              disabled={loading}
            >
              {texts.editMovie.actions.cancel}
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={handleEditToggle}
              className={styles.editButton}
            >
              {texts.editMovie.actions.edit}
            </button>
            <button
              type="button"
              onClick={() => setIsDeleteModalOpen(true)}
              className={styles.deleteButton}
            >
              {texts.deleteMovie.actions.delete}
            </button>
          </>
        )}
      </div>

      {/* Información básica */}
      <section className={styles.basicInfo}>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Director</span>
            {isEditing ? (
              <input
                type="text"
                value={editData.director}
                onChange={(e) => handleInputChange('director', e.target.value)}
                className={styles.infoInput}
              />
            ) : (
              <span className={styles.infoValue}>{movie.director}</span>
            )}
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Release Year</span>
            {isEditing ? (
              <input
                type="number"
                min="1800"
                max={new Date().getFullYear()}
                value={editData.releaseYear}
                onChange={(e) => handleInputChange('releaseYear', parseInt(e.target.value) || new Date().getFullYear())}
                className={styles.infoInput}
              />
            ) : (
              <span className={styles.infoValue}>{movie.releaseYear}</span>
            )}
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Genre</span>
            {isEditing ? (
              <select
                value={editData.genre}
                onChange={(e) => handleInputChange('genre', e.target.value)}
                className={styles.infoSelect}
              >
                <option value="Action">Action</option>
                <option value="Adventure">Adventure</option>
                <option value="Comedy">Comedy</option>
                <option value="Crime">Crime</option>
                <option value="Drama">Drama</option>
                <option value="Horror">Horror</option>
                <option value="Romance">Romance</option>
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="Thriller">Thriller</option>
              </select>
            ) : (
              <span className={styles.genreTag}>{movie.genre}</span>
            )}
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Favorite</span>
            {isEditing ? (
              <input
                type="checkbox"
                checked={editData.favorite}
                onChange={(e) => handleInputChange('favorite', e.target.checked)}
                className={styles.favoriteCheckbox}
              />
            ) : (
              <span className={styles.infoValue}>{movie.favorite ? 'Yes' : 'No'}</span>
            )}
          </div>
        </div>
      </section>

      {/* Sección de descripción (placeholder) */}
      <section className={styles.descriptionSection}>
        <h2 className={styles.sectionTitle}>Plot Summary</h2>
        <p className={styles.description}>
          This is a placeholder for the movie description. In a real
          application, this would contain the plot summary, cast information,
          and other details about the movie. The movie &ldquo;{movie.title}
          &rdquo; directed by {movie.director}
          was released in {movie.releaseYear} and belongs to the {movie.genre}{' '}
          genre.
        </p>
      </section>

      {/* Información adicional */}
      <section className={styles.additionalInfo}>
        <h2 className={styles.sectionTitle}>Additional Information</h2>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{movie.rating}</span>
            <span className={styles.statLabel}>IMDb Rating</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{movie.releaseYear}</span>
            <span className={styles.statLabel}>Release Year</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{movie.genre}</span>
            <span className={styles.statLabel}>Primary Genre</span>
          </div>
        </div>
      </section>

      {/* Modal de confirmación de eliminación */}
      <DeleteMovieModal
        movieTitle={movie.title}
        isOpen={isDeleteModalOpen}
        isDeleting={loading}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
}
