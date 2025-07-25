import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FilterMovies from './FilterMovies';
import asideCardStyles from '../aside-card/AsideCard.module.css';

// Mock console.log para los tests
const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

describe('FilterMovies', () => {
  afterEach(() => {
    consoleSpy.mockClear();
  });

  it('should render correctly', () => {
    render(<FilterMovies />);

    expect(screen.getByText('Filtrar Películas')).toBeInTheDocument();
    expect(screen.getByText('All Genres')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByText('Comedy')).toBeInTheDocument();
  });

  it('should have "All Genres" selected by default', () => {
    render(<FilterMovies />);

    const allGenresButton = screen.getByText('All Genres');
    expect(allGenresButton).toHaveClass(asideCardStyles.selected);
  });

  it('should handle filter selection', () => {
    render(<FilterMovies />);

    fireEvent.click(screen.getByText('Action'));
    expect(consoleSpy).toHaveBeenCalledWith('Filtrar por:', 'Action');
  });

  it('should render all filter options', () => {
    render(<FilterMovies />);

    const expectedOptions = [
      'All Genres',
      'Action',
      'Comedy',
      'Drama',
      'Horror',
      'Romance',
      'Sci-Fi',
      'Thriller',
    ];
    expectedOptions.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });
});
