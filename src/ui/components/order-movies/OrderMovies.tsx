'use client';
import React from 'react';
import AsideCard from '../aside-card/AsideCard';
import { useTexts } from '@/ui/hooks/useTexts';
import { useMovies } from '@/ui/context/MoviesContext';

export default function OrderMovies() {
  const { getOrderText, getOrderOptions } = useTexts();
  const { sortBy, setSortBy } = useMovies();

  const orderOptions = [
    getOrderOptions('byTitle'),
    getOrderOptions('byDirector'),
    getOrderOptions('byReleaseDate'),
    getOrderOptions('byRating'),
  ];

  const handleOrderChange = (option: string) => {
    const isSelected = sortBy === option;
    const newOption = isSelected ? '' : option;
    setSortBy(newOption);
    console.log('Ordenar por:', newOption === '' ? 'Ninguno' : newOption);
  };

  return (
    <AsideCard
      title={getOrderText('title') as string}
      items={orderOptions}
      onItemClick={handleOrderChange}
      selectedItem={sortBy}
    />
  );
}
