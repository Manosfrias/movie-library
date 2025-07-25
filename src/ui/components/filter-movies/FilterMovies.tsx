'use client';
import React, { useState } from 'react';
import AsideCard from '../aside-card/AsideCard';

export default function FilterMovies() {
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
      title="Filter Movies"
      items={filterOptions}
      onItemClick={handleFilterChange}
      selectedItem={selectedFilter}
    />
  );
}
