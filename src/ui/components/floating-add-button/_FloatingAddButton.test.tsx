import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { FloatingAddButton } from './FloatingAddButton';

describe('FloatingAddButton', () => {
  it('should render with default props', () => {
    const mockOnClick = vi.fn();
    
    render(<FloatingAddButton onClick={mockOnClick} />);
    
    const button = screen.getByRole('button', { name: /añadir nueva película/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('+');
  });

  it('should call onClick when button is clicked', () => {
    const mockOnClick = vi.fn();
    
    render(<FloatingAddButton onClick={mockOnClick} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('should render with custom aria-label', () => {
    const mockOnClick = vi.fn();
    const customLabel = 'Crear película nueva';
    
    render(<FloatingAddButton onClick={mockOnClick} aria-label={customLabel} />);
    
    const button = screen.getByRole('button', { name: customLabel });
    expect(button).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const mockOnClick = vi.fn();
    const customClass = 'custom-class';
    
    render(<FloatingAddButton onClick={mockOnClick} className={customClass} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass(customClass);
  });
});
