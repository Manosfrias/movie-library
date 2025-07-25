import React from 'react';
import styles from './ViewDetails.module.css';

export default function ViewDetails() {
  return (
    <footer className={styles.footer}>
      <span className={`${styles.cta} view-details-cta`}>View Details →</span>
    </footer>
  );
}
