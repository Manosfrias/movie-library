'use client';
import React from 'react';
import AsideCard from '../aside-card/AsideCard';
import { useTexts } from '@/ui/hooks/useTexts';
import { useMovies } from '../../../core/context/MoviesContext';

export default function FilterMovies() {
  const { getFilterText } = useTexts();
  const { selectedGenre, setSelectedGenre } = useMovies();

  const filterOptions = [
    'All Genres',
    'Action',
    'Adventure',
    'Comedy',
    'Crime',
    'Drama',
    'Horror',
    'Romance',
    'Sci-Fi',
    'Thriller',
  ];

  const handleFilterChange = (option: string) => {
    setSelectedGenre(option);
    console.log('Filtrar por género:', option);
  };

  return (
    <AsideCard
      title={getFilterText('title') as string}
      items={filterOptions}
      onItemClick={handleFilterChange}
      selectedItem={selectedGenre}
    />
  );
}
