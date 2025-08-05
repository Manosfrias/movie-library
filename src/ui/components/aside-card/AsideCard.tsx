import { useState, useEffect } from 'react';
import styles from './AsideCard.module.css';
import { AsideCardProps } from './AsideCard.types';

export default function AsideCard({
  title,
  items,
  onItemClick,
  selectedItem,
}: AsideCardProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const handleTitleClick = () => {
    if (isMobile) {
      setIsCollapsed(!isCollapsed);
    }
  };

  return (
    <section className={styles.section}>
      <h2
        className={`${styles.title} ${isMobile ? styles.clickable : ''}`}
        onClick={handleTitleClick}
        role={isMobile ? "button" : undefined}
        tabIndex={isMobile ? 0 : undefined}
        onKeyDown={isMobile ? (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleTitleClick();
          }
        } : undefined}
        aria-expanded={isMobile ? !isCollapsed : undefined}
        aria-controls={isMobile ? `${title}-list` : undefined}
      >
        {title}
        {isMobile && (
          <span
            className={`${styles.arrow} ${isCollapsed ? styles.collapsed : ''}`}
          >
            ▼
          </span>
        )}
      </h2>
      <ul
        id={`${title}-list`}
        className={`${styles.list} ${isMobile && isCollapsed ? styles.hidden : ''}`}
      >
        {items.map((item) => (
          <li key={item} className={styles.listItem}>
            <button
              className={`${styles.button} ${selectedItem === item ? styles.selected : ''}`}
              onClick={() => onItemClick?.(item)}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
