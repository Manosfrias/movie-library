import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MovieDetailSidebar from './MovieDetailSidebar';

// Mock Next.js Link component
vi.mock('next/link', () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

describe('MovieDetailSidebar', () => {
  it('should render navigation section with home link', () => {
    render(<MovieDetailSidebar currentMovieId="1" />);

    expect(screen.getByText('Navigation')).toBeInTheDocument();
    expect(screen.getByText('Back to Home')).toBeInTheDocument();
  });

  it('should render previous movie link when provided', () => {
    render(<MovieDetailSidebar currentMovieId="2" previousMovieId="1" />);

    expect(screen.getByText('Browse Movies')).toBeInTheDocument();
    expect(screen.getByText('Previous Movie')).toBeInTheDocument();
  });

  it('should render next movie link when provided', () => {
    render(<MovieDetailSidebar currentMovieId="1" nextMovieId="2" />);

    expect(screen.getByText('Browse Movies')).toBeInTheDocument();
    expect(screen.getByText('Next Movie')).toBeInTheDocument();
  });

  it('should not render browse section when no previous or next movies', () => {
    render(<MovieDetailSidebar currentMovieId="1" />);

    expect(screen.queryByText('Browse Movies')).not.toBeInTheDocument();
    expect(screen.queryByText('Previous Movie')).not.toBeInTheDocument();
    expect(screen.queryByText('Next Movie')).not.toBeInTheDocument();
  });

  it('should render action buttons', () => {
    render(<MovieDetailSidebar currentMovieId="1" />);

    expect(screen.getByText('Actions')).toBeInTheDocument();
    expect(screen.getByText('Add to Favorites')).toBeInTheDocument();
    expect(screen.getByText('Add to Watchlist')).toBeInTheDocument();
  });
});
