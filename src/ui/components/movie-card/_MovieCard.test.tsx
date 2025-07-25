import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';

// Mock CSS modules
vi.mock('./MovieCard.module.css', () => ({
  default: {
    card: 'card',
    poster: 'poster',
    content: 'content',
    title: 'title',
    year: 'year',
    genre: 'genre',
    rating: 'rating',
    stars: 'stars',
  },
}));

import MovieCard from './MovieCard';

const mockMovie = {
  id: 1,
  title: 'The Matrix',
  year: 1999,
  poster: 'https://example.com/poster.jpg',
  rating: 8.7,
  genre: 'Sci-Fi',
};

describe('MovieCard', () => {
  it('renders movie information', () => {
    render(<MovieCard movie={mockMovie} />);

    expect(screen.getByText('The Matrix')).toBeInTheDocument();
    expect(screen.getByText('1999')).toBeInTheDocument();
    expect(screen.getByText('Sci-Fi')).toBeInTheDocument();
    expect(screen.getByText('8.7')).toBeInTheDocument();
  });

  it('renders poster image when provided', () => {
    render(<MovieCard movie={mockMovie} />);

    const poster = screen.getByAltText('The Matrix poster');
    expect(poster).toBeInTheDocument();
    expect(poster).toHaveAttribute('src', 'https://example.com/poster.jpg');
  });

  it('handles missing optional fields', () => {
    const movieWithoutOptionals = {
      id: 2,
      title: 'Simple Movie',
      year: 2020,
    };

    render(<MovieCard movie={movieWithoutOptionals} />);

    expect(screen.getByText('Simple Movie')).toBeInTheDocument();
    expect(screen.getByText('2020')).toBeInTheDocument();
    expect(
      screen.queryByAltText('Simple Movie poster')
    ).not.toBeInTheDocument();
    expect(screen.queryByText('★')).not.toBeInTheDocument();
  });

  it('calls onSelect when clicked', () => {
    const handleSelect = vi.fn();
    render(<MovieCard movie={mockMovie} onSelect={handleSelect} />);

    fireEvent.click(screen.getByRole('button'));
    expect(handleSelect).toHaveBeenCalledWith(mockMovie);
  });

  it('formats rating correctly', () => {
    const movieWithRating = { ...mockMovie, rating: 7 };
    render(<MovieCard movie={movieWithRating} />);

    expect(screen.getByText('7.0')).toBeInTheDocument();
  });
});
