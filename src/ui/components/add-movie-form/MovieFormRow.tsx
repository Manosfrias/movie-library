import React from 'react';
import styles from './MovieFormRow.module.css';
import { MovieFormRowProps } from './MovieFormRow.types';

export const MovieFormRow: React.FC<MovieFormRowProps> = ({
  label,
  required,
  errors,
  children,
}) => {
  return (
    <div className={styles.formRow}>
      <label className={styles.formLabel}>
        {label} {required && <span className={styles.required}>*</span>}
      </label>
      {children}
      {errors && <span className={styles.errorMessage}>{errors}</span>}
    </div>
  );
};
