import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
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

describe('MovieDetailContent', () => {
  it('should render movie information correctly', () => {
    render(<MovieDetailContent movie={mockMovie} />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('The Shawshank Redemption');
    expect(screen.getByText('Frank Darabont')).toBeInTheDocument();
    expect(screen.getAllByText('1994')).toHaveLength(2); // Aparece en info básica y stats
    expect(screen.getAllByText('Drama')).toHaveLength(2); // Aparece en info básica y stats
    expect(screen.getAllByText('9.3')).toHaveLength(2); // Aparece en rating y stats
  });

  it('should show favorite badge when movie is favorite', () => {
    render(<MovieDetailContent movie={mockMovie} />);

    expect(screen.getByText('⭐ Favorite')).toBeInTheDocument();
  });

  it('should not show favorite badge when movie is not favorite', () => {
    render(<MovieDetailContent movie={mockNonFavoriteMovie} />);

    expect(screen.queryByText('⭐ Favorite')).not.toBeInTheDocument();
  });

  it('should render all sections', () => {
    render(<MovieDetailContent movie={mockMovie} />);

    expect(screen.getByText('Plot Summary')).toBeInTheDocument();
    expect(screen.getByText('Additional Information')).toBeInTheDocument();
    expect(screen.getByText('Director')).toBeInTheDocument();
    expect(screen.getAllByText('Release Year')).toHaveLength(2); // Aparece en ambas secciones
    expect(screen.getByText('Genre')).toBeInTheDocument();
  });

  it('should render rating with correct format', () => {
    render(<MovieDetailContent movie={mockMovie} />);

    expect(screen.getAllByText('9.3')).toHaveLength(2); // Header y stats
    expect(screen.getByText('/ 10')).toBeInTheDocument();
  });

  it('should render statistical cards', () => {
    render(<MovieDetailContent movie={mockMovie} />);

    expect(screen.getByText('IMDb Rating')).toBeInTheDocument();
    expect(screen.getAllByText('Release Year')).toHaveLength(2);
    expect(screen.getByText('Primary Genre')).toBeInTheDocument();
  });
});
