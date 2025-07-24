import styles from './MovieCard.module.css'

interface Movie {
  id: number
  title: string
  year: number
  poster?: string
  rating?: number
  genre?: string
}

interface MovieCardProps {
  movie: Movie
  onSelect?: (movie: Movie) => void
}

export default function MovieCard({ movie, onSelect }: MovieCardProps) {
  return (
    <div 
      className={styles.card}
      onClick={() => onSelect?.(movie)}
      role="button"
      tabIndex={0}
    >
      {movie.poster && (
        <img 
          src={movie.poster} 
          alt={`${movie.title} poster`}
          className={styles.poster}
        />
      )}
      
      <div className={styles.content}>
        <h3 className={styles.title}>{movie.title}</h3>
        <p className={styles.year}>{movie.year}</p>
        
        {movie.genre && (
          <p className={styles.genre}>{movie.genre}</p>
        )}
        
        {movie.rating && (
          <div className={styles.rating}>
            <span className={styles.stars}>★</span>
            <span>{movie.rating.toFixed(1)}</span>
          </div>
        )}
      </div>
    </div>
  )
}
