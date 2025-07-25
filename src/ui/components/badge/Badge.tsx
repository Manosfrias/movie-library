import React from 'react';
import styles from './Badget.module.css';
import { BadgeProps } from './Badge.types';
import { useTexts } from '@/ui/hooks/useTexts';

const Badge: React.FC<BadgeProps> = ({ type = 'favorite', className = '' }) => {
  const { getBadgeText } = useTexts();

  return (
    <span className={`${styles.badge} ${styles[type]} ${className}`}>
      {getBadgeText(type)}
    </span>
  );
};

export default Badge;
