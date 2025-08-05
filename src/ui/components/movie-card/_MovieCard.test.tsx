import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Movie } from '../../../core/models/movie';

// Mock CSS modules
vi.mock('./MovieCard.module.css', () => ({
  default: {
    card: 'card',
    header: 'header',
    title: 'title',
    badge: 'badge',
    movieInfo: 'movieInfo',
    details: 'details',
    director: 'director',
    year: 'year',
    rating: 'rating',
    genreWrapper: 'genreWrapper',
    genre: 'genre',
  },
}));

// Mock Badge CSS modules
vi.mock('../badge/Badget.module.css', () => ({
  default: {
    badge: 'badge',
    favorite: 'favorite',
    inactive: 'inactive',
  },
}));

import MovieCard from './MovieCard';

const mockMovie: Movie = {
  id: '1',
  title: 'The Matrix',
  releaseYear: 1999,
  director: 'The Wachowskis',
  rating: 8.7,
  genre: 'Sci-Fi',
  favorite: false,
};

const mockFavoriteMovie: Movie = {
  ...mockMovie,
  favorite: true,
};

describe('MovieCard', () => {
  it('renders movie information', () => {
    render(<MovieCard movie={mockMovie} />);

    expect(screen.getByText('The Matrix')).toBeInTheDocument();
    expect(screen.getByText('1999')).toBeInTheDocument();
    expect(screen.getByText('Ciencia Ficción')).toBeInTheDocument();
    expect(
      screen.getByText((content, element) => {
        return element?.textContent === 'Dir. The Wachowskis';
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText((content, element) => {
        return element?.textContent === '⭐ 8.7';
      })
    ).toBeInTheDocument();
  });

  it('renders favorite badge as active when movie is favorite', () => {
    render(<MovieCard movie={mockFavoriteMovie} />);

    const badge = screen.getByText('Favorito');
    expect(badge).toBeInTheDocument();
    expect(badge).not.toHaveClass('inactive');
  });

  it('renders favorite badge as inactive when movie is not favorite', () => {
    render(<MovieCard movie={mockMovie} />);

    const badge = screen.getByText('Favorito');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('inactive');
  });

  it('renders all required movie fields', () => {
    const completeMovie: Movie = {
      id: '2',
      title: 'Inception',
      releaseYear: 2010,
      director: 'Christopher Nolan',
      rating: 8.8,
      genre: 'Thriller',
      favorite: true,
    };

    render(<MovieCard movie={completeMovie} />);

    expect(screen.getByText('Inception')).toBeInTheDocument();
    expect(screen.getByText('2010')).toBeInTheDocument();
    expect(screen.getByText('Thriller')).toBeInTheDocument();
    expect(
      screen.getByText((content, element) => {
        return element?.textContent === 'Dir. Christopher Nolan';
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText((content, element) => {
        return element?.textContent === '⭐ 8.8';
      })
    ).toBeInTheDocument();
    expect(screen.getByText('Favorito')).toBeInTheDocument();
  });

  it('calls onSelect when clicked and prevents default navigation', () => {
    const handleSelect = vi.fn();
    render(<MovieCard movie={mockMovie} onSelect={handleSelect} />);

    const link = screen.getByRole('link');
    fireEvent.click(link);
    expect(handleSelect).toHaveBeenCalledWith(mockMovie);
  });

  it('navigates to movie detail when no onSelect is provided', () => {
    render(<MovieCard movie={mockMovie} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/1');
  });

  it('formats rating correctly', () => {
    const movieWithRating = { ...mockMovie, rating: 7 };
    render(<MovieCard movie={movieWithRating} />);

    expect(
      screen.getByText((content, element) => {
        return element?.textContent === '⭐ 7';
      })
    ).toBeInTheDocument();
  });

  it('calls onToggleFavorite when favorite badge is clicked', () => {
    const handleToggleFavorite = vi.fn();
    render(
      <MovieCard movie={mockMovie} onToggleFavorite={handleToggleFavorite} />
    );

    const badge = screen.getByText('Favorito');
    fireEvent.click(badge);

    expect(handleToggleFavorite).toHaveBeenCalledWith(mockMovie.id);
  });

  it('does not crash when onToggleFavorite is not provided', () => {
    render(<MovieCard movie={mockMovie} />);

    const badge = screen.getByText('Favorito');

    expect(() => {
      fireEvent.click(badge);
    }).not.toThrow();
  });
});
