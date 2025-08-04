import styles from './FloatingAddButton.module.css';
import { FloatingAddButtonProps } from './FloatingAddButton.types';

export const FloatingAddButton = ({ 
  onClick,
  className = '', 
  'aria-label': ariaLabel = 'Añadir nueva película'
}: FloatingAddButtonProps) => (
  <button
    type="button"
    className={`${styles.floatingAddButton} ${className}`.trim()}
    onClick={onClick}
    aria-label={ariaLabel}
  >
    +
  </button>
);
