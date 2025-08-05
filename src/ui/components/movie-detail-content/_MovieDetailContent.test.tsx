import { MoviesProvider } from '@/ui/context/MoviesContext';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Movie } from '../../../core/models/movie';
import MovieDetailContent from './MovieDetailContent';

const mockMovie: Movie = {
  id: '1',
  title: 'The Shawshank Redemption',
  director: 'Frank Darabont',
  releaseYear: 1994,
  genre: 'Drama',
  rating: 9.3,
  favorite: true,
};

const mockNonFavoriteMovie: Movie = {
  ...mockMovie,
  favorite: false,
};

const renderWithProvider = (component: React.ReactElement) => {
  return render(<MoviesProvider>{component}</MoviesProvider>);
};

describe('MovieDetailContent', () => {
  it('should render movie information correctly', () => {
    renderWithProvider(<MovieDetailContent movie={mockMovie} />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'The Shawshank Redemption'
    );
    expect(screen.getByText('Frank Darabont')).toBeInTheDocument();
    expect(screen.getByText('1994')).toBeInTheDocument();
    expect(screen.getByText('Drama')).toBeInTheDocument();
    expect(screen.getByText('9.3')).toBeInTheDocument();
  });

  it('should show favorite status when movie is favorite', () => {
    renderWithProvider(<MovieDetailContent movie={mockMovie} />);

    expect(screen.getByText('Sí')).toBeInTheDocument();
  });

  it('should not show favorite status when movie is not favorite', () => {
    renderWithProvider(<MovieDetailContent movie={mockNonFavoriteMovie} />);

    expect(screen.getByText('No')).toBeInTheDocument();
    expect(screen.queryByText('Sí')).not.toBeInTheDocument();
  });

  it('should render all basic information sections', () => {
    renderWithProvider(<MovieDetailContent movie={mockMovie} />);

    expect(screen.getByText('Director')).toBeInTheDocument();
    expect(screen.getByText('Año de Estreno')).toBeInTheDocument();
    expect(screen.getByText('Género')).toBeInTheDocument();
    expect(screen.getByText('Favorito')).toBeInTheDocument();
  });

  it('should render rating with correct format', () => {
    renderWithProvider(<MovieDetailContent movie={mockMovie} />);

    expect(screen.getByText('9.3')).toBeInTheDocument();
    expect(screen.getByText('/ 10')).toBeInTheDocument();
  });

  it('should render edit and delete buttons', () => {
    renderWithProvider(<MovieDetailContent movie={mockMovie} />);

    expect(screen.getByRole('button', { name: 'Editar' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Eliminar' })
    ).toBeInTheDocument();
  });
});
