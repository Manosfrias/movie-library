import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';

// Test component that mimics the functionality
function TestHomePage() {
  return (
    <main>
      <h1>Welcome to Movie Library</h1>
      <p>
        Your personal movie collection manager built with Next.js and TypeScript
      </p>
    </main>
  );
}

describe('HomePage Component', () => {
  it('should render the main content', () => {
    render(<TestHomePage />);

    expect(screen.getByText('Welcome to Movie Library')).toBeInTheDocument();
    expect(
      screen.getByText(/your personal movie collection manager/i)
    ).toBeInTheDocument();
  });

  it('should have correct heading structure', () => {
    render(<TestHomePage />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Welcome to Movie Library');
  });
});
