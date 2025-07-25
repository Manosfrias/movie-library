import React from 'react';
import styles from './AsideCard.module.css';

interface AsideCardProps {
  title: string;
  items: string[];
  onItemClick?: (item: string) => void;
  selectedItem?: string;
}

export default function AsideCard({
  title,
  items,
  onItemClick,
  selectedItem,
}: AsideCardProps) {
  return (
    <>
      <h2 className={styles.title}>{title}</h2>
      <ul className={styles.list}>
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
    </>
  );
}
