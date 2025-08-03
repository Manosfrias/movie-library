'use client';
import React from 'react';
import AsideCard from '../aside-card/AsideCard';
import { useTexts } from '@/ui/hooks/useTexts';
import { useFilterMovies } from './useFilterMovies.hook';

export default function FilterMovies() {
  const { getFilterText } = useTexts();
  const { filterOptions, getTranslatedSelectedGenre, handleFilterChange } =
    useFilterMovies();

  return (
    <AsideCard
      title={getFilterText('title') as string}
      items={filterOptions}
      onItemClick={handleFilterChange}
      selectedItem={getTranslatedSelectedGenre()}
    />
  );
}
