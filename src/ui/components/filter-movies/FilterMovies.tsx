'use client';
import React, { useState } from 'react';
import AsideCard from '../aside-card/AsideCard';
import { useTexts } from '@/ui/hooks/useTexts';

export default function FilterMovies() {
  const { getFilterText } = useTexts();
  const filterOptions = [
    'All Genres',
    'Action',
    'Comedy',
    'Drama',
    'Horror',
    'Romance',
    'Sci-Fi',
    'Thriller',
  ];
  const [selectedFilter, setSelectedFilter] = useState<string>('All Genres');

  const handleFilterChange = (option: string) => {
    setSelectedFilter(option);
    // TODO: Implementar lógica de filtrado
    console.log('Filtrar por:', option);
  };

  return (
    <AsideCard
      title={getFilterText('title') as string}
      items={filterOptions}
      onItemClick={handleFilterChange}
      selectedItem={selectedFilter}
    />
  );
}
