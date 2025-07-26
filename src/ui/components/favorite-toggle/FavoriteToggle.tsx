"use client"
import React, { useState } from 'react';
import styles from './FavoriteToggle.module.css';
import { useTexts } from '@/ui/hooks/useTexts';

export default function FavoriteToggle() {
  const { getFavoriteToggleText } = useTexts();
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const handleToggle = () => {
    const newValue = !showOnlyFavorites;
    setShowOnlyFavorites(newValue);
    // TODO: Implementar lógica de filtrado por favoritas
    console.log('Mostrar solo favoritas:', newValue);
  };
  
  return (
    <button 
      className={`${styles.button} ${showOnlyFavorites ? styles.active : ''}`}
      onClick={handleToggle}
    >
        {showOnlyFavorites 
          ? getFavoriteToggleText('showAll')
          : getFavoriteToggleText('showOnlyFavorites')
        }
    </button>
  );
}
