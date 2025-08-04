import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AddNewMovie } from './AddNewMovie';

// Mock del modal para simplificar los tests
vi.mock('../add-movie-modal/AddMovieModal', () => ({
  AddMovieModal: ({ isOpen, onClose, onSuccess }: { 
    isOpen: boolean; 
    onClose: () => void; 
    onSuccess: () => void; 
  }) => 
    isOpen ? (
      <div data-testid="add-movie-modal">
        <button onClick={onClose}>Close Modal</button>
        <button onClick={onSuccess}>Success</button>
      </div>
    ) : null
}));

// Mock del botón flotante
vi.mock('../floating-add-button/FloatingAddButton', () => ({
  FloatingAddButton: ({ onClick, className }: { onClick: () => void; className?: string }) => (
    <button 
      className={className}
      onClick={onClick} 
      data-testid="floating-add-button"
    >
      +
    </button>
  )
}));

describe('AddNewMovie', () => {
  it('should render the floating add button', () => {
    render(<AddNewMovie />);
    
    const button = screen.getByTestId('floating-add-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('+');
  });

  it('should open modal when floating button is clicked', () => {
    render(<AddNewMovie />);
    
    const button = screen.getByTestId('floating-add-button');
    fireEvent.click(button);
    
    const modal = screen.getByTestId('add-movie-modal');
    expect(modal).toBeInTheDocument();
  });

  it('should close modal when close button is clicked', () => {
    render(<AddNewMovie />);
    
    // Abrir modal
    const button = screen.getByTestId('floating-add-button');
    fireEvent.click(button);
    
    // Cerrar modal
    const closeButton = screen.getByText('Close Modal');
    fireEvent.click(closeButton);
    
    // Verificar que el modal se cerró
    expect(screen.queryByTestId('add-movie-modal')).not.toBeInTheDocument();
  });

  it('should call onSuccess and close modal when success is triggered', () => {
    const mockOnSuccess = vi.fn();
    render(<AddNewMovie onSuccess={mockOnSuccess} />);
    
    // Abrir modal
    const button = screen.getByTestId('floating-add-button');
    fireEvent.click(button);
    
    // Simular éxito
    const successButton = screen.getByText('Success');
    fireEvent.click(successButton);
    
    // Verificar que se llamó onSuccess y se cerró el modal
    expect(mockOnSuccess).toHaveBeenCalledTimes(1);
    expect(screen.queryByTestId('add-movie-modal')).not.toBeInTheDocument();
  });

  it('should apply className to floating button', () => {
    const customClass = 'custom-class';
    render(<AddNewMovie className={customClass} />);
    
    const button = screen.getByTestId('floating-add-button');
    expect(button).toHaveClass(customClass);
  });
});
