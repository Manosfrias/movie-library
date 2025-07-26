import React from 'react';
import styles from './AsideCard.module.css';
import { AsideCardProps } from './AsideCard.types';

export default function AsideCard({
  title,
  items,
  onItemClick,
  selectedItem,
}: AsideCardProps) {
  return (
    <section>
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
    </section>
  );
}
