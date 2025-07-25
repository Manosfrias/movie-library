import { MovieDetailPageProps } from './movieDetailPage.type';
import styles from './MovieDetailPageNotFound.module.css';

export default function MovieDetailPageNotFound({
  params,
}: MovieDetailPageProps) {
  return (
    <main className={styles.container}>
      <div className={styles.errorMessage}>
        <h1>Movie not found</h1>
        <p>The movie with ID {params.id} could not be found.</p>
      </div>
    </main>
  );
}
