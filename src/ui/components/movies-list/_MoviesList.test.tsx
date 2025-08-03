import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MoviesList } from './MoviesList';

// Mock del contexto de películas usando vi.hoisted para evitar problemas de hoisting
const mockUseMovies = vi.hoisted(() => vi.fn());
vi.mock('@/ui/context/MoviesContext', () => ({
  useMovies: mockUseMovies,
}));

// Mock del componente MovieCard
vi.mock('../movie-card/MovieCard', () => ({
  default: ({ movie }: { movie: any }) => (
    <div data-testid={`movie-card-${movie.id}`}>
      <h3>{movie.title}</h3>
      <p>{movie.director}</p>
    </div>
  ),
}));

describe('MoviesList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Configuración por defecto del mock
    mockUseMovies.mockReturnValue({
      filteredMovies: [],
      loading: false,
    });
  });

  it('should render loading state', () => {
    mockUseMovies.mockReturnValue({
      filteredMovies: [],
      loading: true,
    });

    render(<MoviesList />);

    expect(screen.getByText('Cargando películas...')).toBeInTheDocument();
  });

  it('should render movies list when not loading', () => {
    mockUseMovies.mockReturnValue({
      filteredMovies: [
        {
          id: '1',
          title: 'Test Movie 1',
          director: 'Test Director 1',
          releaseYear: 2023,
          genre: 'Action',
          rating: 8.5,
          favorite: false,
          poster: 'test-poster-1.jpg',
          synopsis: 'Test synopsis 1',
          duration: 120,
        },
        {
          id: '2',
          title: 'Test Movie 2',
          director: 'Test Director 2',
          releaseYear: 2022,
          genre: 'Comedy',
          rating: 7.8,
          favorite: true,
          poster: 'test-poster-2.jpg',
          synopsis: 'Test synopsis 2',
          duration: 105,
        },
      ],
      loading: false,
    });

    render(<MoviesList />);

    expect(screen.getByTestId('movie-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('movie-card-2')).toBeInTheDocument();
    expect(screen.getByText('Test Movie 1')).toBeInTheDocument();
    expect(screen.getByText('Test Movie 2')).toBeInTheDocument();
  });

  it('should render empty list when no movies', () => {
    mockUseMovies.mockReturnValue({
      filteredMovies: [],
      loading: false,
    });

    render(<MoviesList />);

    expect(screen.queryByTestId(/movie-card-/)).not.toBeInTheDocument();
  });
});
