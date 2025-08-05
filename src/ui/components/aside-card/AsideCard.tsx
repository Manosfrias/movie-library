import { useState } from 'react';
import styles from './AsideCard.module.css';
import { AsideCardProps } from './AsideCard.types';

export default function AsideCard({
  title,
  items,
  onItemClick,
  selectedItem,
}: AsideCardProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleTitleClick = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <section className={styles.section}>
      <h2
        className={`${styles.title} ${styles.clickable}`}
        onClick={handleTitleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleTitleClick();
          }
        }}
        aria-expanded={!isCollapsed}
        aria-controls={`${title}-list`}
      >
        {title}
        <span
          className={`${styles.arrow} ${isCollapsed ? styles.collapsed : ''}`}
        >
          ▼
        </span>
      </h2>
      <ul
        id={`${title}-list`}
        className={`${styles.list} ${isCollapsed ? styles.hidden : ''}`}
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
