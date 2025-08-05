'use client';
import { useTexts } from '@/ui/hooks/useTexts';
import React from 'react';
import { BadgeProps } from './Badge.types';
import styles from './Badget.module.css';

const Badge: React.FC<BadgeProps> = ({
  type = 'favorite',
  className = '',
  active = true,
  onClick,
}) => {
  const { getBadgeText } = useTexts();

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      e.stopPropagation();
      onClick();
    }
  };

  return (
    <span
      className={`${styles.badge} ${styles[type]} ${!active ? styles.inactive : ''} ${className}`}
      onClick={handleClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {getBadgeText(type)}
    </span>
  );
};

export default Badge;
