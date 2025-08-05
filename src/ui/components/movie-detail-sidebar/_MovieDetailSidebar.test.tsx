import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
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
  it('should render home link', () => {
    render(<MovieDetailSidebar />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('should render previous movie link when provided', () => {
    render(<MovieDetailSidebar previousMovieId="1" />);

    expect(screen.getByText('Previous')).toBeInTheDocument();
    const previousLink = screen.getByRole('link', { name: 'Previous' });
    expect(previousLink).toHaveAttribute('href', '/1');
  });

  it('should render next movie link when provided', () => {
    render(<MovieDetailSidebar nextMovieId="2" />);

    expect(screen.getByText('Next')).toBeInTheDocument();
    const nextLink = screen.getByRole('link', { name: 'Next' });
    expect(nextLink).toHaveAttribute('href', '/2');
  });

  it('should render both previous and next links when both are provided', () => {
    render(<MovieDetailSidebar previousMovieId="1" nextMovieId="3" />);

    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();

    const previousLink = screen.getByRole('link', { name: 'Previous' });
    const nextLink = screen.getByRole('link', { name: 'Next' });

    expect(previousLink).toHaveAttribute('href', '/1');
    expect(nextLink).toHaveAttribute('href', '/3');
  });

  it('should not render navigation section when no previous or next movies', () => {
    render(<MovieDetailSidebar />);

    expect(screen.queryByText('Previous')).not.toBeInTheDocument();
    expect(screen.queryByText('Next')).not.toBeInTheDocument();

    // Only home link should be present
    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});
