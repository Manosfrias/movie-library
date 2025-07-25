import React from 'react';
import styles from './badge.module.css';
interface BadgeProps {
    variant?: 'favorite' | 'featured';
    className?: string;
}

const Badge: React.FC<BadgeProps> = ({ 
    variant = 'favorite', 
    className = '' 
}) => {
    return (
        <span className={`${styles.badge} ${styles[variant]} ${className}`}>
            {variant}
        </span>
    );
};

export default Badge;