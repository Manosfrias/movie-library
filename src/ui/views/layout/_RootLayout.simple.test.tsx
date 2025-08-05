import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import RootLayout from './RootLayout';

vi.mock('next/font/google', () => ({
  Inter: () => ({
    className: 'mocked-inter-font',
  }),
}));

describe('RootLayout Simple Tests', () => {
  it('should render basic layout structure', () => {
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );

    expect(document.documentElement).toBeInTheDocument();
    expect(document.body).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should provide proper HTML structure', () => {
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );

    expect(document.documentElement).toBeInTheDocument();
    expect(document.head).toBeInTheDocument();
    expect(document.body).toBeInTheDocument();
  });

  it('should render with different content', () => {
    render(
      <RootLayout>
        <p>Different content</p>
      </RootLayout>
    );

    expect(screen.getByText('Different content')).toBeInTheDocument();
  });
});
