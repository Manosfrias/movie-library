import { fireEvent, render, screen, act } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import AsideCard from './AsideCard';
import styles from './AsideCard.module.css';

// Mock window.innerWidth
const mockInnerWidth = (width: number) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
  
  // Trigger resize event
  window.dispatchEvent(new Event('resize'));
};

describe('AsideCard', () => {
  const mockItems = ['Item 1', 'Item 2', 'Item 3'];
  const mockTitle = 'Test Card';

  beforeEach(() => {
    // Default to desktop
    mockInnerWidth(1024);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render correctly with title and items', () => {
    render(<AsideCard title={mockTitle} items={mockItems} />);

    expect(screen.getByText(mockTitle)).toBeInTheDocument();
    mockItems.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it('should call onItemClick when button is clicked', () => {
    const mockOnItemClick = vi.fn();
    render(
      <AsideCard
        title={mockTitle}
        items={mockItems}
        onItemClick={mockOnItemClick}
      />
    );

    fireEvent.click(screen.getByText('Item 1'));
    expect(mockOnItemClick).toHaveBeenCalledWith('Item 1');
  });

  it('should highlight selected item', () => {
    render(
      <AsideCard title={mockTitle} items={mockItems} selectedItem="Item 2" />
    );

    const selectedButton = screen.getByText('Item 2');
    expect(selectedButton).toHaveClass(styles.selected);
  });

  it('should render without onItemClick prop', () => {
    render(<AsideCard title={mockTitle} items={mockItems} />);

    const button = screen.getByText('Item 1');
    fireEvent.click(button);
    // Should not throw error
    expect(button).toBeInTheDocument();
  });

  it('should toggle list visibility when title is clicked in mobile', () => {
    mockInnerWidth(500); // Mobile width
    render(<AsideCard title={mockTitle} items={mockItems} />);

    const title = screen.getByText(mockTitle);
    const list = title.nextElementSibling;

    // Initially, list should be collapsed (hidden) in mobile
    expect(list).toHaveClass(styles.hidden);

    // Click title to expand
    fireEvent.click(title);
    expect(list).not.toHaveClass(styles.hidden);

    // Click again to collapse
    fireEvent.click(title);
    expect(list).toHaveClass(styles.hidden);
  });

  it('should not toggle list visibility when title is clicked in desktop', () => {
    mockInnerWidth(1024); // Desktop width
    render(<AsideCard title={mockTitle} items={mockItems} />);

    const title = screen.getByText(mockTitle);
    const list = title.nextElementSibling;

    // In desktop, list should always be visible
    expect(list).not.toHaveClass(styles.hidden);

    // Click title should not change visibility
    fireEvent.click(title);
    expect(list).not.toHaveClass(styles.hidden);
  });

  it('should handle keyboard interactions for toggle in mobile only', () => {
    mockInnerWidth(500); // Mobile width
    render(<AsideCard title={mockTitle} items={mockItems} />);

    const title = screen.getByText(mockTitle);
    const list = title.nextElementSibling;

    // Initially collapsed (hidden) in mobile
    expect(list).toHaveClass(styles.hidden);

    // Toggle with Enter key to expand
    fireEvent.keyDown(title, { key: 'Enter' });
    expect(list).not.toHaveClass(styles.hidden);

    // Toggle with Space key to collapse
    fireEvent.keyDown(title, { key: ' ' });
    expect(list).toHaveClass(styles.hidden);
  });

  it('should have proper accessibility attributes in mobile', () => {
    mockInnerWidth(500); // Mobile width
    render(<AsideCard title={mockTitle} items={mockItems} />);

    const title = screen.getByText(mockTitle);

    expect(title).toHaveAttribute('role', 'button');
    expect(title).toHaveAttribute('tabIndex', '0');
    expect(title).toHaveAttribute('aria-expanded', 'false'); // Initially collapsed
    expect(title).toHaveAttribute('aria-controls', `${mockTitle}-list`);

    // Click to expand
    fireEvent.click(title);
    expect(title).toHaveAttribute('aria-expanded', 'true');
  });

  it('should not have interactive accessibility attributes in desktop', () => {
    mockInnerWidth(1024); // Desktop width
    render(<AsideCard title={mockTitle} items={mockItems} />);

    const title = screen.getByText(mockTitle);

    expect(title).not.toHaveAttribute('role');
    expect(title).not.toHaveAttribute('tabIndex');
    expect(title).not.toHaveAttribute('aria-expanded');
    expect(title).not.toHaveAttribute('aria-controls');
  });

  it('should show arrow only in mobile', () => {
    // Test mobile
    mockInnerWidth(500);
    const { rerender } = render(<AsideCard title={mockTitle} items={mockItems} />);
    
    expect(screen.getByText('▼')).toBeInTheDocument();

    // Test desktop
    act(() => {
      mockInnerWidth(1024);
    });
    rerender(<AsideCard title={mockTitle} items={mockItems} />);
    
    expect(screen.queryByText('▼')).not.toBeInTheDocument();
  });
});
