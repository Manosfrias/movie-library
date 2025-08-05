import { Movie } from '@/core/models/movie';
import DeleteMovieModal from '@/ui/components/delete-movie-modal/DeleteMovieModal';
import { useMovies } from '@/ui/context/MoviesContext';
import { useTexts } from '@/ui/hooks/useTexts';
import { useState } from 'react';
import styles from './MovieDetailContent.module.css';

interface MovieDetailContentProps {
  movie: Movie;
}

export default function MovieDetailContent({ movie }: MovieDetailContentProps) {
  const { updateMovie, deleteMovie, loading } = useMovies();
  const {
    texts,
    getMovieDetailFieldText,
    getMovieDetailFavoriteStatusText,
    getGenreText,
  } = useTexts();
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
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteMovie(movie.id);
      setIsDeleteModalOpen(false);
      window.history.back();
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  const handleInputChange = (field: keyof typeof editData, value: any) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };
  return (
    <section className={styles.content}>
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
        </div>
        <div className={styles.rating}>
          {isEditing ? (
            <input
              type="number"
              min="0"
              max="10"
              step="0.1"
              value={editData.rating}
              onChange={(e) =>
                handleInputChange('rating', parseFloat(e.target.value) || 0)
              }
              className={styles.ratingInput}
            />
          ) : (
            <>
              <span className={styles.ratingValue}>
                {movie.rating.toFixed(1)}
              </span>
              <span className={styles.ratingLabel}>
                {getMovieDetailFieldText('rating')}
              </span>
            </>
          )}
        </div>
      </header>

      <section className={styles.basicInfo}>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>
              {getMovieDetailFieldText('director')}
            </span>
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
            <span className={styles.infoLabel}>
              {getMovieDetailFieldText('releaseYear')}
            </span>
            {isEditing ? (
              <input
                type="number"
                min="1800"
                max={new Date().getFullYear()}
                value={editData.releaseYear}
                onChange={(e) =>
                  handleInputChange(
                    'releaseYear',
                    parseInt(e.target.value) || new Date().getFullYear()
                  )
                }
                className={styles.infoInput}
              />
            ) : (
              <span className={styles.infoValue}>{movie.releaseYear}</span>
            )}
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>
              {getMovieDetailFieldText('genre')}
            </span>
            {isEditing ? (
              <select
                value={editData.genre}
                onChange={(e) => handleInputChange('genre', e.target.value)}
                className={styles.infoSelect}
              >
                <option value="Action">{getGenreText('Action')}</option>
                <option value="Adventure">{getGenreText('Adventure')}</option>
                <option value="Comedy">{getGenreText('Comedy')}</option>
                <option value="Crime">{getGenreText('Crime')}</option>
                <option value="Drama">{getGenreText('Drama')}</option>
                <option value="Horror">{getGenreText('Horror')}</option>
                <option value="Romance">{getGenreText('Romance')}</option>
                <option value="Sci-Fi">{getGenreText('Sci-Fi')}</option>
                <option value="Thriller">{getGenreText('Thriller')}</option>
              </select>
            ) : (
              <span className={styles.genreTag}>
                {getGenreText(movie.genre as keyof typeof texts.genres)}
              </span>
            )}
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>
              {getMovieDetailFieldText('favorite')}
            </span>
            {isEditing ? (
              <input
                type="checkbox"
                checked={editData.favorite}
                onChange={(e) =>
                  handleInputChange('favorite', e.target.checked)
                }
                className={styles.favoriteCheckbox}
              />
            ) : (
              <span className={styles.infoValue}>
                {movie.favorite
                  ? getMovieDetailFavoriteStatusText('yes')
                  : getMovieDetailFavoriteStatusText('no')}
              </span>
            )}
          </div>
        </div>
      </section>

      <div className={styles.actionButtons}>
        {isEditing ? (
          <>
            <button
              type="button"
              onClick={handleSaveEdit}
              className={styles.saveButton}
              disabled={loading}
            >
              {loading
                ? texts.editMovie.actions.saving
                : texts.editMovie.actions.save}
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

      <DeleteMovieModal
        movieTitle={movie.title}
        isOpen={isDeleteModalOpen}
        isDeleting={loading}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </section>
  );
}
