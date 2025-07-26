'use client';
import React from 'react';
import { useMovies } from '@/ui/context/MoviesContext';
import styles from './SearchMovies.module.css';
import { useTexts } from '@/ui/hooks/useTexts';

export default function SearchMovies() {
  const { getSearchText, getSearchCriteria } = useTexts();
  const { searchQuery, setSearchQuery, searchCriteria, setSearchCriteria } =
    useMovies();

  const searchOptions = [
    { key: 'byTitle', label: getSearchCriteria('byTitle') },
    { key: 'byDirector', label: getSearchCriteria('byDirector') },
    { key: 'byReleaseDate', label: getSearchCriteria('byReleaseDate') },
    { key: 'byRating', label: getSearchCriteria('byRating') },
  ];

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    console.log('Buscando:', event.target.value);
  };

  const handleCriteriaChange = (criteria: string) => {
    setSearchCriteria(criteria);
    console.log('Criterio de búsqueda:', criteria);
  };

  return (
    <section className={styles.container}>
      <input
        className={`${styles.searchInput}`}
        type="text"
        placeholder={getSearchText('placeholder') as string}
        value={searchQuery}
        onChange={handleSearchChange}
      />

      <select
        className={styles.criteriaSelector}
        id="searchCriteria"
        value={searchCriteria}
        onChange={(e) => handleCriteriaChange(e.target.value)}
      >
        {searchOptions.map((option) => (
          <option key={option.key} value={option.key}>
            {option.label}
          </option>
        ))}
      </select>
    </section>
  );
}
